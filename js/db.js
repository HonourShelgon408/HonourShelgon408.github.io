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
db.collection('notes').orderBy("title").onSnapshot(function(snapshot){
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
const form = document.querySelector('#addForm');
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
    form.noteTitle.value = '';
    form.noteBody.value = '';
});

/** update note */
const updateForm = document.querySelector('#updateForm');
updateForm.addEventListener('submit', evt => {
    evt.preventDefault(); /**using the ID from the update form (hidden=true) to update the database with custom function */
    console.log(updateForm);
    updateRecord(updateForm);
    updateForm.updateNoteId.value = '';
    updateForm.updateNoteTitle.value = '';                                                                           
    updateForm.updateNoteBody.value = '';
    updateForm.updateReminder.value = '';
    updateForm.updateNoteWallpaper.value = '';
    updateForm.updateNoteRank.value = '';
    updateForm.updateNoteReminder.value = '';
});

/**delete note */
const notesContainer = document.querySelector('.notes');
notesContainer.addEventListener('click', e => { /**listen for a click anywhere in the notes area, then if that click was in the I tag for the delete, take the ID and send a delete request to Firestore */
    console.log(e.target);
    const tagName = e.target.tagName;
    const isDeleteButton = e.target.classList.contains('delete-icon');
    const isDetails = e.target.classList.contains('note-title') || e.target.classList.contains('note-body');
    const isBellIcon = e.target.classList.contains('bell-icon');
   
    if(tagName === 'I' && tagName != null && tagName != undefined && isDeleteButton === true){
        const id = e.target.getAttribute('data-id');
        //c onsole.log("id: " + id);
        db.collection('notes').doc(id).delete();
    }
    if(isDetails){
        const id = e.target.getAttribute('data-id');
        getNoteFromFirebase(id, populateUpdateForm);
    }
    if(isBellIcon){
        
    }
});

function getNoteFromFirebase(id, updateFormCallback){
    let data = "";
    var myDoc = db.collection('notes').doc(id);
    myDoc.get().then(function(doc){
        if(doc.exists){
            console.log("doc.exists");
            data = doc.data();
            let dataObj = {id: id, stats: data};
            updateFormCallback(dataObj);
        }
        else {
            console.log("doc doesnt exist");
            data = [];
        }
    }).catch(function(error){
        console.log("Error getting document: ", error);
    });
}

function populateUpdateForm(data){
    console.log(data);
    const updateForm = document.querySelector('#updateForm');
    udpateForm.updateNoteTitle.classList.add("active");
    udpateForm.updateNoteBody.classList.add("active");
    updateForm.updateNoteId.value = data.id;
    updateForm.updateNoteTitle.value = data.stats.title;
    updateForm.updateNoteBody.value = data.stats.body;
}

function updateRecord(updateForm){
    // const id = updateForm.updateNoteId.value;
    // const upTitle = updateForm.updateNoteId.value;
    // const upBody = updateForm.updateNoteId.value;
    // const upWallpaper = updateForm.updateNoteId.value;
    // const upRank = updateForm.updateNoteId.value;
    // const upReminder = updateForm.updateNoteId.value;

    db.collection('notes').doc(updateForm.updateNoteId.value).update({
        title: updateForm.updateNoteTitle.value,
        body: updateForm.updateNoteBody.value,
        wallpaper: updateForm.updateNoteWallpaper.value,
        rank: updateForm.updateNoteRank.value,
        reminder: updateForm.updateNoteReminder.value
    })
};
