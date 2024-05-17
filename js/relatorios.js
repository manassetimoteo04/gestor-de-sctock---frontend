const data = {
  labels: ["Baixo", "Mêdio", "Excesso"],
  datasets: [
    {
      data: [12, 19, 12],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// Opções para o gráfico
const options = {
  cutoutPercentage: 90,
  rotation: -0.5 * Math.PI,
  responsive: true,
};

// Obtenha o elemento canvas
const ctx = document.getElementById("myDonutChart")?.getContext("2d");

// Crie o gráfico de rosca
if (ctx) {
  const myDonutChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: options,
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  const ctx = document.getElementById("monthlySalesChart");
  // Dados do gráfico
  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"],
    datasets: [
      {
        label: "Vendas (em KZ)",
        data: [12000, 15000, 14000, 13000, 16000, 17000, 18000],
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
      maintainAspectRatio: false,
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
  if (ctx) {
    const monthlySalesChart = new Chart(ctx, config);
  }
});

// REFACTORING THE CODE

class ReportApp {
  constructor() {
    this.filterContainer = document.querySelector(
      ".filter-analitycs-container"
    );
    this.filerBuyButton = document.querySelectorAll(".filter-by");
    this.filterDateInputContainer = document.querySelector(".filter-input");
    this.btnCloseDateInputContainer = document.querySelector(
      ".btn-close-filter-analityc"
    );

    // EVENT LISTENERS
    this.filterContainer?.addEventListener(
      "click",
      this._toggleFiterBtn.bind(this)
    );
    this.btnCloseDateInputContainer?.addEventListener(
      "click",
      this._closeFilterDateContainer.bind(this)
    );
  }
  // FUNCÇÕES DOS EVENT LISTENERS

  _toggleFiterBtn(e) {
    const target = e.target.closest(".filter-by");
    if (!target) return;
    this.filerBuyButton.forEach((btn) => btn.classList.remove("filtered"));
    document.querySelector(`.${target.classList[1]}`).classList.add("filtered");

    // CHAMANDO A FUNÇÃO PARA MOSTRAR O DATE FILTER CONTAINER
    this._showingDateFilterContainer(e);
  }
  _showingDateFilterContainer(e) {
    const target = e.target.closest(".date-filter");
    if (!target) return;
    this.filterDateInputContainer.classList.remove("hidden");
  }
  _closeFilterDateContainer() {
    this.filterDateInputContainer.classList.add("hidden");
  }
}
const report = new ReportApp();
export { report };
