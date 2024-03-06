const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBtn = document.querySelector('#start-pause')
const iniciarPausarBt= document.querySelector('#start-pause span')
const tempoTela = document.querySelector('#time')
const musicaFonteInput = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('./sons/play.wav')
const audioPause = new Audio ('./sons/pause.mp3')
const audioEnd = new Audio ('./sons/beep.mp3')

let tempoEmSegundos = 1500 
let intervaloId= null
musica.loop = true
musicaFonteInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else{
        musica.pause()
    }
})
focoBt.addEventListener('click', () => {
    tempoEmSegundos = 1500
    alterarContexto('foco')
   focoBt.classList.add('active')
})
curtoBt.addEventListener('click', () => {
    tempoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () =>{
    tempoEmSegundos = 900
    alterarContexto('descanso-longo')
   longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo ()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML= `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto" :
            titulo.innerHTML = `Que tal dar uma respirada? <br>
            <strong class="app__title-strong"> Faça uma pausa curta! </strong>`
            break;
        case "descanso-longo" :
            titulo.innerHTML = `Hora de voltar à superfície.<br> 
            <strong class="app__title-strong">  Faça uma pausa longa. `
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoEmSegundos <= 0) {
        zerar()
        return
    }
    tempoEmSegundos -= 1   
    mostrarTempo()
}

startPauseBtn.addEventListener('click', iniciar)

function iniciar() {
    if(intervaloId){
        audioPause.play()
        zerar ()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarPausarBt.textContent = "Pausar"
}   

function zerar () {
    clearInterval(intervaloId)
    iniciarPausarBt.textContent = "Começar"
    intervaloId = null
}
function mostrarTempo () {
    const tempo = new Date(tempoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo ()