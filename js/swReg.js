window.onload = () => {
    
    'use strict';
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(function(){
            console.log("Service worker registered");
        });
    }
    //$("div#nav-tail").hide("fast");

    
}
