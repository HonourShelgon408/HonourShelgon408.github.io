
window.mobileCheck = function() { //returns boolean "true" if mobile device
    let check = false;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        check = true;
    }
    return check;
  };

  function darkMode(){
      $('body').classList.toggle('dark-mode');
      $('card-panel').classList.toggle('dark-mode');
  }

  const priority = document.querySelector('#priority');
  const overview = document.querySelector('#overview');


  /** insert line breaks into string */
  function convertBreaks(str){
    for(var i = 0; i<str.length; i++){
        if(str[i].match(/\n/g)||[]){
            str[i] = String.fromCharCode(13);
        }
    }
  }

  /**render note to the DOM */
  function addNote(data, id) {
    let html = ``;
    const title = data.title;
    const body = data.body;

    html = `
    <div class="card-panel row note hoverable" data-id='${id}'>
        <i class="material-icons">toc</i>
        <div class="note-details">
    `;

    if(title.length >= 1){
        html += `<div class="note-title trunc">${title}</div>`;
    }
    if(body.length >= 1){
        html += `<div class="note-body trunc">${body}</div>`;
    }

    html += `
        </div>
        <div class="note-delete note-controls">
            <i class="material-icons delete-icon" data-id="${id}">delete_outline</i>
        </div>
    </div>
    `;
    
    content.innerHTML += html;
  };

//not using this - old html for the note display
        // <div class="card-panel row note hoverable" data-id='${id}'>
        //     <i class="material-icons">toc</i>
        //     <div class="note-details">
        //         <div class="note-title truncate">${data.title}</div>
        //         <div class="note-details truncate">${data.body}</div>
        //     </div>
        //     <div class="note-delete note-controls">
        //         <i class="material-icons delete-icon" data-id="${id}">delete_outline</i>
        //     </div>
        // </div>


/** derender note from the DOM  */
function deleteNote (id) {
    if(id != null && id != undefined){
        const note = document.querySelector(`.note[data-id='${id}']`);        /**css attribute selector=> get element of class with attribute that is 'data-id=*insert id of element*' */
        note.remove();                                                        /**DOM method to remove childNode */
    }
};



/** javascript for index2 */

document.addEventListener('DOMContentLoaded', function() {
    // nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right', draggable: 'true'});
    // add note form
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'left', draggable: 'true'});
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

function auto_grow(element) {
    element.style.height = "10px";
    element.style.height = (element.scrollHeight)+"px";
}


$(document).ready(function(){

    $('.tooltipped').tooltip();

    // $('.input-field').addEventListener("click",function(){
    //     this.addClass('active');
    // });

    M.updateTextFields(); //adds active class to an element when someone is typing in it - moves the placeholder to above the typing area
 
    $("#totalContent").hide();
    $("#shortContent").show();
    $("div#nav-tail").hide();
    $("div#nav-tail").addClass("hidden");


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
