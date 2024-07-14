import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const firestore = initFirestore({
  credential: cert({
    projectId: process.env.FB_APP_ID as string,
    // clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL as string,
    privateKey: process.env.FB_API_KEY as string,
  }),
});
