/* CARROSSEL NO BANNER */

const animesDestaques = [
    {
        titulo: "Solo Leveling",
        ano: "2024",
        idade: "16+",
        episodios: "12eps",
        avaliacao: "9.5/10",
        generos: ["Ação", "Aventura", "Fantasia"],
        descricao: "Um caçador considerado fraco recebe uma chance misteriosa de evoluir sozinho em um mundo cheio de monstros.",
        imagem: "imagens/solo-leveling.jpg"
},

{
        titulo: "Attack on Titan",
        ano: "2013",
        idade: "18+",
        episodios: "87eps",
        avaliacao: "9.8/10",
        generos: ["Ação", "Drama"],
        descricao: "A humanidade luta pela sobrevivência atrás de muralhas enquanto enfrenta criaturas gigantes conhecidas como titãs.",
        imagem: "imagens/attack-on-titan.jpg"
    },
    
{
        titulo: "Jujutsu Kaisen",
        ano: "2020",
        idade: "16+",
        episodios: "47eps",
        avaliacao: "9.3/10",
        generos: ["Ação", "Drama", "Sobrenatural"],
        descricao: "Um estudante entra no perigoso mundo das maldições após engolir um objeto amaldiçoado extremamente poderoso.",
        imagem: "imagens/jujutsu-kaisen.jpg" 
    }
];

let animeAtual = 0;

const banner = document.querySelector("#destaques");
const titulo = document.querySelector("#titulo");
const ano = document.querySelector("#ano");
const idade = document.querySelector("#idade");
const episodios = document.querySelector("#episodios");
const avaliacao = document.querySelector("#avaliacao")
const genero = document.querySelector("#anime-generos");
const descricao = document.querySelector("#descricao");

function trocarAnimeDestaques() {
    const anime = animesDestaques[animeAtual];

    banner.style.backgroundImage = `url("${anime.imagem}")`;

    titulo.textContent = anime.titulo;
    ano.textContent = anime.ano;
    idade.textContent = anime.idade;
    episodios.textContent = anime.episodios;
    avaliacao.textContent = anime.avaliacao;
    genero.innerHTML = "";

    anime.generos.forEach(function(generoAtual) {
        genero.innerHTML += `
        <span class="genero-item">${generoAtual}</span>
        `;
    });
    descricao.textContent = anime.descricao;

    animeAtual++;

    if(animeAtual >= animesDestaques.length) {
        animeAtual = 0;
    }
}

trocarAnimeDestaques();

setInterval(trocarAnimeDestaques, 10000);

/* CARDS */

const trendingList = document.querySelector("#trending-list");
const launchList = document.querySelector("#launch-list");
const ratedList = document.querySelector("#rate-list");
const parecidosList = document.querySelector("#parecidos-list");

for (let i = 1; i <= 5; i++) {
    trendingList.innerHTML += `
        <div class="anime-card-trending">
        
        </div>
        
    `;
}

for (let i = 1; i <= 5; i++) {
    launchList.innerHTML += `
        <div class="anime-card-launch"></div>
    `;
}

for (let i = 1; i <= 4; i++) {
    ratedList.innerHTML += `
        <div class="anime-card-rated"></div>
    `;
}

for (let i = 1; i <=4; i++) {
    parecidosList.innerHTML += `
        <div class="anime-card-simi"></div>
    `;
}

/* SETAS PROXIMO E ANTERIOR */

const trendingPrev = document.querySelector("#trending-prev")
const trendingNext = document.querySelector("#trending-next")

const launchPrev = document.querySelector("#launch-prev")
const launchNext = document.querySelector("#launch-next")

function moverCarrossel(lista, direcao) {
    const card = lista.querySelector("div");

    if (!card) return;

    const estiloLista = getComputedStyle(lista)
    const gap = parseInt(estiloLista.gap) || 0;

    const larguraCard = card.offsetWidth;
    const distancia = (larguraCard + gap) * 2;

    const maxScroll = lista.scrollWidth - lista.clintWidth;

    let novoScroll = lista.scrollLeft + direcao * distancia;

    if (novoScroll < 0) {
        novoScroll = 0
    }

    if (novoScroll > maxScroll) {
        novoScroll = maxScroll
    }

    lista.scrollTo({
        left: novoScroll,
        behavior: "smooth"
    });
}

 

if (trendingNext) {
    trendingNext.addEventListener("click", function () {
        moverCarrossel(trendingList, 1)
    });
}

if (trendingPrev) {
    trendingPrev.addEventListener("click", function () {
        moverCarrossel(trendingList, -1)
    });
}

if (launchNext) {
    launchNext.addEventListener("click", function () {
        moverCarrossel(launchList, 1)
    }); 
}

if (launchPrev) {
    launchPrev.addEventListener("click", function () {
        moverCarrossel(launchList, -1)
    }); 
}

