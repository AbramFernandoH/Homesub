const masukAdmin = document.getElementById('loginAdminHS');

masukAdmin.addEventListener('click', function(){
  const email = "AbramKevinHomeSub@mail.com";
  const password = "HomeSubKevinAbram";
  const emailAdmin = document.getElementById('emailAdminHS').value;
  const passwordAdmin = document.getElementById('passwordAdmin').value;
  if( emailAdmin == '' && passwordAdmin == ''){
    alert("Please fill email and password")
  } else if (emailAdmin == ''){
    alert("Please fill admin email");
  } else if(passwordAdmin == ''){
    alert("Please fill your password");
  } else if( emailAdmin != email && passwordAdmin != password){
    alert("Your email and password do not match");
  } else if (emailAdmin != email || passwordAdmin != password) {
    alert("Your email and password do not match");
  } else {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
      window.location = "halamanAdmin.html";
    }).catch(function (error) {
      const pesanError = error.message;
      alert(pesanError);
    })
  }
});