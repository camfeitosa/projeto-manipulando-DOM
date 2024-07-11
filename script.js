const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')

let intervaloId = 1
let tempoDecorridoEmSegundos = 5

musica.loop = true

musicaFocoInput.addEventListener('change', () =>{
  if(musica.paused){
    musica.play()
  }else {
    musica.pause()
  }
})

function clica(botao, foco) {
  botao.addEventListener('click', () => {
    alterarContexto(foco)
    botao.classList.add('active')
  })
}

clica(focoBt, 'foco')
clica(curtoBt, 'descanso-curto')
clica(longoBt, 'descanso-longo')

function alterarContexto(contexto) {
  botoes.forEach(function (contexto){
    contexto.classList.remove('active')
  })

  html.setAttribute('data-contexto', contexto)
  banner.setAttribute('src', `/imagens/${contexto}.png`)

  // altera titulo
  switch (contexto) {
    case 'foco':
      titulo.innerHTML = `
       Otimize sua produtividade,<br>
       <strong class="app__title-strong">mergulhe no que importa.</strong>
      `
      break;
    case "descanso-curto":
      titulo.innerHTML = `
        Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `
      break;
    case "descanso-longo":
      titulo.innerHTML = `
          Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
          `
    default:
      break;
  }
}

// temporizador

const contagemRegressiva = () =>{
  if(tempoDecorridoEmSegundos <= 0){
    zerar()
    alert('cabou irmão')
    return
  }

  tempoDecorridoEmSegundos -= 1
  console.log(tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
  if (intervaloId){
    zerar()
    return
  }
  intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar(){
  clearInterval(intervaloId)
  intervaloId = null
}

