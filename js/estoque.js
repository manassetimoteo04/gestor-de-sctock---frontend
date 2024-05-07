// Defina a função stockFunction

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

export { stockFunction };
