// REFACTORING THE CODE

class ReportApp {
  constructor() {}
  // FUNCÇÕES DOS EVENT LISTENERS
}

document.addEventListener("DOMContentLoaded", (event) => {
  const ctx = document.getElementById("monthlySalesChart");
  // Dados do gráfico
  const data = {
    labels: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    datasets: [
      {
        label: "Vendas (em KZ)",
        data: [
          12000, 15000, 14000, 13000, 16000, 17000, 18000, 19000, 20000, 21000,
          22000, 23000,
        ],
        borderColor: "#4361ee",
        backgroundColor: "rgba(153, 170, 245, 0.2)",
        fill: true,
        tension: 0.01,
      },
    ],
  };

  // Configuração do gráfico
  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            color: "#4361ee",
          },
          ticks: {
            color: "#4361ee", // Cor dos ticks do eixo X
          },
        },
        y: {
          title: {
            display: true,
            color: "#4361ee",
          },
          ticks: {
            color: "#4361ee", // Cor dos ticks do eixo X
          },
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          color: "#4361ee",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat("pt-AO", {
                  style: "currency",
                  currency: "AOA",
                }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
    },
  };

  // Renderizar o gráfico
  const monthlySalesChart = new Chart(ctx, config);
});

const report = new ReportApp();
export { report };
