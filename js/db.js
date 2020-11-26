//offline data
db.enablePersistence().catch(function(error){
    if(error.code == "failed-precondition"){
        console.log("persistence failed"); //multiple tabs would cause this error
    }
    else if(error.code = "unimplemented"){
        console.log("Persistence is not available"); //no browser support
    }
});

// real-time listener
//collection gets reference to a firebase database
//snapshot acts as a listener to return the current state of the database
db.collection('noteId').onSnapshot(function(snapshot){

    //console.log("SNAPSHOT: " , snapshot.docChanges());
    //docchanges returns all alterations since last snapshot
    // c = something added to db
    // removed = something removed from db

        //loop through changes in db and handle accordingly
    snapshot.docChanges().forEach(function(change){
        var dbChange = change.type;
        if(dbChange === 'added'){
            console.log("Note added - id:",change.doc.id);
            addNewNote(change.doc.data(),change.doc.id);                              
        }
        else if(dbChange === 'removed'){
            console.log("Note removed - id:",change.doc.id);
            deleteNote(change.doc.id);
        }
    //console.log(change, " ", change.doc.data()), " ", change.doc.id;
    });
});


/** add new note object to the database */
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault(); //prevent page reload - default behaviour
    const note = {
        title: form.noteTitle.value, /** id of input in form */
        body: form.noteBody.value
    };
    
    db.collection('noteId').add(note).catch(function(error){
        console.log(error);
    });

    form.noteTitle.value = '';
    form.noteBody.value = '';
});

/**delete note */

const notesContainer = document.querySelector('.notes');
notesContainer.addEventListener('click', function(e){
  console.log({e});
  if(e.target.tagName === 'I'){
      const id = e.target.getAttribute('data-id');
      db.collection('noteId').doc(id).delete();

  }
})