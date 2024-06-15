// REFACTORING THE CODE

// import { appData } from "./data.js";
// import { formatNumbers } from "./views/formatNumbers.js";

class VendasApp {
  sellCart = [];

  constructor() {
    //SELECIONANDO AS VARIÁVEIS
    this.sellDetailContainer = document.querySelector(".section-sell-ditails");
    this.newSellFormContainer = document.querySelector(".section-new-sell");
    this.btnShowNewSellForm = document.querySelector(".btn-add-new-sell");
    this.btnCloseSellFormContainer = document.querySelector(
      ".btn-close-sell-form"
    );
    this.btnCloseSellDetail = document.querySelector(".btn-close-sell-details");
    this.btnHideSingleDetail = document.querySelectorAll(".hide-dett");

    this.selectProductInput = document.querySelector(".select-product-input");
    this.miniProductList = document.querySelector(".product-list-select");
    this.sellHistoryContainer = document.querySelector(".sell-history");
    this.miniListItem = document.querySelectorAll(".product-item-select");

    this.searchSellList = document.querySelector(".search-input-sell");
    this.totalPagesLabel = document.querySelector(".sell-total-page");
    this.btnNextPage = document.querySelector(".btn-next-page-sell");
    this.btnPevPage = document.querySelector(".btn-previous-page-sell");
    this.curPagelabel = document.querySelector(".curr-page-number-sell");
    this.sellSortList = document.querySelector(".sell-sort-list");
    this.sellContainerList = document.querySelector(".sell-container-list");

    this.selectedProductQty = document.querySelector(".product-quantity-input");
    this.btnAddProductCart = document.querySelector(".btn-add-product-cart");
    this.miniList = document.querySelector(
      ".product-list-select .mini-product-list"
    );
    this.carListContainer = document.querySelector(".added-cart-list");
    // this.btnRemoveProductTocart

    this.selectClientInput = document.querySelector(".select-client-input");
    this.miniClientContainer = document.querySelector(
      ".mini-client-list-container"
    );
    this.miniClientList = document.querySelector(".mini-client-list");
    this.alertSellContainer = document.querySelector(".sell-succes-alert");
    this.btnConfirmSell = document.querySelector(".btn-confirm-sell");

    this.init();
  }

  // MOSTRAR DETALHES DA VENDA
  _showsellDetail(e) {
    const target = e.target.closest(".sell-box");
    if (!target) return;
    this.sellID = target.dataset.id;
    this.sellDetailContainer.classList.remove("hidden");
    this.sellDetailContainer.classList.remove("hide-detail");
    this.newSellFormContainer.classList.add("hidden");
    // this._settingDetailSellContent(this.sellID);
  }

  // MOSTRAR O FORMULÁRIO PARA REALIZAR NOVA VEDA
  _showNewSellFunction() {
    this.sellDetailContainer.classList.add("hidden");
    this.newSellFormContainer.classList.remove("hidden");
  }
  // CHECHAR O FORMULÁRIO DE NOVA VENDA
  _closeSellFormFunction(e) {
    const target = e.target;
    if (target.classList.contains("overlay-new-sell-form")) {
      this.sellDetailContainer.classList.remove("hidden");
      this.sellDetailContainer.classList.add("hide-detail");
      this.newSellFormContainer.classList.add("hidden");
    }
    if (target.closest(".btn-close-sell-form")) {
      this.sellDetailContainer.classList.remove("hidden");
      this.sellDetailContainer.classList.add("hide-detail");
      this.newSellFormContainer.classList.add("hidden");
    }
  }
  // FECHAR O DETALHE VENDA NO MOBILE
  _closeSellDetailFunction(e) {
    const target = e.target;
    if (target.classList.contains("overlay-sell-detail"))
      this.sellDetailContainer?.classList.add("hidden");
    if (target.closest(".btn-close-sell-details"))
      this.sellDetailContainer?.classList.add("hidden");
  }

  // FECHAR SESSÕES DO DETALHE [DETALHES DA VENDA, DETALHES DO PRODUCTO, INFOMAÇÃO DO CLIENE...]
  _hideSingleDetailFunction(btn) {
    btn.addEventListener("click", function (e) {
      this.name = btn.dataset.class;
      this.target = document.querySelector(`.${this.name}`);
      this.target.classList.toggle("hidden");
    });
  }

  // FUNÇÃO PARA MOSTRAR A MINI LISTA DE PRODUCTOS NO INPUT PARA
  _selectProductFunction() {
    this.miniProductList.classList.remove("hidden");
  }

  // FECHAR A MINI LISTA DE PRODUCTOS AO SELECIONAR UM PRODUCTO
  _hideMiniList(e) {
    const target = e.target.closest(".product-item-select");
    if (!target) return;
    this.miniProductList.classList.add("hidden");
  }

  // FILTRAR OS PRODUCTOS AO DIGITAR O NOME NO INPUT PARA SELECIONAR O PRODUCTO
  _filterMiniListProduct() {
    const value = this.selectProductInput.value.toLowerCase();
    //DESCOMENTAR E RENDERIZAR COM DADOS REAIS
    // const filtered = appData.products.filter((item) =>
    //   item.name.toLocaleLowerCase().startsWith(value)
    // );
    // this._renderMiniProductList(filtered);
  }

  // FUNÇÃO PARA ADICIONAR PRODUCTO NO CARRINHO
  _addProductToCart(e) {
    e.preventDefault();

    //DESCOMENTAR PARA FUNCIONALIDADE DE ADICIONAR PRODUCO NO CARRINHO E RENDERIZAR
    // if (this.selectProductInput.value && this.selectedProductQty.value) {
    //   const item = {
    //     productId: this.selectedItem.id,
    //     quantity: this.selectedProductQty.value,
    //   };

    //   this.sellCart.push(item);
    //   this._renderAddedProduct(this.sellCart);
    //   this.selectProductInput.value = this.selectedProductQty.value = "";
    // } else alert("Preencha os campos");
  }

  // REMOVER PRODUCTO DA LISTA
  _removeProductToCart(e) {
    //DESCOMENTAR PARA A FUNCIONALIDADE DE REMOVER PRODUCTO NO CARRINHO
    // const target = e.target.closest(".remove-item-to-cart");
    // if (!target) return;
    // const id = +target.closest(".cart-item").dataset.id;
    // console.log(id);
    // const index = this.sellCart.findIndex((item) => item.productId === id);
    // this.sellCart.splice(index, 1);
    // this._renderAddedProduct(this.sellCart);
  }

  //DECOMENNTAR PARA A RENDERIZAÇÃO DE PRODUCTOS NO CARRINHO
  // RENDRIZAR OS PRODUCTOS SELECIONADOS
  // _renderAddedProduct(list) {
  //   if (!this.carListContainer) return;
  //   this.carListContainer.innerHTML = "";

  //   if (!this.carListContainer) return;
  //   if (list.length === 0) {
  //     this.carListContainer.innerHTML = "";
  //     const html = `
  //     <span class="empty-list">Nenhum producto adicionado</span>`;
  //     this.carListContainer.insertAdjacentHTML("afterbegin", html);
  //   }

  //   if (list.length > 0) {
  //     list.forEach((item) => {
  //       const product = appData.products.find(
  //         (ite) => ite.id === item.productId
  //       );

  //       const html = `
  //      <li class="cart-item" data-id="${product.id}">
  //      <div class="added-product">
  //        <span>${product.name} </span>
  //        <span class="added-product-name">${formatNumbers.formatCurrency(
  //          product.price
  //        )}</span>
  //      </div>
  //      <span class="remove-item-to-cart"><ion-icon
  //      name="trash-outline"></ion-icon></span>
  //      <div class="added-product">
  //        <span>${item.quantity}</span>
  //        <span class="added-product-name">${formatNumbers.formatCurrency(
  //          item.quantity * product.price
  //        )}</span>
  //      </div>
  //       </li>
  //     `;

  //       this.carListContainer.insertAdjacentHTML("afterbegin", html);
  //     });
  //   }
  // }

  // MOSTRAR A MINI LISTA DE CLIENTE A SER SELECIONADO
  _showMiniClientList() {
    this.miniClientContainer.classList.remove("hidden");
  }
  // SELECIONANDO O CLIENTE
  _selectClient(e) {
    e.preventDefault();
    if (e.target.closest(".btn-add-client")) {
      this.miniClientContainer.classList.add("hidden");
      this._newClientAdded();
    }
    const target = e.target.closest("li");
    if (!target) return;
    //DECOMENTAR PARA ENCONTRAR CLIENTE COM DADOS REAIS
    // const dataset = appData.clients.find((c) => c.id === +target.dataset.id);
    // this.selectClientInput.value = dataset.name;
    this.miniClientContainer.classList.add("hidden");
  }
  // SE O CLIENTE NÃO FOR ENCONTRADO NA LISTA ADICIONAR A LISTA
  _newClientAdded() {
    this.alertSellContainer.classList.remove("hidden");
    const alertText = document.querySelector(".alert-sell-text");
    alertText.textContent = "Cliente adicionado com sucesso";
  }

  // FILTRAR A LISTA DE CLIENTES AO DIGITAR O NOME NO INPUT
  _filterMiniClient() {
    //PEGANDO O VALOR DO INPUT
    const value = this.selectClientInput.value.toLowerCase();
    //DESCOMENTAR PARA A FILTRAGEM NA MINI LISTA DE CLIENTES
    // const filtered = appData.clients.filter((item) =>
    //   item.name.toLowerCase().startsWith(value)
    // );

    // this._renderMiniClientList(filtered);
  }

  // CONFIGURAR OS CONTENT DE DETALHES DA VENDA COM BASE O ID DO PRODUCTO
  _settingDetailSellContent(id) {
    // DESCOMENTAR E RENDERIZAR COM PRODUCTOS REAIS
    // const currentSell = appData.sales.find((item) => item.id === +id);
    const invoiceHeaderLabel = document.querySelector(
      ".invoice-number-label-header"
    );
    if (!invoiceHeaderLabel) return;

    const sellSatusLabel = document.querySelector(".single-status");
    const invoiceNumberLabel = document.querySelector(
      ".current-sell-invoice-number"
    );

    const sellDate = document.querySelector(".current-sell-date");
    const costumerName = document.querySelector(".costumer-name");
    const costumerEmail = document.querySelector(".costumer-email");
    const payType = document.querySelector(".payment-type");
    const totalAmount = document.querySelector(".total-sell");
    const itemListContainer = document.querySelector(".sell-item-list");

    //SETTING CONTENT

    invoiceHeaderLabel.textContent = currentSell.invoice.id;
    sellSatusLabel.textContent =
      currentSell.status === "pending" ? "Pendente" : "Sucesso";

    sellSatusLabel.classList.add(
      `${currentSell.status === "success" ? "success" : "pending"}-payment`
    );

    invoiceNumberLabel.textContent = currentSell.invoice.id;
    sellDate.textContent = formatNumbers.formatDates(
      new Date(currentSell.date)
    );
    const client = appData.clients.find((cl) => cl.id === currentSell.clientId);
    costumerName.textContent = client.name;
    costumerEmail.textContent = client.email;
    payType.textContent = currentSell.paymentType;

    totalAmount.textContent = formatNumbers.formatCurrency(
      currentSell.totalAmount
    );

    //DESCOMENTAR PARA RENDRIZAR A LISTA DE PRODUCTOS VENDIDOS
    // RENDERIZAR OS PRODUCTOS DA VENDA
    // const renderSellItem = function (list) {
    //   itemListContainer.innerHTML = "";

    //   list.forEach((item, i) => {
    //     const product = appData.products.find((p) => p.id === item.productId);

    //     const html = `
    //   <div class="details-flex-box">
    //      <span>Producto ${i + 1}</span>
    //            <span class="costumer">${product.name}</span>
    //        </div>
    //        <ul class="product-description-list">
    //            <li><span>Preço unitário</span> <span class="selled-product-price costumer">${formatNumbers.formatCurrency(
    //              item.price
    //            )}</span></li>
    //            <li><span>Quantidade</span> <span class="selled-product-price costumer">${
    //              item.quantity
    //            }</span>
    //            </li>
    //        </ul>
    //   `;

    //     itemListContainer.insertAdjacentHTML("afterbegin", html);
    //   });
    // };
    // renderSellItem(currentSell.items);
  }

  // CONFIRMAR VENDA
  _confirmSell(e) {
    e.preventDefault();
    this.alertSellContainer.classList.remove("hidden");
    const alertText = document.querySelector(".alert-sell-text");
    alertText.textContent = "Venda realizada com sucesso";
  }

  // GUARDAR O ALERTA DE REALIZAÇÃO DE VENDA
  _hideSellAlert(e) {
    const target = e.target;
    if (target.closest(".sell-overlay"))
      this.alertSellContainer.classList.add("hidden");
    if (target.closest(".btn-ok-alert"))
      this.alertSellContainer.classList.add("hidden");
  }

  //CLASSIFICAR A LISTA DE VENDAS
  _sortSellList(e) {
    const target = e.target.closest("span");
    const def = document.querySelector(".default");

    if (!target) return;

    if (target.className === "date") {
      this._sortByDate();
      def.textContent = target.textContent;
    }

    if (target.className === "amount") {
      this._sortByAmount();
      def.textContent = target.textContent;
    }

    if (target.className === "success") {
      this._sortBySuccess();
      def.textContent = target.textContent;
    }

    if (target.className === "pending") {
      this._sortByPending();
      def.textContent = target.textContent;
    }
  }

  // CLASSIFICAR PELA DATA
  _sortByDate() {
    const sorted = appData.sales.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    this._pagination(sorted);
    console.log(sorted);
  }

  // CLASSIFICAR POR QUANTIDADE
  _sortByAmount() {
    const sorted = appData.sales.sort(
      (a, b) => new Date(a.totalAmount) - new Date(b.totalAmount)
    );
    this._pagination(sorted);
  }

  // FILTRAR VENDAS COM STATUS DE SUCESSO
  _sortBySuccess() {
    const sorted = appData.sales.filter((item) => item.status === "success");
    this._pagination(sorted);
  }

  // FILTRAR OS PENDENTES
  _sortByPending() {
    const sorted = appData.sales.filter((item) => item.status === "pending");
    this._pagination(sorted);
  }

  //PESQUISAR NA LISTA DE VENDAS
  _searchSell() {
    //PEGANDO O VALUE DO INPUT

    const value = this.searchSellList.value.toLowerCase();
    //DESCOMENTAR PARA PEGAR DADOS REAIS E FILTRAR
    // const filtered = appData.sales.filter((item) =>
    //   item.invoice.id.toLocaleLowerCase().startsWith(value)
    // );
    // this._pagination(filtered);
  }

  //PAGINAÇÃO
  _pagination(productList) {
    if (!this.totalPagesLabel) return;
    this.productList = productList;
    this.productsPerPage = 8;
    this.currentPage = 1;
    this.totalPages = Math.ceil(productList.length / this.productsPerPage);
    this.totalPagesLabel.textContent = `${this.totalPages
      .toString()
      .padStart(2, 0)}`;

    this.renderCurrentPage(this.currentPage, productList);
  }

  // LISTA A SER RENDERIZADO
  renderPage(page, list) {
    this.startIndex = (page - 1) * this.productsPerPage;
    this.endIndex = this.startIndex + this.productsPerPage;
    this.productsToRender = list.slice(this.startIndex, this.endIndex);
    // this._renderSaleList(this.productsToRender);
  }

  renderCurrentPage(currentPage, list) {
    this.renderPage(currentPage, list);
  }

  goToPreviousPage = function () {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderCurrentPage(this.currentPage, this.productList);
    }
    this.curPagelabel.textContent = this.currentPage;
  };

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderCurrentPage(this.currentPage, this.productList);
    }
    this.curPagelabel.textContent = this.currentPage;
  }

  // TODOS OS EVENT LISTENERS
  _eventListeners() {
    this.sellDetailContainer?.addEventListener(
      "click",
      this._closeSellDetailFunction.bind(this)
    );
    this.selectClientInput?.addEventListener(
      "click",
      this._showMiniClientList.bind(this)
    );
    this.selectClientInput?.addEventListener(
      "input",
      this._filterMiniClient.bind(this)
    );
    this.miniClientList?.addEventListener(
      "click",
      this._selectClient.bind(this)
    );

    this.searchSellList?.addEventListener("input", this._searchSell.bind(this));
    this.miniList?.addEventListener("click", this._hideMiniList.bind(this));
    this.selectProductInput?.addEventListener(
      "input",
      this._filterMiniListProduct.bind(this)
    );
    //event para adicionar producto no carrinho
    this.btnAddProductCart?.addEventListener(
      "click",
      this._addProductToCart.bind(this)
    );
    this.carListContainer?.addEventListener(
      "click",
      this._removeProductToCart.bind(this)
    );
    //event para mostrar o formulário de venda
    this.btnShowNewSellForm?.addEventListener(
      "click",
      this._showNewSellFunction.bind(this)
    );
    this.sellHistoryContainer?.addEventListener(
      "click",
      this._showsellDetail.bind(this)
    );
    // event para fechar o formulário de venda
    this.newSellFormContainer?.addEventListener(
      "click",
      this._closeSellFormFunction.bind(this)
    );
    //event para fechar o seção de detalhe da venda [Detalhes venda, Detalhes Producto]
    this.btnHideSingleDetail?.forEach(
      this._hideSingleDetailFunction.bind(this)
    );
    //event para selecionaro o producto
    this.selectProductInput?.addEventListener(
      "click",
      this._selectProductFunction.bind(this)
    );

    // botoões da paginação
    this.btnNextPage?.addEventListener("click", this.goToNextPage.bind(this));
    this.btnPevPage?.addEventListener(
      "click",
      this.goToPreviousPage.bind(this)
    );
    this.sellSortList?.addEventListener("click", this._sortSellList.bind(this));
    // botão para confirmar a venda ou realizar venda
    this.btnConfirmSell?.addEventListener(
      "click",
      this._confirmSell.bind(this)
    );
    // event para fechar o popup da venda
    this.alertSellContainer?.addEventListener(
      "click",
      this._hideSellAlert.bind(this)
    );
  }

  // INICIALIZADOR
  init() {
    // this._pagination(appData.sales);
    this._eventListeners();
    // this._settingDetailSellContent(appData.sales.slice(-1)[0].id);
  }
}
const sellApp = new VendasApp();

export { sellApp };
