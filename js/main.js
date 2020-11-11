
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

    function bt(btNum){
        // generate a random number
        var pndrnd=Math.floor(Math.random()*10000000000);
     
        // Enter the list of pixels below. Remove any extra entries below.
        var btPixel=new Array();
        btPixel[0]="http://www.pxl.com/0/ord="+pndrnd+"?";
        btPixel[25]="http://www.pxl.com/25/ord="+pndrnd+"?";
        btPixel[50]="http://www.pxl.com/50/ord="+pndrnd+"?";
        btPixel[75]="http://www.pxl.com/75/ord="+pndrnd+"?";
        btPixel[100]="http://www.pxl.com/100/ord="+pndrnd+"?";
        btPixel['btUnmute']="http://www.pxl.com/unmute/ord="+pndrnd+"?";
     
        // Fire the pixel
        var img = document.createElement("img");
        img.setAttribute("src", btPixel[btNum]);
        img.setAttribute("style", "display:none");  
        document.body.appendChild(img);
    }

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

