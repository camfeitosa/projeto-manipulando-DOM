const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarImg = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

let intervaloId = 1
let tempoDecorridoEmSegundos = 1500

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
  if (musica.paused) {
    musica.play()
  } else {
    musica.pause()
  }
})

function clica(botao, foco, minutos) {
  botao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = minutos 
    alterarContexto(foco)
    botao.classList.add('active')
  })
}

clica(focoBt, 'foco', 1500)
clica(curtoBt, 'descanso-curto', 300)
clica(longoBt, 'descanso-longo', 900)

function alterarContexto(contexto) {
  mostrarTempo()
  botoes.forEach(function (contexto) {
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
const contagemRegressiva = () => {
  if(tempoDecorridoEmSegundos <= 0){
      audioTempoFinalizado.play()
      alert('Tempo finalizado!')
      zerar()
      return
  }
  tempoDecorridoEmSegundos -= 1
  mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
  if(intervaloId){
      audioPausa.play()
      zerar()
      return
  }
  audioPlay.play()
  intervaloId = setInterval(contagemRegressiva, 1000)
  iniciarOuPausarBt.textContent = "Pausar"
  iniciarOuPausarImg.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
  clearInterval(intervaloId) 
  iniciarOuPausarBt.textContent = "Começar"
  iniciarOuPausarImg.setAttribute('src', `/imagens/play_arrow.png`)
  intervaloId = null
}

function mostrarTempo(){
  const tempo = new Date(tempoDecorridoEmSegundos * 1000)
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
  tempoNaTela.innerHTML = `${tempoFormatado}`
}


mostrarTempo()