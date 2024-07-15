import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { init } from "next-firebase-auth";

const firebaseClientInitConfig = {
  apiKey: process.env.FIREBASE_API_KEY as string,
  authDomain: "lymbrarie-oficial.firebaseapp.com",
  projectId: "lymbrarie-oficial",
};

const app = initializeApp(firebaseClientInitConfig);

function initAuth(): void {
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
        privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
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
      secure: true, //! Debe ser true en producción.
      signed: true,
    },
    onVerifyTokenError: err => console.error(err),
    onTokenRefreshError: err => console.error(err),
  });
}

export const DB = getFirestore(app);
export default initAuth;
