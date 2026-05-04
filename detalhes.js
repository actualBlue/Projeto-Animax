const animes = [
    {
        id: 1,
        titulo: "Attack on Titan",
        generos: ["Ação", "Drama"],
        ano: 2013,
        idade: "18+",
        status: "Finalizado",
        tipo: "TV",
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


anime.generos.forEach(function(generoAtual) {
        genero.innerHTML += `
        <span class="genero-item">${generoAtual}</span>
        `;
    });

    