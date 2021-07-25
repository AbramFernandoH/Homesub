
const kirim = document.getElementById('kirim');
const kirimReq = firebase.database().ref('RequestSub');

kirim.addEventListener('click', e => {
  const nama = document.getElementById('nama').value;
  const movie = document.getElementById('movies').value;
  const pesan = document.getElementById('pesan').value;
  e.preventDefault();
     if( nama =='' && movie =='' ) {
       alert("Please fill your name and movies subtitles that you request");
    } else {
       if( nama =='' ) {
        alert("Please fill your name");
       } else {
         if ( movie =='' ) {
           alert("Please fill your movies subtitles request");
        } else {
          kirimReq.push().set({
          name: nama,
          movies: movie,
          message: pesan
          }),
           alert("We will grant your subtitles request");
           location.reload(true);
         }
       }
     }
})

firebase.auth().onAuthStateChanged(function(user) {
  var user = firebase.auth().currentUser;

  if (user == null) {
    // No User is signed in.
    window.location = "login.html";
  } else {
    // User is signed in.
  }
});