window.onload = () => {
    'use strict';
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
        .then(function(reg){console.log("Service worker registered ", reg)
            .catch(function(error){console.log("Error creating service worker: ", error)
            });
        });
    }
}
