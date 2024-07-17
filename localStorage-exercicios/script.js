const btnAddTarefas = document.querySelector('.btn-add-task')
const textarea = document.querySelector('.textarea-tasks')
const formAdd = document.querySelector('.form-add-task')

// 2º Carrega as tarefas do localStorage ou inicia com um array vazio
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

const ulTarefas = document.querySelector('.tarefas') // adicionar as tarefas <li> em uma <ul>

function adicionarEAtualizarLocalStorage() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) { // tranforma tarefa em html
  const li = document.createElement('li')

  const paragrafo = document.createElement('p')
  paragrafo.textContent = tarefa.descricao

  const botao = document.createElement('button')
  botao.textContent = 'Editar'

  // fica dentro do li
  li.append(paragrafo)
  li.append(botao)

  console.log(li)

  // atualiza tarefa
  botao.onclick = (e) => {
    e.stopPropagation()
    const novaTarefa = prompt('Qual é a nova tarefa?')
    if (novaTarefa) {
      paragrafo.textContent = novaTarefa
      tarefa.descricao = novaTarefa
      adicionarEAtualizarLocalStorage()
    }
  }

  // cria tarefa completa no LS
  li.onclick = () => {
    tarefa.completa = true
    adicionarEAtualizarLocalStorage()
    atualizarEstadoTarefa(tarefa, paragrafo, botao)
  }

  atualizarEstadoTarefa(tarefa, paragrafo, botao)

  // paragrafo.onclick = () =>{
  //   document.querySelectorAll('.task-concluida').forEach(e => {
  //     e.classList.remove('task-concluida')
  //   })
  //   paragrafo.classList.add('task-concluida')
  // }

  return li
}

// se a tarefa estiver completa 
function atualizarEstadoTarefa(tarefa, paragrafo, botao) {
  if (tarefa.completa) {
    paragrafo.classList.add('task-concluida');
    botao.setAttribute('disabled', 'disabled');
  } else {
    paragrafo.classList.remove('task-concluida');
    botao.removeAttribute('disabled');
  }
}

btnAddTarefas.addEventListener('click', () => {
  formAdd.classList.toggle('hidden')
})

// adiciona tarefa no LocalStorage
formAdd.addEventListener('submit', (e) => {
  e.preventDefault()

  const tarefa = {
    descricao: textarea.value
  }
  tarefas.push(tarefa)

  const elementoTarefa = criarElementoTarefa(tarefa)
  ulTarefas.append(elementoTarefa)

  // 1º - armazena no localStorage como string
  adicionarEAtualizarLocalStorage()
})

// 3º Adiciona as tarefas carregadas do localStorage ao DOM (tarefas volta a ser array -> JSON.parse)
tarefas.forEach(tarefa => {
  const elementoTarefa = criarElementoTarefa(tarefa)
  ulTarefas.append(elementoTarefa)
});

// tirar seleção da tarefa completa
// excluir
