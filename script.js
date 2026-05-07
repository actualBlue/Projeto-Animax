/* CARROSSEL NO BANNER */


let animesDestaques = []
let animeAtual = 0;
let animeMostradoAgora = null;

const banner = document.querySelector("#destaques");
const titulo = document.querySelector("#titulo");
const ano = document.querySelector("#ano");
const idade = document.querySelector("#idade");
const episodios = document.querySelector("#episodios");
const avaliacao = document.querySelector("#avaliacao");
const genero = document.querySelector("#anime-generos");
const descricao = document.querySelector("#descricao");
const btnDetalhes = document.querySelector("#btn-detalhes");

async function  carregarAnimesDestaques() {
    try {
        const resposta = await fetch("https://api.jikan.moe/v4/top/anime?limit=5&filter=bypopularity");
        const dados = await resposta.json();

        animesDestaques = dados.data.map(function(anime) {
            return {
                id: anime.mal_id,
                titulo: anime.title,
                ano: anime.year || "N/A",
                idade: anime.rating || "N/A",
                episodios: anime.score ? `${anime.score}/10` : "N/A",
                generos: anime.genres.map(function(genero) {
                    return genero.name;
                }),
                
                imagem: anime.trailer?.images.maximum_image_url || anime.images.jpg.large_image_url
            };
        });
    
        trocarAnimeDestaques();
        setInterval(trocarAnimeDestaques, 10000);

    } catch (erro) {
        console.log("Erro ao carregar animes:", erro);
    }
    
}
function trocarAnimeDestaques() {
    if (animesDestaques.length === 0) return;

    const anime = animesDestaques[animeAtual];

    animeMostradoAgora = anime;

    banner.style.backgroundImage = `url("${anime.imagem}")`;

    titulo.textContent = anime.titulo;
    ano.textContent = anime.ano;
    idade.textContent = anime.idade;
    episodios.textContent = anime.episodios;
    avaliacao.textContent = anime.avaliacao;
    descricao.textContent = anime.descricao;

    genero.innerHTML = "";

    anime.generos.forEach(function(generoAtual) {
        genero.innerHTML += `
            <span class="genero-item">${generoAtual}</span>
        `;
    });

    animeAtual++;

    if (animeAtual >= animesDestaques.length) {
        animeAtual = 0;
    }
}

carregarAnimesDestaques();


btnDetalhes.addEventListener("click", function () {
    window.location.href = `detalhes.html?id=${animeMostradoAgora.id}`;
});

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

function abrirDetalhes(id) {
    window.location.href = `detalhes.html?id=${id}`;
}
