const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

async function carregarDetalhes() {
    try {
        const resposta = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
        const dados = await resposta.json();
        const anime = dados.data;

        carregarParecidos(anime);

        document.querySelector("#titulo").textContent = anime.title;
        document.querySelector("#ano").textContent = anime.year ?? "---";
        document.querySelector("#idade").textContent = anime.rating ?? "Sem classificação";
        document.querySelector("#episodios").textContent = `${anime.episodes ?? "?"} eps`;

        ajustarTituloGrande();

        function ajustarTituloGrande() {
            const titulo = document.querySelector("#titulo");
            const destaque = document.querySelector(".destaques");

            const alturaLinha = parseFloat(getComputedStyle(titulo).lineHeight);
            const alturaTitulo = titulo.scrollHeight;

            if (alturaTitulo > alturaLinha * 1.5) {
                destaque.classList.add("titulo-grande");
            } else {
                destaque.classList.remove("titulo-grande");
            }
        }

        document.querySelector("#descricao").textContent = removerWritten(anime.synopsis);
        document.querySelector("#nota").textContent = "0,0";
        document.querySelector("#avaliacao").textContent = "0 / 10";
        document.querySelector("#ppl-nota").textContent = "Based on 0 ratings";

        document.querySelector(".destaques").style.backgroundImage = `
            linear-gradient(
                to right,
                rgba(0, 0, 0, 0.90),
                rgba(0, 0, 0, 0.60),
                rgba(0, 0, 0, 0.20)
            ),
            url("${anime.images.jpg.large_image_url}")
        `;

        document.querySelector(".anime-img").innerHTML = `
            <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
        `;

        const generosArea = document.querySelector("#anime-generos");
        generosArea.innerHTML = "";

        anime.genres.forEach((genero) => {
            generosArea.innerHTML += `
                <span class="genero-item">${genero.name}</span>
            `;
        });

       
        document.querySelector("#status").textContent = anime.status ?? "Unknow";
        document.querySelector("#tipo").textContent = anime.type ?? "Unknow";
        document.querySelector("#total-episodios").textContent = anime.episodes ?? "?";
        document.querySelector("#duracao").textContent = anime.duration ?? "Unknow";

        document.querySelector("#estudio").textContent =
            anime.studios?.map(studio => studio.name).join(", ") || "Unknow";

        document.querySelector("#origem").textContent = anime.source ?? "Unknow";

        document.querySelector("#lancamento").textContent = anime.aired?.from
            ? new Date(anime.aired.from).toLocaleDateString("pt-BR")
            : "Unknow";

        document.querySelector("#termino").textContent = anime.aired?.to
            ? new Date(anime.aired.to).toLocaleDateString("pt-BR")
            : "Airing";

        document.querySelector("#temporada").textContent = anime.season && anime.year
            ? `${anime.season} ${anime.year}`
            : "Unknow";

        document.querySelector("#produtores").textContent =
            anime.producers?.map(producer => producer.name).join(", ") || "Unknow";

        document.querySelector("#licenciadores").textContent =
            anime.licensors?.map(licensor => licensor.name).join(", ") || "Unknow";

        document.querySelector("#transmitido").textContent =
            anime.broadcast?.string ?? "Unknow";
       

    } catch (erro) {
        console.error(erro);

        document.querySelector("#titulo").textContent = "Anime not found";
        document.querySelector("#descricao").textContent = "The details for this anime could not be loaded";
    }
}

function removerWritten(texto) {
    if (!texto) return "Description unavailable";

    return texto.replace("[Written by MAL Rewrite]", "").trim();
}

carregarDetalhes();

const listaEps = document.querySelector("#lista-eps");
const ordem = document.querySelector("#ordem");

const btnAnterior = document.querySelector("#btn-anterior");
const btnProximo = document.querySelector("#btn-proxima");
const inputPagina =  document.querySelector("#pagina-atual");

let todosEpisodios = [];
let paginaAtual = 1;

const episodiosPorPagina = 10;
const paginasJikanCache = {};

async function buscarEpisodiosJikan(paginaJikan) {
    const resposta = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes?page=${paginaJikan}`);
        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(`Jikan error: ${resposta.status}`)
        }

        if (!dados.data) {
            throw new Error("Jikan don´t retorned episodes");
        }

        return dados;
}

async function carregarEpisodios() {
    try {
        const dados = await buscarEpisodiosJikan(1);

        todosEpisodios = dados.data.map((episodio) => {
            return {
                numero: episodio.mal_id,
                titulo: episodio.title || "No title",
                media: 0,
                avaliacoes: 0
            };
        });

        mostrarEpisodios();

    } catch (erro) {
        console.error("Failed to load episodes", erro);

        listaEps.innerHTML = `
            <p style="color: white;">Await some seconds and try again</p>
        `;
    }
}

async function carregarPaginaAtual() {
    try {
        const paginaJikan = Math.ceil(paginaAtual / 10);
        const dados = await buscarEpisodiosJikan(paginaJikan);

        todosEpisodios = dados.data.map((episodio) => {
            return {
                numero: episodio.mal_id,
                titulo: episodio.title || "No title",
                media: 0,
                avaliacoes: 0
            };
        });

        mostrarEpisodios();

    } catch (erro) {
        console.error("Failed to change page", erro);
    }
}

function mostrarEpisodios() {
    listaEps.innerHTML = "";

    const paginaDentroDaJikan = (paginaAtual - 1) % 10;

    const inicio = paginaDentroDaJikan * episodiosPorPagina;
    const fim = inicio + episodiosPorPagina;

    const episodiosDaPagina = todosEpisodios.slice(inicio, fim);

    episodiosDaPagina.forEach((episodio) => {
        listaEps.innerHTML += `
            <div class="eps-row">
                <span class="ep-num">${episodio.numero}</span>
                <span class="ep-title">${episodio.titulo}</span>
                <span class="ep-media">-</span>
                <span class="ep-ratings">0</span>
                <button data-episode="${episodio.numero}" class="botao-rate">Rate</button>
            </div>
        `;
    });
    
        inputPagina.value = paginaAtual;

        btnAnterior.disabled = paginaAtual === 1;

        btnProximo.disabled = episodiosDaPagina.length < episodiosPorPagina;
}

btnAnterior.addEventListener("click", async () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        await carregarPaginaAtual();
    }
});

btnProximo.addEventListener("click", async () => {
        paginaAtual++;
        await carregarPaginaAtual();
});

inputPagina.addEventListener("change", async () => {
    let paginaDigitada = Number(inputPagina.value);

    if (paginaDigitada < 1) {
        paginaDigitada = 1;
    }

    paginaAtual = paginaDigitada;

    await carregarPaginaAtual();
})

carregarEpisodios();

async function carregarParecidos(animeAtual) {
   try {
    const generosIds = animeAtual.genres
        .slice(0, 2)
        .map(genero => genero.mal_id)
        .join(",");

    const resposta = await fetch(`https://api.jikan.moe/v4/anime?genres=${generosIds}&order_by=score&sort=desc&limit=6`);
    const dados = await resposta.json();

     if (!dados.data) {
            throw new Error("Jikan não retornou animes parecidos");
        }

    const parecidos = dados.data.filter(anime => anime.mal_id !== animeAtual.mal_id);

    mostrarParecidos(parecidos);

    } catch (erro) {
        console.error("Erro ao carregar animes parecidos:", erro)
        }
    }

function mostrarParecidos(animes) {
    const lista = document.querySelector(".recommended-list");

    lista.innerHTML = "";

    animes.forEach(anime => {
        lista.innerHTML += `
            <div class="recommended-card" onclick="window.location.href='detalhes.html?id=${anime.mal_id}'">
                <img id="card-anime" src="${anime.images.jpg.image_url}" alt="${anime.title}">

                <div class="recommended-info">
                    <h3>${anime.title}</h3>
                    <p>${anime.year ?? "---"} ${anime.episodes ?? "?"} eps</p>
                </div>
           </div>
        `;
        });
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

