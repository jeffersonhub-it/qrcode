# QR Wallet

A single-page app for saving your bank/e-wallet QR codes, locked behind a
username + password. Registering a new wallet requires a **passkey**
(`1437` by default) so random visitors to your deployed link can't just
create accounts.

## How the app works

- **Log in / Register** tabs on the lock screen.
- Registering asks for a username, password, and the passkey (`1437`).
  Change this in `index.html` by editing the line:
  ```js
  const PASSKEY = '1437';
  ```
- Each wallet's cards are encrypted (AES-GCM, key derived from the
  password via PBKDF2) before they're ever saved — the server/Firestore
  only ever sees encrypted bytes, never your password or plain card data.
- **Forgot password? Delete this wallet** also asks for the passkey before
  it lets you wipe an account, since there's no password recovery (the
  password *is* the encryption key).

## Where data is saved

The app tries, in order:
1. **Firebase Firestore** — if you've filled in `firebase-config.js`, data
   is saved for real, permanently, and works the same whether you're
   testing here or it's deployed on Vercel.
2. **Claude's file-preview storage** — if Firebase isn't configured and
   you're viewing this inside Claude's artifact preview, it uses that
   instead, so you can try the app before deploying it.
3. **In-memory only** — last resort; data disappears when the tab closes.
   You'll see a "Demo mode" toast if this is what's happening.

### Setting up Firebase (so data isn't lost on Vercel)

1. Go to https://console.firebase.google.com → create a project (free
   Spark plan is enough).
2. Project settings → General → "Your apps" → click the web icon (`</>`)
   → register a web app → copy the config object it shows you.
3. Build → Firestore Database → Create database (any region close to your
   users is fine).
4. Open `firebase-config.js` in this project and paste your config into
   `window.FIREBASE_CONFIG = { ... }` (there's an example already in the
   file — just uncomment and fill it in).
5. In the Firestore console's **Rules** tab, use the rules included as a
   comment at the bottom of `firebase-config.js` (or write stricter ones
   of your own — see the note in that file about what these rules do and
   don't protect against).

That's it — no backend server or build step needed, since this app talks
to Firestore directly from the browser using the Firebase Web SDK.

## Deploying

### 1. Push to GitHub

```bash
cd qr-wallet-app
git init
git add .
git commit -m "QR wallet"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
(Create the empty repo on GitHub first, at github.com/new — don't
initialize it with a README so the push above doesn't conflict.)

### 2. Deploy to Vercel

1. Go to https://vercel.com → **Add New** → **Project**.
2. Import the GitHub repo you just pushed.
3. Framework preset: **Other** (it's a static site — no build command or
   output directory needed).
4. Click **Deploy**.

Vercel will give you a live URL. Anyone who opens it can log in or
register (with the passkey), and their data is saved in your Firebase
project.

### Updating later

Any time you `git push` to `main`, Vercel automatically redeploys.

## Files

- `index.html` — the entire app (markup, styles, and logic).
- `firebase-config.js` — your Firebase project keys go here (kept as a
  separate file so it's easy to find and edit without touching the app
  logic).
- `README.md` — this file.

## A note on security

This is built for personal/family use, not as a hardened multi-tenant
product:
- The passkey check happens in the browser, so it's a light gate against
  casual sign-ups, not a strong barrier against a determined person
  reading the page source.
- Card QR data and photos are encrypted with a key derived from each
  user's own password, so even with full read access to Firestore,
  someone can't read another user's saved cards without their password.
- Firestore's default rules in this template allow anyone with your
  Firebase config to read/write the `qr_wallet_users` collection. For a
  small family wallet this is usually an acceptable trade-off for
  simplicity, but tighten the rules if you want more protection.
