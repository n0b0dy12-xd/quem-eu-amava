// ============================================
// LETRA COM OS TIMESTAMPS EXATOS (segundos)
// ============================================
const lyrics = [
    { time: 4.2, text: "Entro e fecho a porta do meu carro" },
    { time: 6.3, text: "Debocha se eu tô puto e quero espaço" },
    { time: 8.8, text: "Grita na janela, seu otário" },
    { time: 10.9, text: "E todas as coisas que eu não faço" },
    { time: 13.0, text: "Joga na minha cara os meus erros" },
    { time: 15.2, text: "Pergunta se eu sou doente mental" },
    { time: 17.8, text: "Sei que na real eu tô cansado" },
    { time: 20.0, text: "E preciso cimentar a casa" },
    { time: 22.8, text: "Abro a porta tipo um filme de horror" },
    { time: 25.0, text: "Eu te vejo morta, você diz: Por favor" },
    { time: 27.2, text: "E me joga coisas, pra ver se escapa" },
    { time: 30.0, text: "Mas debaixo do banco eu escondo uma arma" },
    { time: 32.2, text: "Descarrego bem na sua cara" },
    { time: 34.2, text: "Já não é mais tão linda como as rosas" },
    { time: 36.8, text: "Faço um buraco na garagem" },
    { time: 39.0, text: "Essa vai ser sua cama agora" },
    { time: 41.8, text: "Vamos se encontrar daqui a pouco" },
    { time: 44.5, text: "Juntos no inferno tipo Adão e Eva" },
    { time: 46.8, text: "Fugindo desse paraíso falso" },
    { time: 49.0, text: "Inventado por esse Deus falho" },
    { time: 51.2, text: "E desisto no meio do caminho" },
    { time: 53.8, text: "Quando a raiva passa e vem a real" },
    { time: 55.8, text: "Olho os restos do seu rosto" },
    { time: 58.0, text: "Mas eu ainda não consigo chorar" },
    { time: 60.2, text: "Você tava certa de verdade" },
    { time: 62.8, text: "Entro dentro do carro, pego Dreher" },
    { time: 65.0, text: "Misturo com alvejante e Venvanse" },
    { time: 67.8, text: "Uma dose alta e outra dose fatal" },
    { time: 70.0, text: "Mas não vou sozinho na real" },
    { time: 72.0, text: "Em alta velocidade e a visão torta" },
    { time: 74.2, text: "Se o carro bater vai ser uma obra" },
    { time: 77.0, text: "Mas eu já vou morrer de qualquer forma" },

    // pausa dramática
    { time: 81.5, text: "Sentindo meus batimentos cardíacos acabarem" },
    { time: 87.0, text: "Pessoas chorando ao redor" },
    { time: 92.0, text: "Mas não tem ninguém pra chorar por mim" },
    { time: 97.0, text: "Porque eu matei quem me amava" },
    { time: 102.0, text: "Matei quem me amava" },
    { time: 107.0, text: "Matei quem me amava" },
    { time: 111.5, text: "Eu matei quem me amava" },

    // assinatura final
    { time: 129.0, text: "eu matei quem me amava - yung exu" }
];
   

const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const lyricDiv = document.getElementById('lyric');

let currentIndex = -1;

// Atualiza a letra com base no tempo atual
function updateLyric(currentTime) {
    let activeLine = null;
    for (let i = 0; i < lyrics.length; i++) {
        if (currentTime >= lyrics[i].time) {
            activeLine = lyrics[i];
            currentIndex = i;
        } else {
            break;
        }
    }
    if (activeLine && lyricDiv.innerText !== activeLine.text) {
        lyricDiv.innerText = activeLine.text;
    }
    if (currentTime < lyrics[0].time && lyricDiv.innerText !== "") {
        lyricDiv.innerText = "";
    }
}

function onTimeUpdate() {
    if (!audio.paused && audio.currentTime) {
        updateLyric(audio.currentTime);
    }
}

function startPlayback() {
    playBtn.style.display = 'none';
    lyricDiv.style.display = 'block';

    // Tenta tocar
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(err => {
            console.warn("Erro ao tocar:", err);
            lyricDiv.innerText = "❌ Clique novamente para tocar (navegador bloqueou)";
            lyricDiv.style.display = 'block';
            playBtn.style.display = 'flex';
        });
    }

    if (audio.currentTime === 0) {
        lyricDiv.innerText = "";
    } else {
        updateLyric(audio.currentTime);
    }
}

playBtn.addEventListener('click', startPlayback);

audio.addEventListener('timeupdate', onTimeUpdate);
audio.addEventListener('ended', () => {});

// ========== DETECÇÃO DE ERRO DE CARREGAMENTO DO MP3 ==========
audio.addEventListener('error', (e) => {
    console.error("Erro ao carregar áudio:", e);
    let errorMsg = "⚠️ Arquivo não encontrado!\n\n";
    errorMsg += "Caminho esperado: sound/YUNG-EXU.mp3\n";
    errorMsg += "Verifique se o arquivo está na pasta 'sound' com o nome exato 'YUNG-EXU.mp3'.";
    lyricDiv.innerText = errorMsg;
    lyricDiv.style.display = 'block';
    playBtn.style.display = 'none';
    lyricDiv.style.color = '#ff8888';
    lyricDiv.style.fontSize = '1.2rem';
    lyricDiv.style.whiteSpace = 'pre-line';
});

// Carrega metadados
audio.load();

// Mensagem inicial de ajuda
console.log("Aguardando clique no botão. Se o MP3 não carregar, uma mensagem aparecerá.");
