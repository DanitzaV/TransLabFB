firebase.auth().onAuthStateChanged((user) => {
    uiduser = user.uid;
    useremail = user.email;
    contCorreo.innerHTML = useremail;
    firebase.database().ref(`bips/${uiduser}/numBip`)
        .on('child_added', (bips) => { //Para escuchar datos más veces o doblegados
            console.log(bips.val())
            contenedorBips.innerHTML += `<div class="col-12 col-sm-12 col-md-12 col-lg-12">
      <p class="optionsbips formaTarjeta">${bips.val()}</p>
       </div>`;
        });
});