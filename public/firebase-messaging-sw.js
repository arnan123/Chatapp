importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyCbHLpVmMHtBQTcuKeBpzmplaYjWCtreVo",
  authDomain: "chatapp-42918.firebaseapp.com",
  projectId: "chatapp-42918",
  storageBucket: "chatapp-42918.appspot.com",
  messagingSenderId: "56932428331",
  appId: "1:56932428331:web:4801fed1cc713684a7186e",
  measurementId: "G-QBFL2WXTPP",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Recieved Message", payload);

  const notifTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  return self.registration.showNotification(notifTitle, notificationOptions);
});
