$(document).ready(function(){
    $('.sidenav').sidenav();
  });

function registro() {
  const emailValue = email.value;
  const passwordValue = password.value;
  if (passwordValue.length <= 8 && passwordValue.length > 3) {
    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
      .then((response) => {
        location = '../../dist/index.html'
        console.log('usuario registrado');
      })
      .catch((error) => {
        console.log("Error de firebase > Código > " + error.code);
        console.log("Error de firebase > Mensaje > " + error.message);
      });
  }
}
function login() {
  const emailValue = email.value;
  const passwordValue = password.value
  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {

      location = '../../dist/html/perfil.html';
      console.log("Usuario con login exitoso");
    })
    .catch((error) => {
      console.log("Error de firebase > " + error.code);
      console.log("Error de firebase, mensaje > " + error.message);
    });


}
function cerrarSesion() {
  firebase.auth().signOut()
    .then(() => {
      location = '../../dist/index.html';
    })
    .catch();
}

function agregarTarjeta() {
  const currentUser = firebase.auth().currentUser;
  const numeroBip = icon_telephone.value;
  const tarjetas = firebase.database().ref().child('bips').push().key;

  firebase.database().ref(`bips/${tarjetas}`).set({
    creator: currentUser.uid,
    numBip: numeroBip
  });
  console.log(currentUser);
}