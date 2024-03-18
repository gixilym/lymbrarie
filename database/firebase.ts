import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: object = {
  apiKey: process.env.FB_API_KEY as string,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID as string,
  appId: process.env.FB_APP_ID as string,
  measurementId: process.env.FB_MEASUREMENT_ID as string,
  authDomain: "lymbrarie.firebaseapp.com",
  projectId: "lymbrarie",
  storageBucket: "lymbrarie.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
