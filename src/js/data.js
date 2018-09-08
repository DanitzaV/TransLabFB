$(document).ready(function () {
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('.collapsible').collapsible();
});
let uiduser;

function agregarTarjeta() {
  const numeroBip = icon_telephone.value;
  if (numeroBip == '') {
  return  alert('ingrese el numero de bip');
  } else {
    return firebase.database().ref(`bips/${uiduser}`).child(`numBip`).push(numeroBip);
    document.getElementById('icon_telephone').value = '';
  }
}




function tarjetaBip() {
 
  let selectinput = selectBip.value;
  let inputBips = inputBip.value;
  let resultado= '';

  let urls
  if (inputBips == '') {
    urls = `https://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${selectinput}`;

  } else {
    urls = `https://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${inputBips}`;
    document.getElementById("inputBip").value = "";


  }

  fetch(urls).then(response => response.json()
  ).then(respuestaJson => {
    console.log(respuestaJson)
    resultado = respuestaJson.saldoTarjeta;
    
    verSaldo(respuestaJson)
    console.log(saldo)
  }).catch(err => {
    console.log(err)
  })


}
function calcularTarifa() {
  let selectinput = selectBip.value;
  let inputBips = inputBip.value;
  
  let urls
     if(inputBips == ''){
       urls = `https://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${selectinput}`;
       
     }else{
       
       urls = `https://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${inputBips}`;
      document.getElementById("inputBip").value = "";
 
       
     }
 
   fetch(urls).then(response => response.json()
   ).then(respuestaJson => {
     saldo(respuestaJson)
    console.log(respuestaJson)
   }).catch(err => {
       console.log('numero no encontrado'+  err)
   })
 
   
 } 
 function saldo(infoBip) {
  let saldoBip = infoBip.saldoTarjeta;
  let saldo = saldoBip.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "");
  console.log(saldo);
  console.log(saldoBip)
    let selectinput = parseInt(inputGroupSelect02.value); 
    console.log(selectinput) 
    let saldo_final = (parseInt(saldo) - selectinput);
    console.log(saldo_final)
  mostrarTarifayCosto(selectinput,saldo_final)
 
 }

function registro() {
  const emailValue = email.value;
  const passwordValue = password.value;
  if (passwordValue.length <= 8 && passwordValue.length > 3) {
    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
      .then((response) => {
        location = '../index.html'
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

      location = 'html/perfil.html';
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
      location = '../index.html';
    })
    .catch();
}



