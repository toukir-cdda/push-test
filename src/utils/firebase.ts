import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyBcBoJt64kLa-s0qty9CbnfKlyr16lmg1E",
  authDomain: "push-notification-c53a1.firebaseapp.com",
  projectId: "push-notification-c53a1",
  storageBucket: "push-notification-c53a1.appspot.com",
  messagingSenderId: "542544547876",
  appId: "1:542544547876:web:5d7266f6216bbb3c14c8b1",
  measurementId: "G-WSBW67005R",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(firebaseApp);

export { firebaseApp, messaging };
