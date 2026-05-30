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
                episodios: anime.episodes || "N/A",
                avaliacao: anime.score ? `${anime.score}/10` : "N/A",
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

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

function irParaCatalogo() {
    const pesquisa = searchInput.value.trim();

    if (pesquisa === "") return;

    window.location.href = `catalogo.html?search=${encodeURIComponent(pesquisa)}`;
}

searchButton.addEventListener("click", irParaCatalogo);

searchInput.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        irParaCatalogo()
    }
});

async function carregarCategoria(url, lista, classeCard) {

    lista.innerHTML = `
    <p class="mensagem-api"> Loading animes...</p>
    `;
    
    try {
        const resposta = await fetch(url);

        if (resposta.status === 429) {
            lista.innerHTML = `
            <p class=mensagem-api>
                Too many requests. Please try again in a few seconds.
            </p>
            `;
            return
        }

        const dados = await resposta.json();

        lista.innerHTML = "";

        const listaAnimes = lista === parecidosList
            ? dados.data.slice(0,4)
            : dados.data;

            if (listaAnimes.length === 0) {
                lista.innerHTML = `
                <p class="mensagem-api">
                No one recommendation founded
                </p>
                `;
                return
            }

        listaAnimes.forEach((anime) => {

            const item = anime.entry ? anime.entry[0] : anime;

            lista.innerHTML += `
            <div class="${classeCard}" onclick="abrirDetalhes(${item.mal_id})">
                <img src="${item.images.jpg.large_image_url}">
                
                <div class="card-info">
                    <h3>${item.title}</h3>
                    <p>${item.score || "N/A"}</p>
                </div>

            </div>
        `;
        });
    
    } catch(erro) {

        lista.innerHTML = `
        <p class="mensagem-api>
        Failed to load animes
        </p>`
        console.log(erro)
    }
}

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}

    async function carregarTudo() {
    // Trending

     await carregarCategoria(
        "https://api.jikan.moe/v4/top/anime?limit=5", trendingList, "anime-card-trending"
    );

    await esperar(500);

    // Releases

    await carregarCategoria(
        "https://api.jikan.moe/v4/seasons/now?limit=5", launchList, "anime-card-launch"
    );

    await esperar(500);

    // Highest Rated Movie

    await carregarCategoria(
        "https://api.jikan.moe/v4/top/anime?type=movie&limit=4", ratedList, "anime-card-rated"
    );

    await esperar(500);

    // Similar

    await carregarCategoria(
        "https://api.jikan.moe/v4/recommendations/anime?limit=4", parecidosList, "anime-card-simi"
    );
}

carregarTudo();
