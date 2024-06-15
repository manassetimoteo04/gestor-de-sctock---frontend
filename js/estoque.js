// import { appData } from "./data.js";
// import { formatNumbers } from "./views/formatNumbers.js";

class StockApp {
  index;
  lowStockProductList;
  constructor() {
    // SELECIONADO AS VARIAVEIS DO BOM
    this.historicDetailContainer = document.querySelector(
      ".historic-product-detail "
    );

    this.lowStockContainer = document.querySelector(".low-stock-list");

    this.inputQuantityUpdate = document.querySelector(".update-quantity-input");
    this.lowNotificationContainer = document.querySelector(
      ".notification-stock-list"
    );
    this.productInOUtHistory = document.querySelector(
      ".product-in-out-history"
    );
    this.sorContainer = document.querySelector(".sort-list");
    this.totalPagesLabel = document.querySelector(".total-pages");

    this.btnNextPage = document.querySelector(".btn-next-page");
    this.btnPevPage = document.querySelector(".btn-previous-page");

    this.curPagelabel = document.querySelector(".curr-page-number");
    this.historyInputSearch = document.querySelector(
      ".search-input-history-product"
    );

    // INICIALIZANDO AS FUNÇÕES
    this._allEventListeners();
    this._init();
  }

  // MOSTRAR O CONTAINER PARA DETALHES DO EVENTO DO PRODUCTO
  _showProductHistDetail(e) {
    this.target = e.target.closest(".btn-update-stock");
    if (!this.target) return;
    const Id = +this.target.closest(".product-item-history").dataset.id;

    this.historicDetailContainer.classList.remove("hidden");
    this._renderProductHistDetailContent(Id);
  }

  // FEHCAR O CONTAINER DO DETALHE DE EVENTO DO PRODUCTO
  _closeHistoricDetail(e) {
    const target = e.target;
    if (target.classList.contains("overlay-historic-detail"))
      this.historicDetailContainer.classList.add("hidden");
    if (target.closest(".btn-close-historic-detail"))
      this.historicDetailContainer.classList.add("hidden");
  }

  // RENDERIZAR O CONTENT DO DETALHE DO EVENTO DO PRODUCTO
  _renderProductHistDetailContent(id) {
    const item = appData.registerInOutProducts.find((p) => p.productId === id);

    document.querySelector(".product-name-historic").textContent = item.name;
    document.querySelector(".product-category-historic").textContent =
      item.category;

    document.querySelector(".product-qty-historic").textContent = item.quantity;
    document.querySelector(".product-event-type").textContent = item.type;
    document.querySelector(".product-date-historic").textContent =
      formatNumbers.formatDates(new Date(item.date));
  }

  // FUNÇÃO PARA CLASSIFICAR A LISTA DE REGISTRO DE ENTRADA E SAÍDAS
  _sortProductList(e) {
    const target = e.target.closest("span");
    const def = document.querySelector(".default");
    if (!target) return;

    if (target.className === "date") {
      //DESCOMENTAR PARA CHAMAR O EVENTO DE FILTRAGE,
      // this._sortByDate();
      def.textContent = target.textContent;
    }

    if (target.className === "qtd") {
      //DESCOMENTAR PARA CHAMAR O EVENTO DE FILTRAGE,
      // this._sortByStock();
      def.textContent = target.textContent;
    }

    if (target.className === "outcome") {
      //DESCOMENTAR PARA CHAMAR O EVENTO DE FILTRAGE,
      // this._filetOutComeProduct();
      def.textContent = target.textContent;
    }

    if (target.className === "income") {
      //DESCOMENTAR PARA CHAMAR O EVENTO DE FILTRAGE,
      // this._filetInComeProduct();
      def.textContent = target.textContent;
    }
  }
  // CLASSFICAR POR DATA
  _sortByDate() {
    //PEGAR OS DADOS REAIS E REALIZAR A FILTRAGEM
    // const sorted = appData.registerInOutProducts.sort(
    //   (a, b) => new Date(a.date) - new Date(b.date)
    // );

    this._pagination(sorted);
  }

  // CLASSFICAR POR ESTOQUE
  _sortByStock() {
    //PEGAR OS DADOS REAIS E REALIZAR A FILTRAGEM

    // const sorted = appData.registerInOutProducts.sort(
    //   (a, b) => a.quantity - b.quantity
    // );
    this._pagination(sorted);
  }
  // FILTRAR ENTRADAS
  _filetInComeProduct() {
    //PEGAR OS DADOS REAIS E REALIZAR A FILTRAGEM
    // const sorted = appData.registerInOutProducts.filter(
    //   (item) => item.type === "entrada"
    // );
    this._pagination(sorted);
  }

  // FILTRAR SAIDAS
  _filetOutComeProduct() {
    //PEGAR OS DADOS REAIS E REALIZAR A FILTRAGEM
    // const sorted = appData.registerInOutProducts.filter(
    //   (item) => item.type === "saída"
    // );
    this._pagination(sorted);
  }

  // FUNÇÃO PARA PESQUISAR NA LISTA
  _serachInOutList() {
    //PEGANDO O VALOR DO INPUT
    const value = this.historyInputSearch.value.toLowerCase();

    //PEGAR OS DADOS REAIS E REALIZAR A FILTRAGEM
    // const filtered = appData.registerInOutProducts.filter((item) =>
    //   item.name.toLocaleLowerCase().startsWith(value)
    // );
    this._pagination(filtered);
  }

  // PAGINAÇÃO DA LISTA
  _pagination(productList) {
    if (!this.totalPagesLabel) return;
    this.productList = productList;
    // MARCAR O NÚMERO DE ELEMTNO POR PÁGINA
    this.productsPerPage = 7;
    this.currentPage = 1;
    this.totalPages = Math.ceil(productList.length / this.productsPerPage);
    this.totalPagesLabel.textContent = `${this.totalPages
      .toString()
      .padStart(2, 0)}`;
    this.renderCurrentPage(this.currentPage, productList);
  }

  // PRODUCTOS A SER RENDERIZADOS
  renderPage(page, list) {
    this.startIndex = (page - 1) * this.productsPerPage;
    this.endIndex = this.startIndex + this.productsPerPage;

    //LISTA A SER RENDERIZADA
    this.productsToRender = list.slice(this.startIndex, this.endIndex);
  }
  renderCurrentPage(currentPage, list) {
    this.renderPage(currentPage, list);
  }

  // IR A PROXIMA PAGINA
  goToPreviousPage = function () {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderCurrentPage(this.currentPage, this.productList);
    }
    this.curPagelabel.textContent = this.currentPage;
  };

  // IR A PÁGINA ANTERIOR
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderCurrentPage(this.currentPage, this.productList);
    }
    this.curPagelabel.textContent = this.currentPage;
  }

  // TODOS OS EVENTLISTENERS
  _allEventListeners() {
    this.sorContainer?.addEventListener(
      "click",
      this._sortProductList.bind(this)
    );

    this.productInOUtHistory?.addEventListener(
      "click",
      this._showProductHistDetail.bind(this)
    );

    this.historicDetailContainer?.addEventListener(
      "click",
      this._closeHistoricDetail.bind(this)
    );
    this.btnNextPage?.addEventListener("click", this.goToNextPage.bind(this));
    this.btnPevPage?.addEventListener(
      "click",
      this.goToPreviousPage.bind(this)
    );
    this.historyInputSearch?.addEventListener(
      "input",
      this._serachInOutList.bind(this)
    );
  }

  // FUNCÇÕES AUTOINICIALIZADAS
  _init() {
    //DESCOMENTAR E INICIAR A PAGINAÇÃO DO DADOS REAIS
    // this._pagination(appData.registerInOutProducts);
  }
}
const newStock = new StockApp();
export { newStock };
