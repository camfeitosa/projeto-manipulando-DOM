
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



function clica(botao, foco){
  botao.addEventListener('click', () => {
    html.setAttribute('data-contexto', foco)
    banner.setAttribute('src', '/imagens/foco.png')
  })
}

clica(focoBt, 'foco')
clica(curtoBt, 'descanso-curto')
clica(longoBt, 'descanso-longo')

