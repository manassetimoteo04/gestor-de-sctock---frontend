// Defina a função stockFunction
import { productList } from "./products.js";
const counter = function (content) {
  const number = +content.textContent;
  let starter = 0;

  // Função para incrementar o contador gradualmente
  const numberCounter = function () {
    // Incrementa o contador
    starter += 100;
    // Atualiza o conteúdo do elemento com o novo valor
    content.textContent = starter;
    // Se o contador atingir o número desejado, para o intervalo de tempo
    if (starter >= number) clearInterval(timer);
  };

  // Define um intervalo para chamar a função de incremento
  const timer = setInterval(numberCounter, 0);
};

const numbers = document.querySelectorAll(".counter-num");
numbers.forEach((num) => counter(num));
const stockFunction = function () {
  // Dados para o gráfico de pizza
  const pieData = {
    // labels: ["Entradas Producto", "Saida Produtos ", "Total Productos"],
    // datasets: [
    //   {
    //     data: [300, 200, 400],
    //     backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
    //   },
    // ],

    datasets: [
      {
        type: "bar",
        label: "Saidas de Productos",
        data: [10, 20, 30, 40],
      },
      {
        type: "line",
        label: "Meta",
        data: [50, 50, 50, 50],
      },
    ],
    labels: ["January", "February", "March", "April"],
  };

  // Configuração do gráfico de pizza
  const pieConfig = {
    // type: "pie",
    // data: pieData,
    // options: {
    //   responsive: true,
    //   maintainAspectRatio: false, // Faz o gráfico ser responsivo
    //   elements: {
    //     arc: {
    //       borderWidth: 1, // Remove as bordas
    //     },
    //   },

    type: "scatter",
    data: pieData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        datalabels: {
          color: "inherit", // Usa a cor do elemento pai (herda do CSS)
          font: {
            size: 18, // Define o tamanho da fonte dos rótulos
          },
        },
      },
    },
  };

  // Renderizar o gráfico de pizza quando o DOM estiver completamente carregado
  document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("pieChart");
    if (ctx) new Chart(ctx, pieConfig);
  });
};
const lowStockForm = document.querySelector(".low-stock-edit-container");
const updateStockFunction = function () {
  const lowStockContainer = document.querySelector(".low-stock-list");
  let index;
  lowStockContainer?.addEventListener("click", function (e) {
    const target = e.target.closest(".btn-update-stock");
    if (!target) return;
    const data = target.closest(".product-item");
    const item = productList.find((p) => p.SKUCode === data.dataset.id);
    index = productList.indexOf(item);
    console.log(productList[index]);
    lowStockForm.classList.remove("hidden");
    renderUpdateForm(productList[index]);
  });

  const renderUpdateForm = function (item) {
    document.querySelector(".update-product-name").textContent = item.name;
    document.querySelector(".update-product-category").textContent =
      item.category;
    document.querySelector(
      ".update-product-sell-price"
    ).textContent = `$ ${item.sellPrice}`;
    document.querySelector(
      ".update-product-buy-price"
    ).textContent = `$ ${item.buyPrice}`;
    document.querySelector(".update-product-actual-stock").textContent =
      item.quantity;
    document.querySelector(".update-product-min-stock").textContent =
      item.alertQuantity;
  };

  const btnUpdateConfirm = document.querySelector(".confirm-update-product");
  const inputQuantityUpdate = document.querySelector(".update-quantity-input");
  btnUpdateConfirm?.addEventListener("click", function () {
    productList[index].quantity += +inputQuantityUpdate.value;
    lowStockForm.classList.add("hidden");
    lowStockProductList = productList.filter(
      (product) => product.quantity < product.alertQuantity
    );
    renderLowProductStock(lowStockProductList);
  });
};
updateStockFunction();
let lowStockProductList = productList.filter(
  (product) => product.quantity < product.alertQuantity
);

const renderLowProductStock = function (arrList) {
  // SE A LISTA DE ERRAY ESTIVER VAZIA VAI RENDELIZAR LISTA FAZIA
  if (arrList.length === 0) {
    document
      .querySelector(".product-list")
      .insertAdjacentHTML(
        "afterbegin",
        `<p classs="sem-resul">Nenhum producto encontrado </p>`
      );
  } else {
    // RENDERIZAR ELEMENTO HTML NO DOM PARA A LISTA
    const listContainer = document.querySelector(".low-stock-list");
    // VERIFICAR SE P LISTCONTANER NÃO É UNDEFINED PARA NÃO DAR ERRO QUANDO É ABERTO OUTRAS PÁGINAS DA APLICAÇÃO
    if (listContainer) listContainer.innerHTML = "";
    arrList.forEach((element) => {
      console.log(element);
      let html = `
    <div class="product-item" data-id="${element.SKUCode}">
       <!-- NOME DO PRODUCTO -->
       <div>
           <span class="alert-icon"><ion-icon name="alert-circle-outline"></ion-icon></span>
           <span class="product-name">${element.name} </span>
       </div>
       <span class="product-category">${element.category}</span>
       <span class="product-price"> ${element.alertQuantity}</span>
       <span class="product-qtd ">${element.quantity}</span>
       <span class="product-qtd status-baixo">Baixo</span>
       <span class="product-date">${element.date}</span>
       <!-- ACÇÃO DO PRODUCTO, EDITAR, ELIMINAR, VER DETALHES -->
       <span class="product-action">
           <button class="btn-update-stock"><ion-icon
                   name="create-outline"></ion-icon></button>
        
          
       </span>
   </div>
    `;
      // VERIFICAR NOVAMENTO SE O LISTCONTAINER NÃO É UNDEFINED
      if (listContainer) listContainer.insertAdjacentHTML("afterbegin", html);
    });
  }
};
renderLowProductStock(lowStockProductList);

export { stockFunction };
