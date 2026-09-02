// Fill this in with your own Firebase project's config so the QR Wallet
// saves data for real (across devices, and permanently on Vercel) instead
// of just for the current browser tab.
//
// How to get these values:
//   1. Go to https://console.firebase.google.com and create a project
//      (or open an existing one).
//   2. Project settings (gear icon) → General → scroll to "Your apps" →
//      click the web icon (</>) to add a web app → copy the config object
//      it gives you.
//   3. In the left sidebar, go to Build → Firestore Database → Create
//      database → start in production mode (or test mode while you set
//      up the security rules below).
//   4. Paste your config into FIREBASE_CONFIG below.
//
// If you leave this as null, the app still works, but data is only saved
// for the current session — or, inside Claude's file preview, for as long
// as that conversation's storage lasts.

window.FIREBASE_CONFIG = null;

/* Example — uncomment and fill in with your own project's values:
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
*/

// ---------------------------------------------------------------------
// Recommended Firestore security rules (Firestore console → Rules tab).
// These only allow reading/writing a document if you already know its
// exact wallet-username id — good enough for a small personal/family
// wallet gated by the app's passkey, but note that Firestore rules can't
// see the passkey itself (that check happens in the browser). Anyone with
// your Firebase config values technically has read/write access to this
// collection, so don't reuse this project for anything sensitive.
//
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /qr_wallet_users/{username} {
//       allow read, write: if true;
//     }
//   }
// }
// ---------------------------------------------------------------------
