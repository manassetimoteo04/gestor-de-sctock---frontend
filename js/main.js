// MOSTRAR E GUARDANDO O MENU
// import { callback } from "chart.js/dist/helpers/helpers.core.js";
import { productFunction } from "./products.js";
productFunction();
import { stockFunction } from "./estoque.js";
stockFunction();
import { sellFuntion } from "./vendas.js";
sellFuntion();

// EXECUTAR A FUNÇÃO DE MOSTAR E FECHAR O MENU
const toggleMenuBtn = document.querySelector(".toggleMenu__btn");
const body = document.querySelector("body");

toggleMenuBtn.addEventListener("click", function () {
  body.classList.toggle("menu-hidden");
});

// MOSTRAR PERFIL QUANDO CLICADO NA FOTO DE PERFIL
const profile = document.querySelector(".header__profile-box");
profile.addEventListener("click", function () {
  document.body.classList.toggle("show");
});

// FUNÇÃO PARA ACTIVAR O MODO ESCURO
// const setDark = () => );
const darkModeFunction = function () {
  const btnToggleDarkMode = document.querySelector(".toggle-dark-mode");
  btnToggleDarkMode.addEventListener("click", function () {
    const root = document.documentElement;
    root.classList.toggle("dark-mode");
    document.querySelector(".light-icon").classList.toggle("hidden");
    document.querySelector(".dark-icon").classList.toggle("hidden");
    const isDarkMode = root.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
  });
};
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const isDarkMode = root.classList.contains("dark-mode");

  const DarkMode = localStorage.getItem("darkMode") === "true";
  if (DarkMode) {
    root.classList.add("dark-mode");
  } else {
    root.classList.remove("dark-mode");
  }
});
darkModeFunction();

// CRIANDO O COUNTER
const labelPurchase = document.querySelectorAll(".tot-label-num");
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

labelPurchase?.forEach((element) => {
  // observer.observe(element);
  counter(element);
});

// FUNÇÃO PARA A PÁGINA INICIAL DO DASHBOARD
const dashBoardFunction = function () {
  const ctx = document.getElementById("myChart");
  // Crie o gráfico com CHART JS

  const DATA_COUNT = 7;
  const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"]; // Rótulos para os meses

  const data = {
    labels: labels,
    datasets: [
      // {
      //   label: "Compras",
      //   data: [10, 20, 30, 40, 50, 60, 30], // Dados de exemplo
      //   borderColor: "red",
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      //   borderRadius: Number.MAX_VALUE,
      //   borderSkipped: false,
      // },
      {
        label: "Vendas",
        data: [30, 67, 45, 40, 50, 20, 10], // Dados de exemplo
        borderColor: "blue",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  if (ctx) {
    const myChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
          },
          labels: {
            render: "label",
            fontColor: function (context) {
              const color = window
                .getComputedStyle(document.documentElement)
                .getPropertyValue("--secondary-text-color");
              return color;
            },
          },
        },
      },
    });
  }
};

dashBoardFunction();
