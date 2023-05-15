const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');




function criarTarefa(textoInput){
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaImput();
  criarBtnApagar(li);
  salvarTarefa();
}

function criaLi(){
  const li = document.createElement('li');
  return li;
}

btnTarefa.addEventListener('click', e => {
  if(!inputTarefa.value) return;
  criarTarefa(inputTarefa.value);
});

function limpaImput(){
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criarBtnApagar(li){
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.innerText = 'Apagar';
  li.appendChild(botaoApagar);
}


function salvarTarefa(){
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for(let tarefa of liTarefas){
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);


}


function addTarefasSalvas(){
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for(let tarefa of listaDeTarefas){
    criarTarefa(tarefa);
  }
}


document.addEventListener('keypress', e =>{
  if(e.keyCode === 13){
    if(!inputTarefa.value) return;
    criarTarefa(inputTarefa.value);
  }
});


document.addEventListener('click', e => {
  const el = e.target;
  if(el.classList.contains('apagar')){
    el.parentElement.remove();
    salvarTarefa()
  }
});


addTarefasSalvas();