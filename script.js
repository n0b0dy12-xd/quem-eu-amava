// =================
// #SLAXXERGANG4EVER
// =================
const lyrics = [
    { time: 0.50, text: "Entro e fecho a porta do meu carro" },
    { time: 2.6, text: "Debocha se eu tô puto e quero espaço" },
    { time: 5, text: "Grita na janela, seu otário" },
    { time: 7.3, text: "E todas as coisas que eu não faço" },
    { time: 10, text: "Joga na minha cara os meus erros" },
    { time: 12, text: "Pergunta se eu sou doente mental" },
    { time: 14.4, text: "Sei que na real eu tô cansado" },
    { time: 16.7, text: "E preciso cimentar a casa" },
    { time: 19, text: "Abro a porta tipo um filme de horror" },
    { time: 21 , text: "Eu te vejo morta, você diz: Por favor" },
    { time: 23.5, text: "E me joga coisas, pra ver se escapa" },
    { time: 26, text: "Mas debaixo do banco eu escondo uma arma" },
    { time: 29, text: "Descarrego bem na sua cara" },
    { time: 31, text: "Já não é mais tão linda como as rosas" },
    { time: 33.5, text: "Faço um buraco na garagem" },
    { time: 36, text: "Essa vai ser sua cama agora" },
    { time: 39, text: "Vamos se encontrar daqui a pouco" },
    { time: 41.4, text: "Juntos no inferno tipo Adão e Eva" },
    { time: 43.5, text: "Fugindo desse paraíso falso" },
    { time: 46, text: "Inventado por esse Deus falho" },
    { time: 48, text: "E desisto no meio do caminho" },
    { time: 50, text: "Quando a raiva passa e vem a real" },
    { time: 52, text: "Olho os restos do seu rosto" },
    { time: 54.4, text: "Mas eu ainda não consigo chorar" },
    { time: 57, text: "Você tava certa de verdade" },
    { time: 59, text: "Entro dentro do carro, pego Dreher" },
    { time: 62, text: "Misturo com alvejante e Venvanse" },
    { time: 64, text: "Uma dose alta e outra dose fatal" },
    { time: 67, text: "Mas não vou sozinho na real" },
    { time: 69, text: "Em alta velocidade e a visão torta" },
    { time: 71, text: "Se o carro bater vai ser uma obra" },
    { time: 73.5, text: "Mas eu já vou morrer de qualquer forma" },
    { time: 76, text:" "},
    { time: 77, text: "Sentindo meus batimentos cardíacos acabarem" },
    { time: 84, text: "Pessoas chorando ao redor" },
    { time: 89, text: "Mas não tem ninguém pra chorar por mim" },
    { time: 93.5, text: "Porque eu matei quem me amava" },
    { time: 99, text: "Matei quem me amava" },
    { time: 102, text:" "},
    { time: 103.5, text: "Eu matei quem me amava" },
    { time: 107, text:" "},
    { time: 108, text: "Eu matei quem me amava" },
    { time: 120, text:" "},
    { time: 133, text: "yung exu" }
];

const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const lyricDiv = document.getElementById('lyric');

let currentIndex = -1;
const OFFSET = -0.2;

function updateLyric(currentTime) {
    if (
        currentIndex < lyrics.length - 1 &&
        currentTime >= lyrics[currentIndex + 1].time
    ) {
        currentIndex++;
        lyricDiv.innerText = lyrics[currentIndex].text;
    }

    if (currentTime < lyrics[0].time) {
        currentIndex = -1;
        lyricDiv.innerText = "";
    }
}

function syncLoop() {
    if (!audio.paused) {
        updateLyric(audio.currentTime + OFFSET);
        requestAnimationFrame(syncLoop);
    }
}

audio.addEventListener('play', syncLoop);

function startPlayback() {
    playBtn.style.display = 'none';
    lyricDiv.style.display = 'block';

    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.catch(err => {
            console.warn("Erro ao tocar:", err);
            lyricDiv.innerText = "❌ Clique novamente para tocar";
            playBtn.style.display = 'flex';
        });
    }

    currentIndex = -1;
    updateLyric(audio.currentTime);
}

playBtn.addEventListener('click', startPlayback);

audio.addEventListener('seeked', () => {
    currentIndex = -1;
    updateLyric(audio.currentTime);
});

audio.addEventListener('error', (e) => {
    console.error("Erro ao carregar áudio:", e);
    lyricDiv.innerText = "⚠️ Arquivo não encontrado!";
    lyricDiv.style.display = 'block';
    playBtn.style.display = 'none';
});
