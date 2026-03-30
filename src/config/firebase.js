import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ─────────────────────────────────────────────────────
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (e.g., "moving-sale")
// 3. Go to Project Settings → General → Your apps → Add web app
// 4. Copy the config object and paste below
// 5. Enable Firestore: Build → Firestore Database → Create
//    - Start in TEST mode for now (open for 30 days)
// 6. Enable Storage: Build → Storage → Get started
//    - Start in TEST mode
// ─────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey: "AIzaSyCdSlXK3N5e9KPOCjiysfqRDnXtgFceA9w",
  authDomain: "movesales-dcffd.firebaseapp.com",
  projectId: "movesales-dcffd",
  storageBucket: "movesales-dcffd.firebasestorage.app",
  messagingSenderId: "385304101081",
  appId: "1:385304101081:web:940bfc129af653bb5afec8",
  measurementId: "G-PHZS80SL88"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
