import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCbHLpVmMHtBQTcuKeBpzmplaYjWCtreVo",
  authDomain: "chatapp-42918.firebaseapp.com",
  projectId: "chatapp-42918",
  storageBucket: "chatapp-42918.appspot.com",
  messagingSenderId: "56932428331",
  appId: "1:56932428331:web:4801fed1cc713684a7186e",
  measurementId: "G-QBFL2WXTPP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const messaging = firebase.messaging();
const publicKey =
  "BANtSjRLQWduYTb80aQH9pctsmfJfJtt7UeZITBba-SM6Jpc6t5jxGlD_VtFJjLQgVEgspfAQpFc7oC_-MtrhzM";

const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occured", error);
  }
  return currentToken;
};

const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

export { db, auth, getToken, onMessageListener };
