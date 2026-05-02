const inputs = document.querySelectorAll(".code-box input");
const hidden = document.getElementById("codigo");

function atualizarCodigo() {
    let codigo = "";
    inputs.forEach(i => codigo += i.value);
    hidden.value = codigo;
}

inputs.forEach(input => {
    input.addEventListener("input", atualizarCodigo);
});