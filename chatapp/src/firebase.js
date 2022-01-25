import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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

export { db, auth };
