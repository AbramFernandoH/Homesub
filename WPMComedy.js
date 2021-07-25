window.onload = function() {
  this.getdata();
}

function getdata() {
  firebase.database().ref('Movies/').orderByChild('genre').equalTo('Comedy').on('value', function(snapshot){
    // get posts div
    const posts_div = document.getElementById('bungkus');
    // remove all remaining data in that div
    posts_div.innerHTML = "";
    // get data from firebase
    const data = snapshot.val();
    console.log(data);
    // now past this data to posts div
    // we have to pass our data to for loop to get one by one
    // we are passing the key that post to delete it from database
    for(let[key,value] of Object.entries(data)){
      posts_div.innerHTML = "<div class='box'>"+
      "<div class='imgBx'>"+
      "<img src='"+value.imageURL+"'>"+
      "<div class='content'>"+
      "<h3>"+value.text+"</h3>"+
      "<p>"+value.deskripsi+"</p>"+
      "<p>Genre : "+value.genre+"</p>"+
      "<p>Release Date : "+value.tglRilis+"</p>"+
      "<p>Directors : "+value.director+"</p>"+
      "<p>Cast : "+value.cast+"</p><button><a href='"+value.subtitle+"'>Download Subs</a></button></div></div></div>"+posts_div.innerHTML;
    }
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  var user = firebase.auth().currentUser;

  if (user == null) {
    // No User is signed in.
    window.location = "login.html"
  } else {
    // User is signed in.
  }
});