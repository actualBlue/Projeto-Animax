const botoesOlho = document.querySelectorAll(".toggle-password");
const loginButton = document.querySelector(".loginButtonFetch");
const Email = document.querySelector("#InputEmail")
const Password = document.querySelector("#InputSenha")

botoesOlho.forEach((olho) => {
  olho.addEventListener("click", () => {
    const input = document.getElementById(olho.dataset.target);

    input.type = input.type === "password" ? "text" : "password";

    olho.classList.toggle("fa-eye");
    olho.classList.toggle("fa-eye-slash");
  });
});

loginButton.onclick = () => {
  try {
    const response = fetch("http://127.0.0.1:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Username: "Unknown?",
        Email: Email.value,
        Password: Password.value
      }),
    }).then(async (data) => {
      const dataJSON = await data.json()
      if (dataJSON.id) {
        alert("Parabens você logou!")
      } else {
        alert("Credenciais erradas!")
      }
    });

  } catch (error) {
    alert(error)
  }
};
