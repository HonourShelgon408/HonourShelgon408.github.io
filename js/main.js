// const moment = require("moment");
// const flatpickr = require("flatpickr");
import {moment} from "moment";
import {flatpickr} from "flatpickr";

window.mobileCheck = function() { //returns "true" if mobile device
    let check = false;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        check = true;
    }
    return check;
  };


    /*==================
    
    Query Selectors
    
    ===================*/

const priority = document.querySelector('#priority');
const overview = document.querySelector('#overview');


    /*==================
    
    Functions
    
    ===================*/


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
    const fontSize = 12;
    const letters = (content.scrollWidth / fontSize) - 5;
    const title = data.title.substring(0,letters);
    const body = data.body.substring(0,letters);

    //TODO -- CHANGE NOTIFICATION ICON DEPENDENT ON RELATED RECORDS FOR REMINDERS
    //notifications -> notifications_active -> notifications_none

    html = `
    <div class="card-panel row note hoverable" data-id='${id}'>
        <div class="note-move">
            <i class="material-icons move-icon">toc</i>
        </div>
        <div class="note-details">
    `;

    if(title.length >= 1){
        html += `<div class="note-title sidenav-trigger trunc" data-id='${id}' data-target="update-form">${title}</div>`;
    }
    if(body.length >= 1){
        html += `<div class="note-body sidenav-trigger trunc" data-id='${id}' data-target="update-form">${body}</div>`;
    }
    html += `</div> <!-- closing note-details class div -->`;
    const alarms = false;
    if(alarms == false){
        html += 
        `<div class="note-options">
            <input type="text" class="datepicker">
        </div>`;

        // html += 
        // `
        // <div class="input-field inline">
        //     <input id="email_inline" type="email" class="validate">
        //     <label for="email_inline">Email</label>
        //     <span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
        // </div>
        // `;

    }

    // if(alarms == true){
    //     html += `
    //     <div class="note-options">
    //         <i class="material-icons bell-icon data-id="${id}">notifications_active</i>
    //     </div> `;
    // }
    html += 
        `<div class="note-delete">
            <i class="material-icons delete-icon" data-id="${id}">delete_outline</i>
        </div>
    </div>`;

    content.innerHTML += html;
    };


/** derender note from the DOM  */
function deleteNote(id) {
    if(id != null && id != undefined){
        const note = document.querySelector(`.note[data-id='${id}']`);        /**css attribute selector=> get element of class with attribute that is 'data-id=*insert id of element*' */
        note.remove();                                                        /**DOM method to remove childNode */
    }
};

/**makes the textarea increase height as user types */
function auto_grow(element) {
    element.style.height = "10px";
    element.style.height = (element.scrollHeight)+"px";
}

        /*==================
        
        MATERIALIZE MENU AND FEATURE FUNCTIONS
        
        ===================*/

document.addEventListener('DOMContentLoaded', function() {
    // nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right', draggable: 'true'});
    // add note form
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms,{edge: 'left', draggable: 'true'});
    
    $('.tooltipped').tooltip();
    /*adds active class to an element when someone is typing in it - moves the placeholder to above the typing area*/
    M.updateTextFields(); 
});


        /*==================
        
        FIREBASE MESSAGING
        
        ===================*/


$(document).ready(function(){

    const flatpickr_config = {
        enableTime: true,
        dateFormat: "Y-m-d H:i"
    }
    flatpickr("#reminderInput", flatpickr_config)
    
    //$('#superSchedulerSubHeader').innerHTML += moment().format('MMMM Do YYYY, h:mm:ss');
 
    $("#totalContent").hide();
    $("#shortContent").show();
    $("div#nav-tail").hide();
    $("div#nav-tail").addClass("hidden");

    console.log(moment.format("MMMM Do YYYY, h:mm:ss a"));

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

    function subscribeToNotifications(){

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
    
    

});
