const animes = [
    {
        id: 1,
        titulo: "Attack on Titan",
        generos: ["Ação", "Drama"],
        ano: 2013,
        idade: "18+",
        episodios: ["Para você, em 2.000 anos no futuro", "Aquele Dia – A Queda de Shiganshina, Parte 2", "Uma Luz Tênue em Meio ao Desespero – A Humanidade Revida, Parte 1", "A Noite da Cerimônia de Encerramento – A Humanidade Revida, Parte 2", "Primeira Batalha – A Luta por Trost, Parte 1"],
        epsmini: ["01"],
        mediaep: ["9.0"],
        rateseps:["53"],     
        status: "Finalizado",
        tipo: "TV",
        estudio: "Mappa",
        eps: 87,
        nota: 9.1,
        imagem: "imagens/attack-on-titan-poster.jpg",
        background: "imagens/attack-on-titan.jpg",
        descricao: "A humanidade vive cercada por muralhas gigantes para se proteger dos Titãs, criaturas enormes que ameaçam devorar tudo em seu caminho. Após anos de aparente paz, uma invasão brutal muda para sempre a vida de Eren, Mikasa e Armin. Agora, eles precisam enfrentar a verdade por trás dos Titãs e lutar pela liberdade da humanidade."
    },
    {
        id: 2,
        titulo: "Re:Zero",
        generos: ["Fantasia", "Drama"],
        ano: 2016,
        idade: "16+",
        status: "Em lançamento",
        tipo: "TV",
        eps: 70,
        nota: 8.7,
        imagem: "imagens/re-zero-poster.jpg",
        background: "imagens/re-zero-banner.jpg",
        descricao: "Subaru Natsuki é transportado para um mundo de fantasia sem entender como chegou ali. Após descobrir que pode voltar no tempo sempre que morre, ele passa a enfrentar tragédias cruéis enquanto tenta proteger Emilia e as pessoas ao seu redor."
    },
    {
        id: 3,
        titulo: "Solo Leveling",
        generos: ["Ação", "Aventura", "Fantasia"],
        ano: 2024,
        idade: "16+",
        status: "Em lançamento",
        tipo: "TV",
        eps: 25,
        nota: 8.5,
        imagem: "imagens/solo-leveling-poster.jpg",
        background: "imagens/solo-leveling.jpg",
        descricao: "Sung Jin-Woo é conhecido como o caçador mais fraco de todos, sobrevivendo a missões perigosas em um mundo cheio de portais e monstros. Após quase morrer em uma dungeon misteriosa, ele recebe uma chance única de evoluir sem limites. Agora, Jin-Woo começa sua jornada para se tornar uma força capaz de mudar o destino dos caçadores."
    },
    {
        id: 4,
        titulo: "Jujutsu Kaisen",
        generos: ["Ação", "Sobrenatural"],
        ano: 2020,
        idade: "16+",
        status: "Em lançamento",
        tipo: "TV",
        eps: 59,
        nota: 8.8,
        imagem: "imagens/jujutsu-kaisen-poster.jpg",
        background: "imagens/jujutsu-kaisen-banner.jpeg",
        descricao: "Yuji Itadori era apenas um estudante comum até se envolver com um objeto amaldiçoado extremamente perigoso. Após engolir o dedo de Sukuna, ele passa a dividir o próprio corpo com uma maldição poderosa. Agora, Yuji entra no mundo dos feiticeiros jujutsu e luta contra ameaças sobrenaturais cada vez mais brutais."
    },
    {
        id: 5,
        titulo: "Frieren",
        generos: ["Aventura", "Fantasia"] ,
        ano: 2023,
        idade: "16+",
        status: "Em lançamento",
        tipo: "TV",
        eps: 38,
        nota: 9.0,
        imagem: "imagens/frieren-poster.jpg",
        background: "imagens/frieren-banner.jpg",
        descricao: "Após derrotar o Rei Demônio ao lado de seus companheiros, Frieren continua vivendo enquanto o tempo passa de forma diferente para ela. Ao perceber o peso das memórias e dos laços que deixou para trás, a maga inicia uma nova jornada para entender melhor os humanos, seus sentimentos e o verdadeiro significado das despedidas."
    }
];

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const anime = animes.find((item) => item.id === id);

if (anime) {
    document.querySelector("#titulo").textContent = anime.titulo;
    document.querySelector("#ano").textContent = anime.ano;
    document.querySelector("#idade").textContent = anime.idade;
    document.querySelector("#episodios").textContent = `${anime.eps} eps`;
    document.querySelector("#avaliacao").textContent = `${anime.nota} / 10`;
    document.querySelector("#descricao").textContent = anime.descricao;
    document.querySelector("#nota").textContent = anime.nota.toFixed(1).replace(".", ",");

    document.querySelector(".destaques").style.backgroundImage = `
        linear-gradient(
            to right,
            rgba(0, 0, 0, 0.90),
            rgba(0, 0, 0, 0.60),
            rgba(0, 0, 0, 0.20)
        ),
        url("${anime.background}")
        
    `;

    document.querySelector(".anime-img").innerHTML = `
        <img src="${anime.imagem}" alt="${anime.titulo}">
    `;

    const generosArea = document.querySelector("#anime-generos");
    generosArea.innerHTML = "";

    anime.generos.forEach((generoAtual) => {
        generosArea.innerHTML += `
            <span class="genero-item">${generoAtual}</span>
        `;
    });

} else {
    document.querySelector(".destaques").innerHTML = `
        <p style="color: white;">Anime não encontrado.</p>
    `;
}


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
    res.innerHTML = "Reviews aqui";
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
    