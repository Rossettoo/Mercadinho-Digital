const catalogo = document.getElementById("catalogo");
const carrinhoDiv = document.getElementById("carrinho");
const totalSpan = document.getElementById("total");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function atualizarCarrinho() {
  carrinhoDiv.innerHTML = "";
  let total = 0;

  carrinho.forEach((produto, index) => {
    carrinhoDiv.innerHTML += `
      <div>
        ${produto.title} - R$ ${produto.price.toFixed(2)}
        <button onclick="removerDoCarrinho(${index})">Remover</button>
      </div>
    `;
    total += produto.price;
  });

  totalSpan.textContent = total.toFixed(2);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  atualizarCarrinho();
}

async function carregarProdutos() {
  const res = await fetch("https://fakestoreapi.com/products");
  const produtos = await res.json();

  produtos.forEach(produto => {
    const div = document.createElement("div");
    div.className = "produto";
    div.innerHTML = `
      <img src="${produto.image}" alt="${produto.title}" />
      <h3>${produto.title}</h3>
      <p>${produto.description.substring(0, 100)}...</p>
      <p><strong>R$ ${produto.price}</strong></p>
      <button class="btn-comprar" data-id="${produto.id}">Comprar</button>
    `;
    catalogo.appendChild(div);
  });

  document.querySelectorAll(".btn-comprar").forEach(button => {
    button.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const produto = await res.json();
      adicionarAoCarrinho(produto);
    });
  });
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }
  alert("Compra finalizada com sucesso!");
  localStorage.removeItem("carrinho");
  carrinho = [];
  atualizarCarrinho();
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

carregarProdutos();
atualizarCarrinho();
