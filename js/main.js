// MOSTRAR E GUARDANDO O MENU
const toggleMenuBtn = document.querySelector(".toggleMenu__btn");
const body = document.querySelector("body");

toggleMenuBtn.addEventListener("click", function () {
  body.classList.toggle("menu-hidden");
});
console.log("Welcome");

// Crie o gráfico com CHART JS
const ctx = document.getElementById("myChart");

const DATA_COUNT = 7;
const labels = ["January", "February", "March", "April", "May", "June", "July"]; // Rótulos para os meses

const data = {
  labels: labels,
  datasets: [
    {
      label: "Compras",
      data: [10, 20, 30, 40, 50, 60, 70], // Dados de exemplo
      borderColor: "red",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderWidth: 2,
      borderRadius: Number.MAX_VALUE,
      borderSkipped: false,
    },
    {
      label: "Vendas",
      data: [70, 60, 50, 40, 30, 20, 10], // Dados de exemplo
      borderColor: "blue",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderWidth: 2,
      borderRadius: 5,
      borderSkipped: false,
    },
  ],
};
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
