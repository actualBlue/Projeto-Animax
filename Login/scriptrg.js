const botoesOlho = document.querySelectorAll(".toggle-password");
const registerButton = document.querySelector(".registerButton");
const passwordInput = document.querySelector("#iconfsenha");
const passwordConfirmInput = document.querySelector("#isenha");
const emailInput = document.querySelector("#iemail");
const usernameInput = document.querySelector("#iusuario");

botoesOlho.forEach((olho) => {
  olho.addEventListener("click", () => {
    const input = document.getElementById(olho.dataset.target);

    input.type = input.type === "password" ? "text" : "password";

    olho.classList.toggle("fa-eye");
    olho.classList.toggle("fa-eye-slash");
  });
});

registerButton.onclick = async function (e) {
  // check
  if (passwordInput.value !== passwordConfirmInput.value) {
    alert("Passwords must match");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Email: emailInput.value,
        Username: usernameInput.value,
        Password: passwordInput.value,
      }),
    });
    const data = await response.json();
  } catch (error) {
    console.log(error);
    alert("we fucked up! check the console for the error message");
  }
};

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});
