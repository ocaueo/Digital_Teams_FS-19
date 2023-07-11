btnCriarEquipe.onclick = function(){
    overlay.classList.add('active');
    modal.classList.add('active');
}

function modalAdicionar(posicao){
    overlay.classList.add('active');
    modal2.classList.add('active');
    equipeId.value = posicao;
}

let fecharForm = document.querySelectorAll('.fecharForm');
for(let i = 0; i < fecharForm.length; i++){
    fecharForm[i].onclick = function(){
        overlay.classList.remove('active');
        modal.classList.remove('active');
        modal2.classList.remove('active');
    }
}

overlay.onclick = function(){
    overlay.classList.remove('active');
    modal.classList.remove('active');
    modal2.classList.remove('active');
}

let equipes = JSON.parse(localStorage.getItem('equipes')) || [];

function listarEquipes(){
    listaDeEquipes.innerHTML = '';
    if(equipes.length > 0){
        for(let i = 0; i < equipes.length; i++){
            listaDeEquipes.innerHTML += `
                <li>
                    <h4>${equipes[i].nome}<box-icon name="home" onClick=""></box-icon></h4>
                    <div>
                        <h2>${equipes[i].participantes.length} <span>/ ${equipes[i].qtdMax}</span></h2>
                        <div class='acoes'>
                            <button onClick='modalAdicionar(${i})'>
                                Adicionar
                            </button>
                            <button onClick='deletarEquipe(${i})'>
                                <box-icon name='trash'></box-icon>
                            </button>
                        </div>
                    </div>
                </li>
            `;
        }
    }else{
        listaDeEquipes.innerHTML = `
            <li class='sem-equipes'>Crie sua primeira equipe!</li>
        `;
    }
}

listarEquipes();

function criarEquipe(){
    event.preventDefault();
    let equipeNome = document.querySelector('#equipe-nome');
    let equipeQtd = document.querySelector('#equipe-qtd');
    equipes.push(
        {
            nome: equipeNome.value,
            qtdMax: equipeQtd.value,
            participantes: []
        }
    );
    if(!localStorage.getItem('equipes')){
        localStorage.setItem('equipes', JSON.stringify(equipes));
    }else{
        let equipesSalvas = JSON.parse(localStorage.getItem('equipes'));
        equipesSalvas.push(
            {
                nome: equipeNome.value,
                qtdMax: equipeQtd.value,
                participantes: []
            }
        );
        localStorage.setItem('equipes', JSON.stringify(equipesSalvas));
    }
    formCriar.reset();
    overlay.classList.remove('active');
    modal.classList.remove('active');
    listarEquipes();
}

function deletarEquipe(posicao){
    let opcao = confirm("Deseja realmente apagar este item?");
    if(opcao){
        let equipesRestantes = [];
        let equipesSalvas = JSON.parse(localStorage.getItem('equipes'));
        for(let i = 0; i < equipes.length; i++){
            if(i != posicao){
                equipesRestantes.push(equipes[i]);
            }
        }
        equipes = [];
        equipes = equipesRestantes;
        equipesSalvas = [];
        equipesSalvas = equipesRestantes;
        localStorage.setItem('equipes', JSON.stringify(equipesSalvas));
        listarEquipes();
    }
}

function addParticipante(){
    event.preventDefault();
    let eId = document.querySelector('#equipeId');
    let pNome = document.querySelector('#participante-nome');

    if(equipes[eId.value].participantes.length < equipes[eId.value].qtdMax){
        equipes[eId.value].participantes.push(pNome.value);
        localStorage.setItem('equipes', JSON.stringify(equipes));
        formAddParticipante.reset();
        listarEquipes()
    }else{
        alert('Esta equipe já está completa');
    }

}
