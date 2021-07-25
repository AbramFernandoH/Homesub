window.onload = function() {
  this.getdata();
}

function getdata() {
    // get posts div
    var dbRef = firebase.database();
		var requestt = dbRef.ref("RequestSub/");
    var rekuest = document.getElementById("userReq").getElementsByTagName('tbody')[0];
    
    $("#userReq").find("tr:gt(0)").remove();
    
    requestt.on("child_added", function(data, prevChildKey) {
    var hsReqSubs = data.val();

    var row = rekuest.insertRow(rekuest.rows.length);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = hsReqSubs.name; 
    cell2.innerHTML = hsReqSubs.movies;
    cell3.innerHTML = hsReqSubs.message; 
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