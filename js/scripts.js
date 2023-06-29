btnCriarEquipe.onclick = function(){
    overlay.classList.add('active');
    modal.classList.add('active');
}

overlay.onclick = function(){
    overlay.classList.remove('active');
    modal.classList.remove('active');
}

FecharForm.onclick = function(){
    overlay.classList.remove('active');
    modal.classList.remove('active');
}

let equipes = [];

listarEquipes()

function listarEquipes() {
    listaDeEquipes.innerHTML = '';
    for(let i = 0; i < equipes.length;i++){
    listaDeEquipes.innerHTML += `
       <li>
       <h4>${equipes[i].nome}</h4>
       <div>
           <h2>${equipes[i].participantes} <span> / ${equipes[i].qtdMax}</span></h2>
           <button>
               <box-icon name='plus'></box-icon> Adicionar
           </button>
       </div>
   </li>
       ` 
    }   
}



function criarEquipe (){
    event.preventDefault();
    let equipeNome = document.querySelector('#equipe-nome');
    let equipeQtd = document.querySelector('#equipe-qtd');
      equipes.push(
          {
            nome: equipeNome.value,
            qtdMax: equipeQtd.value,
            participantes: 0,
          }
    );
      
    listarEquipes();
}

