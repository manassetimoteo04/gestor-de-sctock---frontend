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
  _renderUserHeaderinfo() {}

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

  _init() {}
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
  //FUNÇÃO DO BOTÃO PARA MOSTRAR PALAVRA PASSE E GUARDAR
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

  // INICIALIZANDO AS FUNÇÕES
  _INIT() {
    // FUNÇÕES CHAMADAS NO PROCESSO DE LOADING
    this._getDarkToLocalStorage();
    //RENDERIZAR O CHART
    this._renderChart();
    // CHAMANDO TODOS OS EVENT LISTNERS
    this._allEventListeners();
    //CHAMANDO O LABEL FLUTUANTE NOS INPUT DO LOGIN
    this._floatingLabeleLogin();
    //MUDANDO ENTRE O LOGIN E CRIAR CONTA
    this._toggleLoginRegister();
    this._loader();
  }
  //CHAMANDO TODOD OS EVENTLISTENERS
  _allEventListeners() {
    // LIDANDO COM OS EVENT LISTENERS
    // EVENT PARA MOSTRAR E GUARDAR O MENU
    this.toggleMenuBtn?.addEventListener("click", this._toggleMenu.bind(this));
    // EVENT PARA MOSTRAR O POPUP DO PERFIL [CONTENTO; PERFIL, CONFIG, E BOTÃO DE LOGOUT]
    this.profileBtn?.addEventListener("click", this._profileToggle.bind(this));
    //EVENT PARA MUDAR O TEMA DO APP ENTRE DARK E LIGHT MODE
    this.btnToggleDarkMode?.addEventListener(
      "click",
      this._toggleDarkMode.bind(this)
    );
    //EVENT PARA GUARDAR O MENU SEMPRE O O CLICK NÃO FOR NO MENU [AO CLICAR EM QUALQUER PARTE DO SECTION]
    this.mainContentSection?.forEach((btn) => {
      btn.addEventListener("click", this._sectionEventL.bind(this));
    });

    //CHAMANDO O EVENT DELEGATION PARA FUNCIONAR O EVENTO DO HIDE E SHOWPASSWORD
    this.loginContainer?.addEventListener(
      "click",
      this._showHidePassword.bind(this)
    );
  }
}

const mainApp = new MainApp();
const renderMain = new renderDataMain();

export { mainApp, renderMain };
