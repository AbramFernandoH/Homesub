function upload(hsFiles){
  // get your image
  const image = document.getElementById('image').value;
  // get blog text
  const post = document.getElementById('post').value;
  const genree = document.getElementById('kategori').value;
  const deskripsii = document.getElementById('deskripsi').value;
  const rilis = document.getElementById('tglRilis').value;
  const direktorr = document.getElementById('direktor').value;
  const castt = document.getElementById('cast').value;
  const subs = document.getElementById('hsSubs').files[0];
  // get image name
  const subsName = subs.name;
  // firebase storage reference
  // It is the path where your image will be stored
  const storageRef = firebase.storage().ref('subtitle/'+subsName);
  // upload image to selected storage reference
  const uploadTask = storageRef.put(subs);
  // to get the state of image uploading
  uploadTask.on('state_changed', function(snapshot){
    // get task progress by following code
    const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    console.log("upload subtitle is"+progress+" done");
  }, function(error) {
    // handle error here
    console.log(error.message);
  }, function() {
    // handle upload successfull upload here
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
      // get your image download url here and upload it to database
      // our path where data is stored ...push is used so that every post have unique
      firebase.database().ref('Movies/').push().set({
        text:post,
        genre:genree,
        deskripsi:deskripsii,
        tglRilis:rilis,
        director:direktorr,
        cast:castt,
        imageURL:image,
        subtitle: downloadURL
      }, function(error) {
        if(error){
          alert("Error while uploading");
        }else{
          alert("Successfully uploaded");
          // now reset your form
          document.getElementById('post-form').reset();
          getdata();
        }
      });
    });
  });
}

const tUpload = document.getElementById('tUpload');
tUpload.onclick = upload;

window.onload = function() {
  this.getdata();
}

function getdata() {
  firebase.database().ref('Movies/').orderByValue().on('value', function(snapshot){
    // get posts div
    const posts_div = document.getElementById('posts');
    // remove all remaining data in that div
    posts_div.innerHTML = "";
    // get data from firebase
    const data = snapshot.val();
    console.log(data);
    // now past this data to posts div
    // we have to pass our data to for loop to get one by one
    // we are passing the key that post to delete it from database
    for(let[key,value] of Object.entries(data)){
      posts_div.innerHTML = "<div class='col-sm-4 mt-2 mb-1 tampill'>"+
      "<div class='card'>"+
      "<img src='"+value.imageURL+"' style='height:250px;'>"+
      "<div class='card-body'><h3 id='ubahTeks'>"+value.text+ "<br>"+
      "<p class='card-text'>Description: </p>"+
      "<p class='card-text'>"+value.deskripsi+ "<br>"+
      "<p class='card-text'>Genre: </p>"+
      "<p class='card-text'>"+value.genre+ "<br>"+
      "<p class='card-text'>Release Date: </p>"+
      "<p class='card-text'>"+value.tglRilis+ "<br>"+
      "<p class='card-text'>Directors: </p>"+
      "<p class='card-text'>"+value.director+ "<br>"+
      "<p class='card-text'>Cast: </p>"+
      "<p class='card-text'>"+value.cast+ "<br>"+
      "<p class='card-text'>Subtitle Link: </p>"+
      "<p class='card-text'>"+value.subtitle+ "<br>"+
      "<button class='btn btn-danger mt-1' id='"+key+"' onclick='delete_post(this.id)'>Hapus</button>"+
      "<button class='btn btn-warning ml-2 mt-1 ubahSub' data-key='"+key+"'>Ubah</button>"+
      "</div></div></div>"+posts_div.innerHTML;
    }
  });
}

firebase.database().ref('Movies').on('child_changed', function(data) {
  ubahhData(data.val().text,data.key)
  });

function ubahhData(key, text, imageURL,value,deskripsi,tglRilis,director,cast){
$("#posts").html("<div class='col-sm-4 mt-2 mb-1 tampill'>"+
"<div class='card'>"+
"<img src='"+value.imageURL+"' style='height:250px;'>"+
"<div class='card-body'><h3 id='ubahTeks'>"+value.text+ "<br>"+
"<p class='card-text'>Description: </p>"+
"<p class='card-text'>"+value.deskripsi+ "<br>"+
"<p class='card-text'>Description: </p>"+
"<p class='card-text'>"+value.genre+ "<br>"+
"<p class='card-text'>Release Date: </p>"+
"<p class='card-text'>"+value.tglRilis+ "<br>"+
"<p class='card-text'>Directors: </p>"+
"<p class='card-text'>"+value.director+ "<br>"+
"<p class='card-text'>Cast: </p>"+
"<p class='card-text'>"+value.cast+ "<br>"+
"<p class='card-text'>Subtitle Link: </p>"+
"<p class='card-text'>"+value.subtitle+ "<br>"+
"<button class='btn btn-danger mt-1' id='"+key+"' onclick='delete_post(this.id)'>Hapus</button>"+
"<button class='btn btn-warning ml-2 mt-1 ubahSub' data-key='"+key+"'>Ubah</button>"+
"</div></div></div>");
}

function delete_post(key) {
  firebase.database().ref('Movies/'+key).remove();
  getdata();
}

function edit_post(key) {
  firebase.database().ref('Movies/'+key).update({
    text: post,
    deskripsi:deskripsii,
    genre:genree,
    tglRilis:rilis,
    director:direktorr,
    cast:castt,
  });
}

// tekan ubah
$(document).on("click",".ubahSub",function(event){
  event.preventDefault();
  key = $(this).attr("data-key");
  firebase.database().ref('Movies/'+key).once("value").then(function(snapshot){
  $("#hsJudul").val(snapshot.val().text);
  $("#hsDeskripsi").val(snapshot.val().deskripsi);
  $("#hsKategori").val(snapshot.val().genre);
  $("#hsRilis").val(snapshot.val().tglRilis);
  $("#hsDirektor").val(snapshot.val().director);
  $("#hsCast").val(snapshot.val().cast);
  $("#hsSubtitle").val(snapshot.val().subtitle);
  $("#txtType").val("E"); 
  $("#txtKey").val(key); 
  });
  $( "#modal" ).addClass( "is-active" );
  });

  $( "#tbTutup,.tmblTutup" ).click(function() {
    $( "#modal" ).removeClass( "is-active" );
    });

// Melakukan proses update data
function updateData_Proses()
{
  const ubah_proses = $('#hsJudul').val();
  const ubah_proses1 = $('#hsDeskripsi').val();
  const ubah_proses2 = $('#hsKategori').val();
  const ubah_proses3 = $('#hsRilis').val();
  const ubah_proses4 = $('#hsDirektor').val();
  const ubah_proses5 = $('#hsCast').val();
  const ubah_proses6 = $('#hsSubtitle').val();
  const ubah = firebase.database().ref("Movies/" + key);

  ubah.update ({
     "text": ubah_proses,
     "deskripsi": ubah_proses1,
     "genre": ubah_proses2,
     "tglRilis": ubah_proses3,
     "director": ubah_proses4,
     "cast": ubah_proses5,
     "subtitle": ubah_proses6
  });

  $("#tbTutup").click();
  ubahhData();
}

function mencari_data() {
  const mencarii = $("#cariTF").val();
  const mencariDataa = firebase.database().ref("Movies").orderByChild("text").startAt(mencarii).endAt(mencarii + "\uf8ff");

  mencariDataa.on('value', function(snapshot) {

    const posts_div = document.getElementById('posts');

    posts_div.innerHTML = "";

    const data = snapshot.val();
    console.log(data);

    if(data == null){
      alert("Movies do not found, search other movies");
      // now reset your form
      document.getElementById('post-form').reset();
      getdata();
    } else {
      for(let[key,value] of Object.entries(data)){
        posts_div.innerHTML = "<div class='col-sm-4 mt-2 mb-1 tampill'>"+
        "<div class='card'>"+
        "<img src='"+value.imageURL+"' style='height:250px;'>"+
        "<div class='card-body'><h3 id='ubahTeks'>"+value.text+ "<br>"+
        "<p class='card-text'>Description: </p>"+
        "<p class='card-text'>"+value.deskripsi+ "<br>"+
        "<p class='card-text'>Genre: </p>"+
        "<p class='card-text'>"+value.genre+ "<br>"+
        "<p class='card-text'>Release Date: </p>"+
        "<p class='card-text'>"+value.tglRilis+ "<br>"+
        "<p class='card-text'>Directors: </p>"+
        "<p class='card-text'>"+value.director+ "<br>"+
        "<p class='card-text'>Cast: </p>"+
        "<p class='card-text'>"+value.cast+ "<br>"+
        "<p class='card-text'>Subtitle Link: </p>"+
        "<p class='card-text'>"+value.subtitle+ "<br>"+
        "<button class='btn btn-danger mt-1' id='"+key+"' onclick='delete_post(this.id)'>Hapus</button>"+
        "<button class='btn btn-warning ml-2 mt-1 ubahSub' data-key='"+key+"'>Ubah</button>"+
        "</div></div></div>"+posts_div.innerHTML;
      }
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