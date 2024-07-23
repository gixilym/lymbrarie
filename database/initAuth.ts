// import { type Analytics, getAnalytics } from "firebase/analytics";
import { type FirebaseApp, initializeApp } from "firebase/app";
import { type Firestore, getFirestore } from "firebase/firestore";
import { init } from "next-firebase-auth";

export default function initAuth(): void {
  init({
    authPageURL: "/login",
    appPageURL: "/",
    loginAPIEndpoint: "/api/login",
    logoutAPIEndpoint: "/api/logout",
    onLoginRequestError: err => console.error(err),
    onLogoutRequestError: err => console.error(err),
    firebaseAdminInitConfig: {
      credential: {
        projectId: "lymbrarie-oficial",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
        // @ts-ignore
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
          : undefined,
      },
    },
    firebaseClientInitConfig,
    cookies: {
      name: "lymbrarie-app",
      keys: [
        process.env.COOKIE_SECRET_CURRENT as string,
        process.env.COOKIE_SECRET_PREVIOUS as string,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000,
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: true,
      signed: true,
    },
    onVerifyTokenError: err => console.error(err),
    onTokenRefreshError: err => console.error(err),
  });
}

const firebaseClientInitConfig: FirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY as string,
  authDomain: "lymbrarie-oficial.firebaseapp.com",
  projectId: "lymbrarie-oficial",
};

const app: FirebaseApp = initializeApp(firebaseClientInitConfig);

export const DB: Firestore = getFirestore(app);

// const analytics: Analytics = getAnalytics(app);

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
}
