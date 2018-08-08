window.onload = () => {
    firebase.database().ref('bips')
    .on('child_added', (bips)=>{ //Para escuchar datos más veces o doblegados
      contenedorBips.innerHTML += `<div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <p class="optionsbips">${bips.val().numBip}</p>
         </div>`;
        
    });
}