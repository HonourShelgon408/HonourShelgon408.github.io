window.onload = () => {
    'use strict';
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(function(reg){
            console.log("Service worker registered!"/* , reg */);
            return reg.pushManager.getSubscription().then(function(subscription){
                reg.pushManager.subscribe()({
                    userVisibleOnly: true,
                    applicationServerKey: determineAppServerKey()
                })
            })
        });
    }
}
