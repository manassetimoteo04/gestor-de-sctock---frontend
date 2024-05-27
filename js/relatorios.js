// REFACTORING THE CODE
const c = console.log.bind(document);
import { appData } from "./data.js";
import { formatNumbers } from "./views/formatNumbers.js";
class ReportApp {
  constructor() {
    this.totalEarningLabel = document.querySelector(".analityc-total-earning");
    this.totalOrdersLabel = document.querySelector(".analityc-total-order");
    this.totalLucLabel = document.querySelector(".analityc-total-lucr");

    this.filterContainer = document.querySelector(
      ".filter-analitycs-container"
    );
    this.filerBuyButton = document.querySelectorAll(".filter-by");
    this.filterDateInputContainer = document.querySelector(".filter-input");
    this.btnCloseDateInputContainer = document.querySelector(
      ".btn-close-filter-analityc"
    );

    this.mostSelledProductList = document.querySelector(
      ".most-selled-list-report"
    );
    this.topCategoryContainer = document.querySelector(
      ".container-progress-sell-category"
    );
    this.topProductList = document.querySelector(".top-product-list");
    this.actualStockContainer = document.querySelector(".actual-stock-list");

    this.totalPagesLabel = document.querySelector(".total-pages-report");
    this.curPagelabel = document.querySelector(".curr-page-number-report");
    this.btnNextPage = document.querySelector(".btn-next-page-report");
    this.btnPrevPage = document.querySelector(".btn-previous-page-report");
    this.inputSearchStock = document.querySelector(
      ".search-input-report-stock"
    );
    this.actualStockSort = document.querySelector(".report-sort-by");
    // EVENT LISTENERS
    this.filterContainer?.addEventListener(
      "click",
      this._toggleFiterBtn.bind(this)
    );
    this.filterDateInputContainer?.addEventListener(
      "click",
      this._closeFilterDateContainer.bind(this)
    );
    this.btnNextPage?.addEventListener("click", this.goToNextPage.bind(this));
    this.btnPrevPage?.addEventListener(
      "click",
      this.goToPreviousPage.bind(this)
    );

    this.inputSearchStock.addEventListener(
      "input",
      this._searchActualStockFilter.bind(this)
    );
    this.actualStockContainer?.addEventListener(
      "click",
      this._sortActualStock.bind(this)
    );

    this._renderSummary();
    this._renderChartLine();
    this._renderMostSelledProduct(appData.reports.topSellingProducts);
    this._renderSalesByCategory(appData.reports.salesByCategory);
    this._renderTopProducts(appData.reports.topSellingProducts);
    this._pagination(appData.reports.currentStock);
  }
  // FUNCÇÕES DOS EVENT LISTENERS
  _renderSummary() {
    if (!this.totalEarningLabel) return;
    this.totalEarningLabel.textContent = formatNumbers.formatCurrency(
      appData.reports.salesByPeriod[0].totalSales
    );
    this.totalLucLabel.textContent = formatNumbers.formatCurrency(
      appData.reports.salesByPeriod[0].totalL
    );

    this.totalOrdersLabel.textContent =
      appData.reports.salesByPeriod[0].totalOrders;
  }

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
  _closeFilterDateContainer(e) {
    const target = e.target;
    if (target.classList.contains("overlay-date-report"))
      this.filterDateInputContainer.classList.add("hidden");
    if (target.closest(".btn-close-filter-analityc"))
      this.filterDateInputContainer.classList.add("hidden");

    if (target.closest(".btn-generate-report"))
      this.filterDateInputContainer.classList.add("hidden");
  }

  _renderChartLine() {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--secondary-text-color")
      .trim();
    const ctx = document.getElementById("monthlySalesChart");
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
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(75, 192, 192, 1)",
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
              font: {
                size: 18,
              },
              color: color,
            },
          },
          y: {
            title: {
              display: true,
              color: "#4361ee",
            },
            ticks: {
              font: {
                size: 18,
              },
              color: color,
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
          legend: {
            display: false,
            position: "top",
            labels: {
              font: {
                size: 18,
              },
              color: color,
            },
          },
        },
      },
    };

    if (ctx) {
      const monthlySalesChart = new Chart(ctx, config);
    }
  }

  _renderMostSelledProduct(list) {
    if (!this.mostSelledProductList) return;
    this.mostSelledProductList.innerHTML = "";

    list.forEach((item) => {
      const productName = appData.products.find((p) => p.id === item.productId);
      const html = `<div class="most-selled-product">
      <div class="product-name"> <ion-icon name="trending-up-outline"></ion-icon>
          <div>
              <span>${productName.name}</span>
              <span class="price-selled">${formatNumbers.formatCurrency(
                productName.price
              )}</span>
          </div>
      </div>

      <span class="quantity">${item.sales} </span>

      <span class="total-selled-amount">${formatNumbers.formatCurrency(
        item.total
      )}</span>
  </div>
`;
      this.mostSelledProductList.insertAdjacentHTML("afterbegin", html);
    });
  }
  _renderSalesByCategory(list) {
    if (!this.topCategoryContainer) return;
    this.topCategoryContainer.innerHTML = "";
    list.forEach((item) => {
      const percentage =
        (item.amount / appData.reports.salesByPeriod[0].totalSales) * 100;
      const html = `
      <div class="category-box">
      <div>
          <span class="category-name">${item.category} </span>
          <span class="category-amount"> ${formatNumbers.formatCurrency(
            item.amount
          )} </span>
      </div>
      <div class="progress">
          <div class="progress-bar" style="width: ${percentage}%;"></div>
      </div>
     </div>
      `;
      this.topCategoryContainer.insertAdjacentHTML("afterbegin", html);
    });
  }

  _renderTopProducts(list) {
    if (!this.topProductList) return;
    this.topProductList.innerHTML = "";
    list.forEach((item) => {
      const producName = appData.products.find((p) => p.id === item.productId);
      const html = `
      <div class="product-box">
          <div>
              <span class="product-icon"><ion-icon
                      name="bookmark-outline"></ion-icon></span>
              <span class="">${producName.name} </span>
          </div>
          <span class="">${producName.category}</span>
          <span class="">${producName.stock}</span>
          <span class="">${formatNumbers.formatCurrency(
            producName.price
          )}</span>
          <span class="">${item.sales}</span>

      </div>
      `;
      this.topProductList.insertAdjacentHTML("afterbegin", html);
    });
  }

  _renderActualStock(list) {
    this.actualStockContainer.innerHTML = "";
    if (list.length === 0) {
      this.listContainer.innerHTML = "";
      const emptyList = `
      <div class="empty-product">
      <p>Nenhum producto encontrado</p>
      </div>
      `;
      this.actualStockContainer.insertAdjacentHTML("afterbegin", emptyList);
    }
    list.forEach((item) => {
      const product = appData.products.find((p) => p.id === item.productId);
      const html = `
    <div class="product-box">
        <div>
            <span class="product-icon"><ion-icon
                    name="chevron-expand-outline"></ion-icon></span>
            <span class="">${product.name} </span>
        </div>
        <span class="">${product.category} </span>
        <span class="">${product.stock}</span>
        <span class="">45</span>
        <span class="">${product.id}</span>
    </div>
      `;
      this.actualStockContainer.insertAdjacentHTML("afterbegin", html);
    });
  }

  _searchActualStockFilter() {
    // const value = this.inputSearchStock.value.toLowerCase();
    // console.log(value);
    // const filtered = appData.reports.currentStock.filter((item) =>
    //   item.id.startsWith(value)
    // );
    // this._pagination(filtered);
  }
  _sortActualStock(e) {
    const target = e.target.closest("span");
    if (target.classList.contains("sort-stock")) this.sorByStock();
    if (target.classList.contains("sort-sell")) this.sorBySell();
  }
  sorByStock() {}
  sorBySell() {}
  //PAGINAÇÃO DA LISTA
  _pagination(productList) {
    if (!this.totalPagesLabel) return;

    this.productList = productList;
    this.productsPerPage = 7;
    this.currentPage = 1;
    this.totalPages = Math.ceil(productList.length / this.productsPerPage);
    this.totalPagesLabel.textContent = `${this.totalPages
      .toString()
      .padStart(2, 0)}`;

    this.renderCurrentPage(this.currentPage, productList);
  }

  // RENDERIZAR PAGINAÇÃO
  renderPage(page, list) {
    this.startIndex = (page - 1) * this.productsPerPage;
    this.endIndex = this.startIndex + this.productsPerPage;
    this.productsToRender = list.slice(this.startIndex, this.endIndex);
    this._renderActualStock(this.productsToRender);
  }

  renderCurrentPage(currentPage, list) {
    this.renderPage(currentPage, list);
  }

  // PÁGINA ANTERIOR
  goToPreviousPage = function () {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderCurrentPage(this.currentPage, this.productList);
    }
    this.curPagelabel.textContent = this.currentPage;
  };

  // PÁGINA SEGUINTE
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderCurrentPage(this.currentPage, this.productList);
    }
    this.curPagelabel.textContent = this.currentPage;
  }
}
const report = new ReportApp();
export { report };
