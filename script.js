const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')

function clica(botao, foco){
  botao.addEventListener('click', () => {
    html.setAttribute('data-contexto', foco)
  })
}

clica(focoBt, 'foco')
clica(curtoBt, 'descanso-curto')
clica(longoBt, 'descanso-longo')


// const html = document.querySelector('html');
// const botoes = [
//   { botao: document.querySelector('.app__card-button--foco'), foco: 'foco' },
//   { botao: document.querySelector('.app__card-button--curto'), foco: 'descanso-curto' },
//   { botao: document.querySelector('.app__card-button--longo'), foco: 'descanso-longo' },
// ];

// botoes.forEach(({ botao, foco }) => {
//   botao.addEventListener('click', () => {
//     html.setAttribute('data-contexto', foco);
//   });
// });
