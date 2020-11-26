
window.mobileCheck = function() { //returns boolean "true" if mobile device
    let check = false;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        check = true;
    }
    return check;
  };


  const priorityNotes = document.querySelector('#content');
  const addNewNote = (data, id) => {
      const html = `
      <div class="card-panel note row data-id='${id}'">
            <i class="material-icons">toc</i>
            <div class="note-details">
                <div class="note-title">${data.title}</div>
                <div class="note-ingredients">${data.body}</div>
            </div>
            <div class="note-delete note-controls">
                <span class="delete"><i class="material-icons" data-id="${id}">delete_outline</i></span>
            </div>
        </div>
      `;

      content.innerHTML += html;
  };


  const deleteNote = (id) => {
      const note = document.querySelector(`.note[data-id=${id}]`); /**attribute selector in css => get element of class with attribute that is 'data-id=*insert id of element*' */
      note.remove(); /**dom method */
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
    // add note form
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});
  });