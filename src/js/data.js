$(document).ready(function () {
  $('.sidenav').sidenav();
  $('select').formSelect();
});
let uiduser;


function agregarTarjeta() {
  const numeroBip = icon_telephone.value;

  firebase.database().ref(`bips/${uiduser}`).child(`numBip`).push(numeroBip);
  document.getElementById('icon_telephone').value = '';
  // firebase.database().ref(`bips/${uiduser}`).set({
  //   numBip: arraytarjetas
  // });

}




function tarjetaBip() {

  let selectinput = selectBip.value;
  let inputBips = inputBip.value;

  let urls
  if (inputBip == '') {
    urls = `http://www.psep.cl/api/Bip.php?&numberBip=${selectinput}`;

  } else {

    urls = `http://www.psep.cl/api/Bip.php?&numberBip=${inputBips}`;
    document.getElementById("inputBip").value = "";


  }

  fetch(urls).then(response => response.json()
  ).then(respuestaJson => {
    // const saldo = respuestaJson[Saldotarjeta];

    verSaldo(respuestaJson)

    //   saldoTotal.innerHTML += `<div class="col-12 col-sm-12 col-md-12 col-lg-12 contSaldo text-center" >
    //   <h4>Saldo Total</h4>
    //   <p>${respuestaJson["Saldo tarjeta"]}</p>
    //  </div>`
    console.log(saldo)
  }).catch(err => {
    console.log('numero no encontrado')
  })


}

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



