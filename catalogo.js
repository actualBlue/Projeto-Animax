const animes = [
    {
        id: 1,
        titulo: "Attack on Titan",
        genero: "Ação",
        ano: 2013,
        status: "Finalizado",
        tipo: "TV",
        eps: 87,
        nota: 9.1,
        imagem: "imagens/attack-on-titan-poster.jpg"
    },
    {
        id: 2,
        titulo: "Re:Zero",
        genero: "Fantasia",
        ano: 2016,
        status: "Em lançamento",
        tipo: "TV",
        eps: 70,
        nota: 8.7,
        imagem: "imagens/re-zero-poster.jpg"
    },
    {
        id: 3,
        titulo: "Solo Leveling",
        genero: "Ação",
        ano: 2024,
        status: "Em lançamento",
        tipo: "TV",
        eps: 25,
        nota: 8.5,
        imagem: "imagens/solo-leveling-poster.jpg"
    },
    {
        id: 4,
        titulo: "Jujutsu Kaisen",
        genero: "Ação",
        ano: 2020,
        status: "Em lançamento",
        tipo: "TV",
        eps: 59,
        nota: 8.8,
        imagem: "imagens/jujutsu-kaisen-poster.jpg"
    },
    {
        id: 5,
        titulo: "Frieren",
        genero: "Aventura",
        ano: 2023,
        status: "Em lançamento",
        tipo: "TV",
        eps: 38,
        nota: 9.0,
        imagem: "imagens/frieren-poster.jpg"
    }
];


const animesList = document.querySelector(".anime-list");

const filtroGenero = document.querySelector("#filtro-genero");
const filtroAvaliacao = document.querySelector("#filtro-avaliacao");
const filtroAno = document.querySelector("#filtro-ano");
const filtroStatus = document.querySelector("#filtro-status");
const filtroTipo = document.querySelector("#filtro-tipo");
const filtroOrdem = document.querySelector("#filtro-ordem");

function mostrarAnimes(lista) {
    animesList.innerHTML = "";

    if (lista.length === 0) {
        animesList.innerHTML = `
            <p class="nenhum-anime">Nenhum anime enconstrado.</p>
        `;
        return;
    }

    for (let i = 0; i < lista.length; i++) {
    animesList.innerHTML += `
        <div class="card-anime" onclick="abrirDetalhes(${lista[i].id})">
            <img src="${lista[i].imagem}" class="card-img">

            
                <div class="card-info">
                    <h3>${lista[i].titulo}</h3>

                    <div class="card-detalhes">
                        <span id="eps">${lista[i].eps} Episódios</span>
                        <span id="nota">⭐ ${lista[i].nota}</span>
                    </div>
            </div>
        </div>
    `;
  }

}

function abrirDetalhes(id) {
    window.location.href = `detalhes.html?id=${id}`;
}

function filtraAnimes() {
    const generoSelecionado = filtroGenero.value;
    const avaliacaoSelecionada = filtroAvaliacao.value;
    const anoSelecionado = filtroAno.value;
    const statusSelecionado = filtroStatus.value;
    const tipoSelecionado = filtroTipo.value;
    const ordemSelecionada = filtroOrdem.value;

    let resultado = animes.filter((anime) => {
        const passouGenero = generoSelecionado === "todos" || anime.genero === generoSelecionado;
        const passouAvaliacao = avaliacaoSelecionada === "todos" || anime.nota >= Number(avaliacaoSelecionada);
        const passouAno = anoSelecionado === "todos" || anime.ano === Number(anoSelecionado);
        const passouStatus = statusSelecionado === "todos" || anime.status === statusSelecionado;
        const passouTipo = tipoSelecionado === "todos" || anime.tipo === tipoSelecionado;

        return passouGenero && passouAvaliacao && passouAno && passouStatus && passouTipo;
    });

    if (ordemSelecionada === "maior-nota") {
        resultado.sort((a, b) => b.nota - a.nota);
    }

    if (ordemSelecionada === "menor-nota") {
        resultado.sort((a, b) => a.nota - b.nota);
    }

    if (ordemSelecionada === "az") {
        resultado.sort((a, b) => b.titulo.localeCompare(a.titulo));
    }

    if (ordemSelecionada === "za") {
        resultado.sort((a, b) => b.ano - a.ano);
    }

    if (ordemSelecionada === "mais-antigo") {
        resultado.sort((a, b) => a.ano - b.ano);
    }

    mostrarAnimes(resultado);

}

filtroGenero.addEventListener("change", filtraAnimes)
filtroAvaliacao.addEventListener("change", filtraAnimes)
filtroAno.addEventListener("change", filtraAnimes)
filtroStatus.addEventListener("change", filtraAnimes)
filtroTipo.addEventListener("change", filtraAnimes)
filtroOrdem.addEventListener("change", filtraAnimes)

mostrarAnimes(animes);


