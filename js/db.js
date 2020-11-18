// real-time listener
//collection gets reference to a firebase database
//snapshot acts as a listener to return the current state of the database
db.collection('noteId').onSnapshot(function(snapshot){

    //console.log("SNAPSHOT: " , snapshot.docChanges());
    //docchanges returns all alterations since last snapshot
    // c = something added to db
    // removed = something removed from db

    snapshot.docChanges().forEach(function(change){
        var dbChange = change.type;
        //console.log(change, " ", change.doc.data()), " ", change.doc.id;
        if(dbChange === 'added'){
            addNote(change.doc.data(),change.doc.id);
        }
        else if(dbChange === 'removed'){
            deleteNote(change.doc.data(),change.doc.id);
        }
    });

    


});