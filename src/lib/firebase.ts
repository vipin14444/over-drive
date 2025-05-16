// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { env } from "~/env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Need to handle window object for analytics
// export const analytics = getAnalytics(app);
export const storage = getStorage(app);
