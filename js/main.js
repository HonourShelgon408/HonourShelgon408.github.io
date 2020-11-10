
window.mobileCheck = function() { //returns true if mobile device
    let check = false;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        check = true;
    }
    return check;
  };


$(document).ready(function(){
    // $("#shortList").click(function(){
    //     // $("#shortList").css
    // });


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

    $("#totalContent").hide();
    $("#shortContent").show();
    $("div#nav-tail").hide("fast");
    $("div#nav-tail").addClass("hidden");

    $("#nav").innerHTML($.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=<your_api_key>', function(data) {
        console.log(JSON.stringify(data, null, 2));
      }));
    

    // $("div#nav").mouseleave(function(){
    //     $("div#nav-tail").hide("fast");
    // });
    // $("div#nav").mouseenter(function(){
    //     $("div#nav-tail").show("fast");
    // });
  
    $("#shortList").click(function(){
        $("#totalContent").hide();
        $("#shortContent").show();
    });
    $("#totalList").click(function(){
        $("#totalContent").show();
        $("#shortContent").hide();
    });

});

