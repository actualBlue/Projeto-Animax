const botoesOlho = document.querySelectorAll(".toggle-password");

botoesOlho.forEach((olho) => {
    olho.addEventListener("click", () => {
        const input = document.getElementById(olho.dataset.target);

        input.type = input.type === "password" ? "text" : "password";

        olho.classList.toggle("fa-eye");
        olho.classList.toggle("fa-eye-slash");
    });
});

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});



function registrar() {
    event.preventDefault();

const senha = document.querySelector("#isenha").value;
const confsenha = document.querySelector("#iconfsenha").value;
const erro = document.querySelector(".erro");

if (senha !== confsenha) {
    erro.innerHTML = 'Senha não coincide';
} else {
    erro.innerHTML = '';
    event.target.submit()
}

}