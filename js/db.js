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
            console.log("Note added" ,change.doc.id);
            addNewNote(change.doc.data(),change.doc.id);
        }
        else if(dbChange === 'removed'){
            console.log("Note removed",change.doc.id);
            deleteNote(change.doc.data(),change.doc.id);
        }
    //console.log(change, " ", change.doc.data()), " ", change.doc.id;
    });
});

const form = document.querySelector('prioritySect');
form.addEventListener('submit', evt => {
    evt.preventDefault();
    const note = {
        title: form.noteTitle.value, /** id of input in form */
        body: form.noteBody.value
    };
    
    db.collection('noteId').add(note).catch(function(e){
        console.log(e); /**print out error if there is one */
    });

    form.noteTitle.value = '';
    form.noteBody.value = '';
});

