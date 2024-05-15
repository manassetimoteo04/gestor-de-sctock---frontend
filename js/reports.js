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
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    datasets: [
      {
        label: "Vendas (em R$)",
        data: [
          12000, 15000, 14000, 13000, 16000, 17000, 18000, 19000, 20000, 21000,
          22000, 23000,
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
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
            text: "Meses",
          },
        },
        y: {
          title: {
            display: true,
            text: "Vendas (em KZ)",
          },
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Relatório de Vendas Mensal",
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
