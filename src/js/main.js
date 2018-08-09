
let useremail;
firebase.auth().onAuthStateChanged((user) =>{
    uiduser = user.uid;
    useremail = user.email;
    if (user) {
        console.log(user);
       

    }
    firebase.database().ref(`bips/${user.uid}/numBip/`)
        .on('child_added', (bips) => { //Para escuchar datos más veces o doblegados
            console.log(bips.val())
            let selectBip = document.getElementById('selectBip');
            let option =  document.createElement('option');
            const numbip = document.createTextNode(bips.val());
            option.appendChild(numbip);
            // let option = `<option> ${bips.val()} </option>`;
            selectBip.appendChild(option)
        });
    inputGroupSelect02.innerHTML += `<option value="769">Horario Alto</option>
  <option value="680">Horario Medio</option>
  <option value="630">Horario Bajo</option>
   `;
   
});


const verSaldo = (infoBip) => {
    let saldoBip = infoBip["Saldo  tarjeta"];
    saldoTotal.innerHTML = `<div class="col-12 col-sm-12 col-md-12 col-lg-12 contSaldo text-center" >
       <h4>Saldo Total</h4>
      <p>${saldoBip}</p>
      </div>`
}