//db variable instatntiated in index.html 
//const db = firebase.firestore();
//snapshot of firebase db


//offline data
db.enablePersistence().catch(function(error){
    if(error.code == "failed-precondition"){
        console.log("persistence failed"); //multiple tabs would cause this error
    }
    else if(error.code = "unimplemented"){
        console.log("Persistence is not available"); //no browser support
    }
});

//real-time listener
//collection gets reference to a firebase database
//snapshot acts as a listener to return the current state of the database
db.collection('notes').onSnapshot(function(snapshot){
    //console.log(snapshot.data());
    //c onsole.log("SNAPSHOT: " , snapshot.docChanges());
    //docchanges returns all alterations since last snapshot

        //loop through changes in db and handle accordingly
    snapshot.docChanges().forEach(function(change){
        const dbChange = change.type;
        if(dbChange === 'added'){
            console.log(dbChange, " " , change.doc.id);
            addNote(change.doc.data(),change.doc.id);                              
        }
        // else if(dbChange === 'modified'){
        //     console.log(dbChange, " " , change.doc.id, change.doc.data());
        //     updateNote(change.doc.data(),change.doc.id);
        // }
        else if(dbChange === 'removed'){
            console.log(dbChange, " " , change.doc.id);
            deleteNote(change.doc.id);
            //line63 deletes the note from the database using the bin icon as the trigger
        }
    //c onsole.log(change, " ", change.doc.data()), " ", change.doc.id;
    });
});

/** add new note object to the database */
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault(); //prevent page reload - default behaviour
    const note = {
        title: form.noteTitle.value, /** id of input in form */
        body: form.noteBody.value,
        wallpaper: form.wallpaper.value,
        rank: form.rank.value
    };
    db.collection('notes').add(note).catch(function(error){
        console.log(error);
    });
    /**wipe the note for the next note */
    form.noteTitle.value = '';                                                                           /** NEED TO UNDO */
    form.noteBody.value = '';
});

/**delete note */
const notesContainer = document.querySelector('.notes');
notesContainer.addEventListener('click', e => { /**listen for a click anywhere in the notes area, then if that click was in the I tag for the delete, take the ID and send a delete request to Firestore */
    console.log(e.target);
    const tagName = e.target.tagName;
    const isDeleteButton = e.target.classList.contains('delete-icon');
    const isDetails = e.target.classList.contains('note-details');
    //c onsole.log(isDeleteButton + ":isDeleteButton, " + tagName + ":tagName "); what part of the "note" has been clicked on
    if(tagName === 'I' && tagName != null && tagName != undefined && isDeleteButton === true){
        const id = e.target.getAttribute('data-id');
        //c onsole.log("id: " + id);
        db.collection('notes').doc(id).delete();
    }

    if(isDetails){
        console.log("pls");
    }
});

function updateRecord(id, upTitle, upBody){
    db.collection('notes').doc(id).update({
        title: upTitle,
        body: upBody
    })
};

