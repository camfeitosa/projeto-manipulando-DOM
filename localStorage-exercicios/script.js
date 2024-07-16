const btnAddTarefas = document.querySelector('.btn-add-task')
const textarea = document.querySelector('.textarea-tasks')
const formAdd = document.querySelector('.form-add-task')
const tarefas = []

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

  localStorage.setItem('tarefas', JSON.stringify(tarefas))
})
