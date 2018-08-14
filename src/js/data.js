$(document).ready(function () {
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('.collapsible').collapsible();
});
let uiduser;


function agregarTarjeta() {
  const numeroBip = icon_telephone.value;
  if (numeroBip == '') {
    alert('ingrese el numero de bip');
  } else {
    firebase.database().ref(`bips/${uiduser}`).child(`numBip`).push(numeroBip);
    // document.getElementById('icon_telephone').value = '';
  }
  // firebase.database().ref(`bips/${uiduser}`).set({
  //   numBip: arraytarjetas
  // });

}




function tarjetaBip() {
 
  let selectinput = selectBip.value;
  let inputBips = inputBip.value;

  let urls
  if (inputBips == '') {
    urls = `https://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${selectinput}`;

  } else {
    urls = `https://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${inputBips}`;
    // document.getElementById("inputBip").value = "";


  }

  fetch(urls).then(response => response.json()
  ).then(respuestaJson => {
    console.log(respuestaJson)
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
       document.getElementById("valueinputBip").value = "";
 
       
     }
 
   fetch(urls).then(response => response.json()
   ).then(respuestaJson => {
     // const saldo = respuestaJson[Saldotarjeta];
     
     saldo(respuestaJson)
    
   //   saldoTotal.innerHTML += `<div class="col-12 col-sm-12 col-md-12 col-lg-12 contSaldo text-center" >
   //   <h4>Saldo Total</h4>
   //   <p>${respuestaJson["Saldo tarjeta"]}</p>
   //  </div>`
    console.log(respuestaJson)
   }).catch(err => {
       console.log('numero no encontrado'+  err)
   })
   function saldo(infoBip) {
    let saldoBip = infoBip.saldoTarjeta;
    let saldo = saldoBip.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "");
    console.log(saldo);
    console.log(saldoBip)
      let selectinput = parseInt(inputGroupSelect02.value); 
      console.log(selectinput) 
      let saldo_final = (parseInt(saldo) - selectinput);
      console.log(saldo_final)
     // document.getElementById('resultadosaldo').style.display = 'block';
    mostrarTarifayCosto(selectinput,saldo_final)
   
   }
   
 } 

function registro() {
  const emailValue = email.value;
  const passwordValue = password.value;
  if (passwordValue.length <= 8 && passwordValue.length > 3) {
    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
      .then((response) => {x8
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



