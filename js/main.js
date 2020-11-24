
window.mobileCheck = function() { //returns boolean "true" if mobile device
    let check = false;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        check = true;
    }
    return check;
  };
  const totalNotes = document.querySelector('#totalContent');
  const addNote = function (data, id){
      const html = `
      <div class="note" data-id='${id}'>
        <div class="noteContent note-child">
            <p style="font-size:16pt;"><i><span class="noteTitle">${data.title}</span></i></p>
            <p><span class="noteBody">${data.body}</span></p>
        </div>
        <div class="noteControls note-child">
            <p class="delete"><button data-id="${id}">Delete</button><p>
        </div>
      </div>
      `;

      totalNotes.innerHTML += html;
  }

  const priorityNotes = document.querySelector('#content');
  const addNewNote = function (data, id){
      const html = `
      <div class="card-panel note row data-id='${id}'">
            <i class="material-icons">toc</i>
            <div class="recipe-details">
                <div class="recipe-title">${data.title}</div>
                <div class="recipe-ingredients">${data.body}</div>
            </div>
            <div class="recipe-delete">
                <p class="delete"><button data-id="${id}"><i class="material-icons">delete_outline</i></p>
            </div>
        </div>
      `;

      content.innerHTML += html;
  }



  function toggle(){
    if($('div#nav-tail').hasClass('hidden')){
        $("div#nav-tail").show();
        $("div#nav-tail").removeClass('hidden');
        //console.log("showing_nav");
    }
    else{
        $("div#nav-tail").hide();
        $("div#nav-tail").addClass('hidden');
        //console.log("hiding_nav");
    }
}


$(document).ready(function(){
    $("#totalContent").hide();
    $("#shortContent").show();
    $("div#nav-tail").hide();
    $("div#nav-tail").addClass("hidden");

    // $("#nav").innerHTML = $.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=<your_api_key>', function(data) {
    //     console.log(JSON.stringify(data, null, 2));
    // });
    

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

/** javascript for index2 */

document.addEventListener('DOMContentLoaded', function() {
    // nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
    // add recipe form
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});
  });