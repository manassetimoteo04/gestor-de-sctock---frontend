import { appData } from "./data.js";
import { formatNumbers } from "./views/formatNumbers.js";

// CLASSE PARA FENDERIZAR OS DADOS
class renderDataMain {
  isAuthenticated = false;
  constructor() {
    //SELECIONANDO VARIAVEIS DO DOM
    this.preloader = document.querySelector(".preloader");
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
    this.allInputsLogin = document.querySelectorAll(
      ".section-login-register input"
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

    this._init();
  }

  // RENDERIZAR O SUMMARY
  _loader() {
    this.preloader.classList.remove("hidden");
    setTimeout(() => this.preloader.classList.add("hidden"), 500);
  }
  _renderUserHeaderinfo() {
    const headerFullName = document.querySelector(".header__p-name");
    const userRole = document.querySelector(".header__profile-box .permission");
    if (!headerFullName) return;
    headerFullName.textContent = appData.loggedInUser.name;
    userRole.textContent = appData.loggedInUser.role;
  }
  _renderHeaderNotificatio(list) {
    const notificationContainer = document.querySelector(
      ".notitification-list-header .list"
    );
    if (!notificationContainer) return;
    notificationContainer.innerHTML = "";
    list.forEach((item) => {
      const porduct = appData.products.find((id) => id.id === item.productId);
      const html = `
      <div class="notifications-box">
			<ion-icon name="notifications-outline"></ion-icon>
			<div class="notification-text-container"><span class="notification-text-header">Estoque Baixo</span>
      <p><span class="notif-product-name">${
        porduct.name
      }</span> está com nível baixo de estoque <span class="notif-product-sctock">${
        item.stock
      } </span> convêm actualizar</p>
      <span class="notif-date">${formatNumbers.formatDates(
        new Date(item.date)
      )}</span>
			</div>
			</div>`;
      notificationContainer.insertAdjacentHTML("afterbegin", html);
    });
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

  // RENDERIZARO OS PRODUCTOS RECENTES
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

  // RENDERIZAR AS TRANSAÇÕES RECENTES
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

  // RENDERIZAR PRODUCTOS MAIS VENDIDOS
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

  // INICIALIZANDO
  _init() {
    // CHAMANDO AS FUNÇÕES
    this._renderRecentProducts();
    this._renderRecentTransation();
    this._displayMainSummary();
    this._renderMostSelledProduct();
    this._renderHeaderNotificatio(appData.inventory.lowStockNotifications);
  }
}

// CLASSE PARA MANIPULAÇÃO GERAL DO DOM
class MainApp extends renderDataMain {
  constructor() {
    super();
    // SELECIONANDO AS VARIÁVEIS DO DOM
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
    this.loginContainer = document.querySelector(".section-login-register");
    this.logOutAccount = document.querySelector(".btn-log-out");
    this._INIT();
  }

  // TODAS AS FUNCIONALIDADES

  // FECHANDO O MENU E OUTROS AO CLICAR NO CONTAINER PRINCIPAL
  _sectionEventL() {
    this._hideMenu();
    this.body.classList.remove("show");
    this.body.classList.remove("show-notif");
  }

  // BUTTON DO TOGGLE MENU
  _toggleMenu() {
    this.body.classList.toggle("menu-hidden");
  }

  // ESCONDER MENU
  _hideMenu() {
    this.body.classList.remove("menu-hidden");
  }

  // MOSTRAR O CONTAINER DE NOTIFICAÇÕES
  _showNofitication(e) {
    this.body.classList.toggle("show-notif");
  }

  // MOSTRAR O PERFIL POPUP
  _profileToggle() {
    this.body.classList.toggle("show");
  }

  // TOGGLE O DARK E LIGHT MODE
  _toggleDarkMode() {
    this.root.classList.toggle("dark-mode");
    document.querySelector(".light-icon").classList.toggle("hidden");
    document.querySelector(".dark-icon").classList.toggle("hidden");
    this.isDarkMode = this.root.classList.contains("dark-mode");
    this._setDarkLocalStorage(this.isDarkMode);
  }

  // GUARDANDO O ESTADO NO LOCALSTORAGE PARA PERSISTIT
  _setDarkLocalStorage(value) {
    localStorage.setItem("darkMode", value);
  }

  // PEGANDO O ESTADO DO TEMA NO LOCALSTORAGE
  _getDarkToLocalStorage() {
    this.darkMode = localStorage.getItem("darkMode") === "true";
    this.darkMode
      ? this.root.classList.add("dark-mode")
      : this.root.classList.remove("dark-mode");
  }

  // RENDERIZAR O GRÁFICO
  _renderChart() {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--secondary-text-color")
      .trim();
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
      });
    }
  }

  // FUNÇÃO DOS LABEL FLUTUANTES
  _floatingLabeleLogin() {
    this.allInputsLogin.forEach((input) => {
      input.addEventListener("focus", function () {
        const target = input.closest(".field");
        target.classList.add("active");
      });

      if (input.value === "") {
        const target = input.closest(".field");
        target.classList.remove("active");
      }
    });
  }

  // FUNÇÃO PARA O LOGIN DO USUÁRIO
  // MUNDANDO ENTRE INICIAR SESSÃO E CRIAR CONTA
  _toggleLoginRegister() {
    this.sectionLoginContainer = document.querySelector(".login-container");
    this.sectionRegisterContainer = document.querySelector(
      ".create-account-container"
    );
    this.btnShowRegisterForm = document.querySelector(".no-account");
    this.btnShowLoginForm = document.querySelector(".have-account");

    this.btnShowRegisterForm?.addEventListener(
      "click",
      this._showCreateAccountForm.bind(this)
    );
    this.btnShowLoginForm?.addEventListener(
      "click",
      this._showLoginForm.bind(this)
    );
  }

  // FUNÇÃO PARA MOSTRAR O CREATE ACCOUNT
  _showCreateAccountForm(e) {
    e.preventDefault();

    this._loader();
    this.sectionLoginContainer.classList.add("hidden");
    this.sectionRegisterContainer.classList.remove("hidden");
    this.inputLogin.forEach((input) => (input.value = ""));
    this._floatingLabeleLogin();
    this.accountNotFoundAlert.classList.add("hidden");
  }

  // MOSTRAR O FORMULÁRIO DE LOGIN
  _showLoginForm(e) {
    e.preventDefault();

    this._loader();
    this.sectionLoginContainer.classList.remove("hidden");
    this.sectionRegisterContainer.classList.add("hidden");
  }
  // HELPER FUNTION PARA O LOGIN
  _loginFunction() {
    const btnLoginAccount = document.querySelector(".btn-login");
    btnLoginAccount?.addEventListener(
      "click",
      this._loginValidateInput.bind(this)
    );
  }
  _logoutFunction() {
    this.isAuthenticated = false;
    localStorage.removeItem("loged");
    // this._isAuthenticated();
    location.reload();
  }

  // MOSTRANDO O ALERYA DE CAMPO OBRIGATÓRIO E ALERTA DE CONTA NÃO ENCONTRADA
  _reInitiInput() {
    this.inputLogin = document.querySelectorAll(".login-form input");
    if (!this.inputLogin) return;

    this.inputLogin.forEach((input) => {
      input.addEventListener("input", () => {
        if (input.value !== "") {
          const target = input.closest(".field");
          target.nextElementSibling.classList.add("hidden");
          // setTimeout(() => {
          //   accountNotFoundAlert.classList.add("hidden");
          // }, 10000);
        }
      });
    });
  }
  _showHidePassword(e) {
    const target = e.target.closest(".see-box");
    console.log(e.target);
    if (!target) return;
    const input = target.previousElementSibling;
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");

    const childs = target.children;
    childs[0].classList.toggle("hidden");
    childs[1].classList.toggle("hidden");
  }
  // VALIDANDO OS VALORES DOS INPUTS
  _loginValidateInput(e) {
    e.preventDefault();
    const inputLoginUsername = document.querySelector(".input-login-username");
    const inputLoginPassword = document.querySelector(".input-login-password");
    const inputLogin = document.querySelectorAll(".login-form input");

    this.accountNotFoundAlert = document.querySelector(
      ".alert-account-not-found"
    );
    inputLogin.forEach((input) => {
      if (input.value === "") {
        const target = input.closest(".field");
        target.nextElementSibling.classList.remove("hidden");
      }
    });

    if (inputLoginPassword.value && inputLoginUsername.value) {
      this._loader();
      this.currentAccount = appData.auth.users.find(
        (acc) => inputLoginUsername.value === acc.username
      );
      if (!this.currentAccount) {
        this.accountNotFoundAlert.classList.remove("hidden");
      }
      if (inputLoginPassword.value === this.currentAccount.password) {
        this.isAuthenticated = true;
        location.reload();
        localStorage.setItem("loged", this.isAuthenticated);
        this._isAuthenticated();
        inputLogin.forEach((input) => (input.value = ""));
      }
    }
  }
  // _isAuthenticated() {
  //   const isLoged = JSON.parse(localStorage.getItem("loged"));
  //   // if (!this.loginContainer) return;
  //   if (isLoged === true) this.loginContainer.classList.add("hidden");

  //   if (isLoged === false) {
  //     const pathParts = window.location.pathname.split("/");
  //     const depth = pathParts.length - 2;

  //     let loginPath = "/index.html";
  //     for (let i = 0; i < depth; i++) {
  //       loginPath = ".." + loginPath;
  //     }
  //     window.location.href = "login.html";
  //     this.loginContainer.classList.remove("hidden");
  //   }
  // }

  _INIT() {
    // FUNÇÕES CHAMADAS NO PROCESSO DE LOADING
    this._getDarkToLocalStorage();
    this._renderChart();
    this._allEventListeners();
    this._renderUserHeaderinfo();
    this._floatingLabeleLogin();
    this._loginFunction();
    this._reInitiInput();
    this._toggleLoginRegister();
    this._loader();
  }

  _allEventListeners() {
    // LIDANDO COM OS EVENT LISTENERS
    this.toggleMenuBtn?.addEventListener("click", this._toggleMenu.bind(this));
    this.profileBtn?.addEventListener("click", this._profileToggle.bind(this));

    this.btnToggleDarkMode?.addEventListener(
      "click",
      this._toggleDarkMode.bind(this)
    );
    this.mainContentSection?.forEach((btn) => {
      btn.addEventListener("click", this._sectionEventL.bind(this));
    });
    this.loginContainer?.addEventListener(
      "click",
      this._showHidePassword.bind(this)
    );
    this.logOutAccount?.addEventListener(
      "click",
      this._logoutFunction.bind(this)
    );
  }
}

const mainApp = new MainApp();
const renderMain = new renderDataMain();

export { mainApp, renderMain };
