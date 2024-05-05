// MOSTRAR E GUARDANDO O MENU
import { productFunction } from "./products.js";

productFunction();

const toggleMenuBtn = document.querySelector(".toggleMenu__btn");
const body = document.querySelector("body");

toggleMenuBtn.addEventListener("click", function () {
  body.classList.toggle("menu-hidden");
});

const btnToggleDarkMode = document.querySelector(".toggle-dark-mode");
const root = document.documentElement;
btnToggleDarkMode.addEventListener("click", function () {
  root.classList.toggle("dark-mode");
  document.querySelector(".light-icon").classList.toggle("hidden");
  document.querySelector(".dark-icon").classList.toggle("hidden");
});
// FUNÇÃO PARA A PÁGINA INICIAL DO DASHBOARD
const dashBoardFunction = function () {
  const ctx = document.getElementById("myChart");
  // Crie o gráfico com CHART JS

  const DATA_COUNT = 7;
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ]; // Rótulos para os meses

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Compras",
        data: [10, 20, 30, 40, 50, 60, 30], // Dados de exemplo
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
      },
      {
        label: "Vendas",
        data: [70, 60, 50, 40, 30, 20, 10], // Dados de exemplo
        borderColor: "blue",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderRadius: 5,
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
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
          },
        },
      },
    });
  }
};
dashBoardFunction();
