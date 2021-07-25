window.onload = function() {
  this.getdata();
  this.updata();
}

function getdata() {
  firebase.database().ref('Movies/').limitToFirst(6).on('value', function(snapshot){
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

function updata(){
  firebase.database().ref('Movies/').orderByChild('genre').equalTo('Upcoming').on('value', function(snapshot){
    // get posts div
    const upcomings = document.getElementById('upcoming');
    // remove all remaining data in that div
    upcomings.innerHTML = "";
    // get data from firebase
    const data = snapshot.val();
    console.log(data);
    // now past this data to posts div
    // we have to pass our data to for loop to get one by one
    // we are passing the key that post to delete it from database
    for(let[key,value] of Object.entries(data)){
      upcomings.innerHTML = "<div class='box'>"+
      "<div class='imgBx'>"+
      "<img src='"+value.imageURL+"'>"+
      "<div class='content'>"+
      "<h3>"+value.text+"</h3>"+
      "<p>"+value.deskripsi+"</p>"+
      "<p>Genre : "+value.genre+"</p>"+
      "<p>Release Date : "+value.tglRilis+"</p>"+
      "<p>Directors : "+value.director+"</p>"+
      "<p>Cast : "+value.cast+"</p></div></div></div>"+upcomings.innerHTML;
    }
  });
}

const keluar = document.getElementById('btnKeluar');

keluar.addEventListener('click', function() {
  firebase.auth().signOut().then(function() {
    window.location = "login.html";
  }).catch(function(error) {
    alert("Failed to Logout");
  });
  });

  firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;

    if (user == null) {
      // No User is signed in.
      window.location = "login.html"
    } else {
      // User is signed in.
    }
  });