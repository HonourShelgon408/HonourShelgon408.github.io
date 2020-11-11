
window.mobileCheck = function() { //returns boolean "true" if mobile device
    let check = false;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        check = true;
    }
    return check;
  };

    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    showInstallPromotion();
    });

  function toggle(){
    if($('div#nav-tail').hasClass('hidden')){
        $("div#nav-tail").show();
        $("div#nav-tail").removeClass('hidden');
    }
    else{
        $("div#nav-tail").hide();
        $("div#nav-tail").addClass('hidden');
    }
}


$(document).ready(function(){
    $("#totalContent").hide();
    $("#shortContent").show();
    $("div#nav-tail").hide();
    $("div#nav-tail").addClass("hidden");

    $("#nav").innerHTML = $.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=<your_api_key>', function(data) {
        console.log(JSON.stringify(data, null, 2));
    });
    

    // $("div#nav").mouseleave(function(){
    //     $("div#nav-tail").hide("fast");
    // });
    // $("div#nav").mouseenter(function(){
    //     $("div#nav-tail").show("fast");
    // });
  
    $("#shortListHeader").click(function(){
        $("#totalContent").hide(function(){$("#totalContent").addClass("hidden");});
        $("#shortContent").show(function(){$("#totalContent").removeClass("hidden");});
    });
    $("#totalListHeader").click(function(){
        $("#totalContent").show(function(){$("#totalContent").removeClass("hidden");});
        $("#shortContent").hide(function(){$("#totalContent").addClass("hidden");});
    });

});

