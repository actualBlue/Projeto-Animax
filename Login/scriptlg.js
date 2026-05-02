const botoesOlho = document.querySelectorAll(".toggle-password");

botoesOlho.forEach((olho) => {
    olho.addEventListener("click", () => {
        const input = document.getElementById(olho.dataset.target);

        input.type = input.type === "password" ? "text" : "password";

        olho.classList.toggle("fa-eye");
        olho.classList.toggle("fa-eye-slash");
    });
});