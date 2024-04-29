function alterarContexto(botao, contexto, tempo) {
    botao.addEventListener('click', () => {

        tempoDecorrido = tempo;
        mostrarTempo();
        
        buttons.forEach((botao) => {
            botao.classList.remove('active');
        })
        
        botao.classList.add('active');
        
        html.setAttribute('data-contexto', contexto);
        image.setAttribute('src', `./imagens/${contexto}.png`);

        switch (contexto) {
            case 'foco':
                title.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`;
                break;
            
            case 'descanso-curto':
                title.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`;
                break;

            case 'descanso-longo':
                title.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`;
                break;

            default:
                break;
        }

    })
}

function iniciarPausar() {
    if (intervaloId) {
        pauseAudio.play();
        zerar();
        return;
    }
    playAudio.play();
    startPauseImg.setAttribute('src', './imagens/pause.png');
    intervaloId = setInterval(contagemRegressiva, 1000);
    startPauseText.textContent = 'Pausar';
}

function zerar() {
    clearInterval(intervaloId);
    startPauseImg.setAttribute('src', './imagens/play_arrow.png');
    startPauseText.textContent = 'Começar';
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    timer.innerHTML = `${tempoFormatado}`;
}

const contagemRegressiva = () => {
    if (tempoDecorrido <= 0) {
        endAudio.play();
        alert('Tempo finalizado!');

        const focoAtivo = html.getAttribute('data-contexto') == 'foco';

        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }

        zerar();
        return;
    }
    tempoDecorrido -= 1;
    mostrarTempo();
}


const html = document.querySelector('html');

const title = document.querySelector('.app__title');
const image = document.querySelector('.app__image');

const focoButton = document.querySelector('.app__card-button--foco');
const curtoButton = document.querySelector('.app__card-button--curto');
const longoButton = document.querySelector('.app__card-button--longo');
const buttons = document.querySelectorAll('.app__card-button');

const timer = document.querySelector('#timer');

const musicInput = document.querySelector('#alternar-musica');
const musicAudio = new Audio('./sons/luna-rise-part-one.mp3');
const playAudio = new Audio('./sons/play.wav');
const pauseAudio = new Audio('./sons/pause.mp3');
const endAudio = new Audio('./sons/beep.mp3');

const startPauseButton = document.querySelector('#start-pause');
const startPauseImg = document.querySelector('#start-pause img')
const startPauseText = document.querySelector('#start-pause span');

let tempoDecorrido = 1500;
let intervaloId = null;

startPauseButton.addEventListener('click', iniciarPausar);

mostrarTempo();

alterarContexto(focoButton, 'foco', 1500);
alterarContexto(curtoButton, 'descanso-curto', 300);
alterarContexto(longoButton, 'descanso-longo', 900);

musicAudio.loop = true;

musicInput.addEventListener('change', () => {
    if (musicAudio.paused) {
        musicAudio.play();
    } else {
        musicAudio.pause();
    }
})