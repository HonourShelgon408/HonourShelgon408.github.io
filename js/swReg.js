window.onload = () => {
    'use strict';
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(function(reg){
            console.log("Service worker registered!"/* , reg */);
        });
    }

    
    import 'firebase/firebase-app';
    import 'firebase/firebase-storage';
}
