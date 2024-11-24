importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyC0Xg2aDQrSPfQuJ8V6oN4N26ZVHZVXyzU",
    authDomain: "actionstop-3a728.firebaseapp.com",
    projectId: "actionstop-3a728",
    storageBucket: "actionstop-3a728.firebasestorage.app",
    messagingSenderId: "989052833474",
    appId: "1:989052833474:web:e2dda707c7e8701956f55b",
    measurementId: "G-1WNLECP7D5"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message:', payload);

    const notificationTitle = payload.notification?.title || 'Background Notification';
    const notificationOptions = {
        body: payload.notification?.body || 'You have a new message.',
        icon: payload.notification?.image || '/default-icon.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
