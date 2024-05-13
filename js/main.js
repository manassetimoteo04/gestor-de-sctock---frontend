import { productClass, productList } from "./products.js";
import { client } from "./clientes.js";
import { newStock } from "./estoque.js";
import { sellApp } from "./vendas.js";

// REFACTORING

class MainApp {
  constructor() {
    // SELECIONANDO AS VARIÁVEIS
    this.toggleMenuBtn = document.querySelector(".toggleMenu__btn");
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
    // FUNÇÕES CHAMADAS NO PROCESSO DE LOADING
    this._getDarkToLocalStorage();
    this._renderChart();
  }

  // TODAS AS FUNCIONALIDADES
  _toggleMenu() {
    this.body.classList.toggle("menu-hidden");
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
  // _counter(content) {
  //   this.number = +content.textContent;
  //   this.starter = 0;
  //   this.timer = setInterval(this._startCounting, 0);
  // }
  // _startCounting(starter) {
  //   starter += 100;
  //   content.textContent = starter;
  //   if (starter >= this.number) clearInterval(this.timer);
  // }
  // _displaycounter() {
  //   this.allNumberLabel.forEach((num) => this.counter(num));
  // }
  _renderChart() {
    this.labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"];

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

const newApp = new MainApp();
