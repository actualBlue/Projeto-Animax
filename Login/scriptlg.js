const botoesOlho = document.querySelectorAll(".toggle-password");
const loginButton = document.querySelector(".loginButtonFetch");

botoesOlho.forEach((olho) => {
  olho.addEventListener("click", () => {
    const input = document.getElementById(olho.dataset.target);

    input.type = input.type === "password" ? "text" : "password";

    olho.classList.toggle("fa-eye");
    olho.classList.toggle("fa-eye-slash");
  });
});

loginButton.onclick = () => {
  console.log("Botão clicado")
  const response = fetch("http://127.0.0.1:4000/login", {
    method: "POST",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({
      ID: 10,
      Username: "ContaTeste",
      Email: "EmailTest@gmail.com",
      Password: "senhalegal1234",
    }),
  }).then(async (data) => {
    const dataJSON = await data.json();
  });
};
