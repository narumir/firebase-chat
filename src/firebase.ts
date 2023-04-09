import {
  initializeApp,
} from "firebase/app";
import {
  getAnalytics,
} from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEANSUREMENT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

export let firebaseApp: any;
export let analytics: any;

export const initializeFirebase = ()=> {
  if(firebaseApp == null) {
    firebaseApp = initializeApp(firebaseConfig);
  }
  if(analytics == null) {
    analytics = getAnalytics(firebaseApp);
  }
}
