


let paginaAtual = 1;

const animesList = document.querySelector(".anime-list");
const inputBusca = document.querySelector(".search-box input");
const btnBusca = document.querySelector(".search-box button");

const filtroGenero = document.querySelector("#filtro-genero");
const filtroStatus = document.querySelector("#filtro-status");
const filtroTipo = document.querySelector("#filtro-tipo");
const filtroOrdem = document.querySelector("#filtro-ordem");
const filtroNota = document.querySelector("#filtro-avaliacao");

const btnAnterior = document.querySelector("#btn-anterior");
const btnProximo = document.querySelector("#btn-proximo");
const txtPagina = document.querySelector("#numero-pagina");

async function buscarAnimes(termo = "", pagina = 1) {
    animesList.innerHTML = "<p class='loading'>Carregando...</p>";
    paginaAtual = pagina;

    let url = `https://api.jikan.moe/v4/anime?limit=20&page=${pagina}&sfw`;

    if (termo) {
        url += `&q=${encodeURIComponent(termo)}`;
    }

    
    if (filtroTipo.value !== "todos") url += `&type=${filtroTipo.value}`;
    if (filtroStatus.value !== "todos") url += `&status=${filtroStatus.value}`;
    if (filtroGenero.value !== "todos") url += `&genres=${filtroGenero.value}`;
    if (filtroNota && filtroNota.value !== "todos") url += `&min_score=${filtroNota.value}`;

    
    if (filtroOrdem.value !== "padrao") {
        const [coluna, ordem] = filtroOrdem.value.split("-");
        url += `&order_by=${coluna}&sort=${ordem}`;
    }

    try {
        const response = await fetch(url);
        const json = await response.json();

        mostrarAnimes(json.data);
        configurarBotoes(json.pagination.has_next_page, termo);

    } catch (error) {
        console.error("Erro na API:", error);
        animesList.innerHTML = "<p style='color:white; text-align: center;'>Failed to load anime</p>";
    }
}

function mostrarAnimes(lista) {
    animesList.innerHTML = "";
    if (!lista || lista.length === 0) {
        animesList.innerHTML = `<p class="No anime found"</p>`;
        return;
    }

    lista.forEach(anime => {
        animesList.innerHTML += `
        <div class="card-anime" onclick="abrirDetalhes(${anime.mal_id})">
            <img src="${anime.images.jpg.image_url}" class="card-img" alt="${anime.title}">
            <div class="card-info">
              <h3>${anime.title}</h3>
              <div class="card-detalhes">
                <span id="eps"> ${anime.episodes || '?'} Episodes</span>
              </div>
            </div>
        </div>`;
    });
}

function abrirDetalhes(id) {
    window.location.href = `detalhes.html?id=${id}`;
}

function configurarBotoes(temProximaPagina, termo) {
    txtPagina.value = paginaAtual;

    btnAnterior.style.visibility = paginaAtual > 1 ? "visible" : "hidden";
    btnAnterior.onclick = () => buscarAnimes(termo, paginaAtual - 1);

    btnProximo.style.visibility = temProximaPagina ? "visible" : "hidden";
    btnProximo.onclick = () => buscarAnimes(termo, paginaAtual + 1);

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

txtPagina.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        let novaPagina = parseInt(txtPagina.value);

        if (novaPagina > 0) {
            buscarAnimes(inputBusca.value, novaPagina);
        } else {
            alert("Digite um número de página válido.");
            txtPagina.value = paginaAtual;
        }
    }
})

btnBusca.addEventListener("click", () => {
    buscarAnimes(inputBusca.value, 1);
});

inputBusca.addEventListener("keypress", (e) => {
    if (e.key === "Enter") buscarAnimes(inputBusca.value, 1);
});


const filtros = [filtroGenero, filtroStatus, filtroTipo, filtroOrdem, filtroNota];
filtros.forEach(el => {
    if (el) { 
        el.addEventListener("change", () => buscarAnimes(inputBusca.value, 1));
    }
});

const params = new URLSearchParams(window.location.search);
const pesquisaUrl = params.get("search");

if (pesquisaUrl) {
    inputBusca.value = pesquisaUrl;
    buscarAnimes(pesquisaUrl, 1);
} else {
    buscarAnimes();
}

