import { appData } from "./data.js";
import { formatNumbers } from "./views/formatNumbers.js";

// CLASSE PARA FENDERIZAR OS DADOS
class renderDataMain {
  constructor() {
    //SELECIONANDO VARIAVEIS

    this.recentProductContainer = document.querySelector(
      ".recent-product-list"
    );
    this.recentTransationContainer = document.querySelector(
      ".recent-transation-list"
    );
    this.notiticaTionHeaderContainer = document.querySelector(
      ".notification-header"
    );
    this.btnToggleNotificationContainer = document.querySelector(
      ".show-notification_btn"
    );

    //VARIAVEIS DO SUMMARY
    this.mostSelledProductContainer =
      document.querySelector(".most-selled-list");
    this.weekTotalEarningLabel = document.querySelector(".week-earning-total");
    this.monthTotalEarningLabel = document.querySelector(".month-earn-total");
    this.clientTotalnumberLabel = document.querySelector(
      ".total-client-number"
    );
    this.supplierTotalNumberLabel = document.querySelector(
      ".total-supplier-number"
    );
    this.totalProductNumberLabel = document.querySelector(
      ".total-product-number"
    );

    // CHAMANDO AS FUNÇÕES
    this._renderRecentProducts();
    this._renderRecentTransation();
    this._displayMainSummary();
    this._renderMostSelledProduct();
  }

  _displayMainSummary() {
    if ((!this.weekTotalEarningLabel, !this.monthTotalEarningLabel)) return;
    this.weekTotalEarningLabel.textContent = formatNumbers.formatCurrency(
      appData.weekEarning
    );
    this.monthTotalEarningLabel.textContent = formatNumbers.formatCurrency(
      appData.monthEarnig
    );
    this.totalProductNumberLabel.textContent = appData.products.length;
    this.clientTotalnumberLabel.textContent = appData.clients.length;
    this.supplierTotalNumberLabel.textContent = appData.supplier.length;
  }
  _renderRecentProducts() {
    const recentList = appData.products.slice(
      Math.max(appData.products.length - 5, 0)
    );
    this.recentProductContainer
      ? (this.recentProductContainer.innerHTML = "")
      : "";
    recentList.forEach((recent) => {
      const html = `
      <div class="recent-product-notification">
				<div>
					<ion-icon name="arrow-down-outline"></ion-icon>
					<span class="product-name">${recent.name}</span>
				</div>
				<span class="product-price">${recent.category}</span>
			</div>
      `;

      this.recentProductContainer
        ? this.recentProductContainer.insertAdjacentHTML("afterbegin", html)
        : "";
    });
  }
  _renderRecentTransation() {
    const transationList = appData.sales.slice(
      Math.max(appData.sales.length - 5, 0)
    );
    if (this.recentProductContainer) {
      this.recentTransationContainer.innerHTML = "";
      transationList.forEach((trans) => {
        const html = `
      <div class="transation-recent">
				<div class="invoice-container">
					<ion-icon name="swap-horizontal-outline"></ion-icon>
					<div>
						<span class="invoice-number">${trans.invoice.id} </span>
						<span class="payment-type">${trans.paymentType} </span>
					</div>
				</div>
				<span class="total-sell">${formatNumbers.formatCurrency(
          trans.totalAmount
        )}</span>
				<span class="sell-date">${formatNumbers.formatDates(
          new Date(trans.date)
        )} </span>
				<span class="sell-status">${trans.status}</span>
			</div>
      `;
        this.recentTransationContainer.insertAdjacentHTML("afterbegin", html);
      });
    }
  }
  _renderMostSelledProduct() {
    const products = appData.products.sort((a, b) => a.sales - b.sales);
    const mostSelledList = products.slice(Math.max(products.length - 5, 0));
    if (this.mostSelledProductContainer) {
      this.mostSelledProductContainer.innerHTML = "";
      mostSelledList.forEach((product) => {
        const html = `
        <div class="product-notification most-salled">
								<ion-icon name="trending-up-outline"></ion-icon>
								<div>
									<div class="flex-most-selled">

										<span class="product-name">${product.name} </span>
										<span class="number">Quantidade</span>
									</div>
									<div class="flex-most-selled">
										<span class="product-price">${formatNumbers.formatCurrency(
                      product.price
                    )} </span>
										<span class="sale-num">${product.sales} </span>
									</div>
								</div>

							</div>
        `;
        this.mostSelledProductContainer.insertAdjacentHTML("afterbegin", html);
      });
    }
  }
  // _formatCurrency(number) {
  //   const numb = number;
  //   const options = {
  //     style: "currency",
  //     currency: "AOA",
  //   };
  //   return new Intl.NumberFormat("pt-AO", options).format(numb);
  // }
  // _formatDates = function (now) {
  //   const calDaysFuntion = (date1, date2) =>
  //     Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  //   const displayDays = calDaysFuntion(new Date(), now);
  //   if (displayDays === 0) return `Hoje`;
  //   if (displayDays === 1) return `Ontem`;
  //   if (displayDays <= 7) return `Há ${displayDays} dias`;
  //   return new Intl.DateTimeFormat("pt-PT").format(now);
  // };
}

// CLASSE PARA MANIPULAÇÃO GERAL DO DOM
class MainApp extends renderDataMain {
  constructor() {
    super();
    // SELECIONANDO AS VARIÁVEIS
    this.mainContentSection = document.querySelectorAll(
      ".main__content-section"
    );
    this.toggleMenuBtn = document.querySelector(".toggleMenu__btn");
    this.btnToggleNotificationContainer?.addEventListener(
      "click",
      this._showNofitication.bind(this)
    );
    this.body = document.querySelector("body");
    this.profileBtn = document.querySelector(".header__profile-box");
    this.btnToggleDarkMode = document.querySelector(".toggle-dark-mode");
    this.root = document.documentElement;
    this.labelPurchase = document.querySelectorAll(".tot-label-num");
    this.allNumberLabel = document.querySelectorAll(".counter-num");
    this.ctx = document.getElementById("myChart");
    // LIDANDO COM OS EVENT LISTENERS
    this.toggleMenuBtn?.addEventListener("click", this._toggleMenu.bind(this));
    this.profileBtn?.addEventListener("click", this._profileToggle.bind(this));

    this.btnToggleDarkMode?.addEventListener(
      "click",
      this._toggleDarkMode.bind(this)
    );
    this.mainContentSection.forEach((btn) => {
      btn.addEventListener("click", this._sectionEventL.bind(this));
    });
    // FUNÇÕES CHAMADAS NO PROCESSO DE LOADING
    this._getDarkToLocalStorage();
    this._renderChart();
  }

  // TODAS AS FUNCIONALIDADES
  _sectionEventL() {
    this._hideMenu();
    this.body.classList.remove("show");
    this.body.classList.remove("show-notif");
  }
  _toggleMenu() {
    this.body.classList.toggle("menu-hidden");
  }

  _hideMenu() {
    this.body.classList.remove("menu-hidden");
  }
  _showNofitication(e) {
    this.body.classList.toggle("show-notif");
  }
  _profileToggle() {
    this.body.classList.toggle("show");
  }
  _toggleDarkMode() {
    this.root.classList.toggle("dark-mode");
    document.querySelector(".light-icon").classList.toggle("hidden");
    document.querySelector(".dark-icon").classList.toggle("hidden");
    this.isDarkMode = this.root.classList.contains("dark-mode");
    this._setDarkLocalStorage(this.isDarkMode);
  }
  _setDarkLocalStorage(value) {
    localStorage.setItem("darkMode", value);
  }
  _getDarkToLocalStorage() {
    this.darkMode = localStorage.getItem("darkMode") === "true";
    this.darkMode
      ? this.root.classList.add("dark-mode")
      : this.root.classList.remove("dark-mode");
  }

  _renderChart() {
    this.labels = ["07h", "10h", "13h", "16", "18h", "20h", "21h"];

    this.data = {
      labels: this.labels,
      datasets: [
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

    if (this.ctx) {
      this.myChart = new Chart(this.ctx, {
        type: "bar",
        data: this.data,
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
  }
}

const mainApp = new MainApp();
const renderMain = new renderDataMain();

export { mainApp, renderMain };
