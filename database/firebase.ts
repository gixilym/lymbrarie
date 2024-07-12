import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
} from "firebase/app";
import { type Firestore, getFirestore } from "firebase/firestore/lite";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FB_API_KEY as string,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID as string,
  appId: process.env.FB_APP_ID as string,
  measurementId: process.env.FB_MEASUREMENT_ID as string,
  authDomain: "lymbrarie-oficial.firebaseapp.com",
  projectId: "lymbrarie-oficial",
  storageBucket: "lymbrarie-oficial.appspot.com",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const DB: Firestore = getFirestore(app);
