const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

async function carregarDetalhes() {
    
    try {
        const resposta = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
        const dados = await resposta.json();

        const anime = dados.data;

    document.querySelector("#titulo").textContent = anime.title;
    document.querySelector("#ano").textContent = anime.year ??"---";
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

    preeencherSobre(anime);

} catch (erro) {
    console.erro(erro)
    
    document.querySelector(".destaques").innerHTML = `
        <p style="color: white;">Anime not found</p>
    `;
    }

    function removerWritten(texto) {
    if (!texto) return "Description unavaliable";

    return texto.replace("[Written by MAL Rewrite]", "").trim();
}

    
}

carregarDetalhes();

const res = document.querySelector("#res");
const tiponav = document.querySelector("#tipo-nav");
const tipo = document.querySelector("#tipo");
const estudio = document.querySelector("#estudio");
const classificacao = document.querySelector("#classificacao");
const exibicao = document.querySelector("#exibicao");
const status = document.querySelector("#status");

window.sobre = function () {
    
    tiponav.innerHTML = "Sinopse"
    res.innerHTML = `${anime.descricao}`;
    tipo.innerHTML = `
    <span class="info-label">Tipo</span>
    <span class="info-valor">${anime.tipo}</span>
    `
    estudio.innerHTML = `
    <span class="info-label">Estúdio</span>
    <span class="info-valor">${anime.estudio}</span>
    `
    classificacao.innerHTML = `
    <span class="info-label">Classificação</span>
    <span class="info-valor">${anime.idade}</span>
    `
    exibicao.innerHTML = `
    <span class="info-label">Exibição</span>
    <span class="info-valor">2013-2022</span>
    `

    status.innerHTML = `
    <span class="info-label">Status</span>
    <span class="info-valor">${anime.status}</span>
    `
};

function review() {
    tiponav.innerHTML = ""
    res.innerHTML = "Reviews here";
    tipo.innerHTML = "";
    estudio.innerHTML = "";
    classificacao.innerHTML = "";
    status.innerHTML = "";
    exibicao.innerHTML = "";
};

const ep = document.querySelector("#eps");
const tituloep = document.querySelector("#titulos");
const media = document.querySelector("#media");
const rating = document.querySelector("#ratings");
const avaliar = document.querySelector("#acao");

ep.innerHTML = `${anime.epsmini}`
tituloep.innerHTML = `${anime.episodios[0]}`
media.innerHTML = `${anime.mediaep}`
rating.innerHTML = `${anime.rateseps}`
    