const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const cancelarTarefa = document.querySelector('.app__form-footer__button--cancel')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')
const bntRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const bntRemoverTodas = document.querySelector('#btn-remover-todas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
// if null -> [], if true -> passa a lista de tarefas para o JSON.parse 
let tarefaSelecionada = null
let liTarefaSelecionada = null

cancelarTarefa.addEventListener('click', () => {
  limparTextarea()
})

function limparTextarea() {
  textarea.value = ''
  formAdicionarTarefa.classList.add('hidden')
}

function atualizarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) { // tranforma tarefa em html
  const li = document.createElement('li')
  li.classList.add('app__section-task-list-item')

  const svg = document.createElement('svg')
  svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
  `

  const paragrafo = document.createElement('p')
  paragrafo.textContent = tarefa.descricao
  paragrafo.classList.add('app__section-task-list-item-description')

  const botao = document.createElement('button')
  botao.classList.add('app_button-edit')

  // atualiza tarefa
  botao.onclick = () => {
    const novaDescricao = prompt('Qual é o novo nome da tarefa?')
    // console.log('Nova descricao', novaDescricao);
    if (novaDescricao) {
      paragrafo.textContent = novaDescricao //atualizou o dom, mas não o localStorage
      tarefa.descricao = novaDescricao // atualizou localStorage
      atualizarTarefas()
    }
  }

  const imagemBotao = document.createElement('img')
  imagemBotao.setAttribute('src', './imagens/edit.png')
  botao.append(imagemBotao)

  li.append(svg)
  li.append(paragrafo)
  li.append(botao)

  if (tarefa.completa) {
    li.classList.add('app__section-task-list-item-complete')
    botao.setAttribute('disabled', 'disabled')
  } else {
    // tarefa em destaque
    li.onclick = () => {
      document.querySelectorAll('.app__section-task-list-item-active')
        .forEach(elemento => {
          elemento.classList.remove('app__section-task-list-item-active')
        })

      // remove a seleção
      if (tarefaSelecionada === tarefa) {
        paragrafoDescricaoTarefa.textContent = ''
        tarefaSelecionada = null
        liTarefaSelecionada = null
        return
      }

      tarefaSelecionada = tarefa
      liTarefaSelecionada = li
      paragrafoDescricaoTarefa.textContent = tarefa.descricao
      li.classList.add('app__section-task-list-item-active')
    }
  }

  return li
}

btnAdicionarTarefa.addEventListener('click', () => {
  formAdicionarTarefa.classList.toggle('hidden') // se tiver hidden tira, senão adiciona, ao clicar no botão add
})

// adiciona tarefa em um objeto no LocalStorage
formAdicionarTarefa.addEventListener('submit', (e) => {
  e.preventDefault()
  const tarefa = {
    descricao: textarea.value
  }
  tarefas.push(tarefa)

  const elementoTarefa = criarElementoTarefa(tarefa) // adiciona a tarefa de forma dinâmica
  ulTarefas.append(elementoTarefa)

  atualizarTarefas()

  limparTextarea()
})

tarefas.forEach((tarefa) => {
  const elementoTarefa = criarElementoTarefa(tarefa)
  ulTarefas.append(elementoTarefa)
})

document.addEventListener('FocoFinalizado', () => {
  if (tarefaSelecionada && liTarefaSelecionada) {
    liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
    liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
    liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')

    tarefaSelecionada.completa = true
    atualizarTarefas()
  }
})  

// remove tarefas concluidas ou todas
const removerTarefas = (somenteCompletas) =>{
  const seletor = somenteCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item'
  document.querySelectorAll(seletor).forEach(e => {
    e.remove() // dom
  })

  tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
  atualizarTarefas()
}

bntRemoverConcluidas.onclick = () => removerTarefas(true)
bntRemoverTodas.onclick = () => removerTarefas(false)

