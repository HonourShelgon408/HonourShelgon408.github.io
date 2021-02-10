importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js');
//importScripts('/__/firebase/init.js');
importScripts('firebase-config-details.js');

firebase.initializeApp(firebase_global);

const FIREBASE_MESSAGING = firebase.messaging();

FIREBASE_MESSAGING.getToken({vapidKey: "BPWf1tbECVCHpl0gfxdxJJqWg3m5A3KkcVrjxqSFu_RfmuikB4x1D0JSbktt82UU1ipH3lYGVyo6VdO6PObe26o"})
    .then((currentToken) => {
        if(currentToken){
// Send the token to your server and update the UI if necessary
        }
        else {
            console.log('No registration token available. Request permission to generate one.');
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
    });

FIREBASE_MESSAGING.setBackgroundMessageHandler((payload) => {
    console.log("Firebase receiving background message", payload);
    const title = "hello world";
    const options = {
        body: payload.data.status,
        icon: "images/ss-192.png"
    };
    return self.registration.showNotifications(title, options);
});
  