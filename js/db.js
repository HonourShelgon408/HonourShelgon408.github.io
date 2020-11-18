// real-time listener
db.collection('noteId').onSnapshot(function(snapshot){
    //takes snapshot of database at that time and returns it in the callback function
    //returns this snapshot to us
    console.log(snapshot.docChanges())
});