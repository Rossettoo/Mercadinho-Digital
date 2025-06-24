// login.js
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user && pass) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "loja.html";
  } else {
    alert("Preencha todos os campos!");
  }
}


if (localStorage.getItem("loggedIn") === "true") {
  window.location.href = "loja.html";
}
