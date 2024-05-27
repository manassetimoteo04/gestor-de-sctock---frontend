// REFACTORING THE CODE

import { appData } from "./data.js";
import { formatNumbers } from "./views/formatNumbers.js";

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

    this.selectClientInput = document.querySelector(".select-client-input");
    this.miniClientContainer = document.querySelector(
      ".mini-client-list-container"
    );
    this.miniClientList = document.querySelector(".mini-client-list");
    this.alertSellContainer = document.querySelector(".sell-succes-alert");
    this.btnConfirmSell = document.querySelector(".btn-confirm-sell");

    this.init();
  }

  _showsellDetail(e) {
    const target = e.target.closest(".sell-box");
    if (!target) return;
    this.sellID = target.dataset.id;
    console.log(this.sellID);
    this.sellDetailContainer.classList.remove("hidden");
    this.sellDetailContainer.classList.remove("hide-detail");
    this.newSellFormContainer.classList.add("hidden");
    this._settingDetailSellContent(this.sellID);
  }

  _showNewSellFunction() {
    this.sellDetailContainer.classList.add("hidden");
    this.newSellFormContainer.classList.remove("hidden");
  }

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

  _closeSellDetailFunction(e) {
    const target = e.target;
    if (target.classList.contains("overlay-sell-detail"))
      this.sellDetailContainer?.classList.add("hidden");
    if (target.closest(".btn-close-sell-details"))
      this.sellDetailContainer?.classList.add("hidden");
  }

  _hideSingleDetailFunction(btn) {
    btn.addEventListener("click", function (e) {
      this.name = btn.dataset.class;
      this.target = document.querySelector(`.${this.name}`);
      this.target.classList.toggle("hidden");
    });
  }

  _selectProductFunction() {
    this.miniProductList.classList.remove("hidden");
  }

  _miniListItemFunction(t) {
    this.miniListItem?.forEach(function (item) {
      item.addEventListener("click", function () {
        t.miniProductList.classList.add("hidden");
      });
    });
  }

  _hideMiniList(e) {
    const target = e.target.closest(".product-item-select");
    if (!target) return;
    const id = target.dataset.id;
    this.selectedItem = appData.products.find((i) => i.id === +id);
    this.selectProductInput.value = this.selectedItem.name;
    this.miniProductList.classList.add("hidden");
  }

  _filterMiniListProduct() {
    const value = this.selectProductInput.value.toLowerCase();
    const filtered = appData.products.filter((item) =>
      item.name.toLocaleLowerCase().startsWith(value)
    );
    this._renderMiniProductList(filtered);
  }

  _renderMiniProductList(list) {
    if (!this.miniList) return;

    if (list.length === 0) {
      this.miniList.innerHTML = "";

      const markup = `
    <span class="empty-list">Nenhum producto</span>`;
      this.miniList.insertAdjacentHTML("afterbegin", markup);
    }

    if (list.length > 0) {
      this.miniList.innerHTML = "";

      list.forEach((item) => {
        const html = `
      <li class="product-item-select" data-id="${item.id} ">
          <span class="product-item-name">${item.name} </span>
                <span class="product-item-quantity">${item.stock}</span>
            </li>
      `;
        this.miniList.insertAdjacentHTML("afterbegin", html);
      });
    }
  }

  _addProductToCart(e) {
    e.preventDefault();
    if (this.selectProductInput.value && this.selectedProductQty.value) {
      const item = {
        productId: this.selectedItem.id,
        quantity: this.selectedProductQty.value,
      };

      this.sellCart.push(item);
      this._renderAddedProduct(this.sellCart);
      this.selectProductInput.value = this.selectedProductQty.value = "";
    } else alert("Preencha os campos");
  }

  _renderAddedProduct(list) {
    this.carListContainer = document.querySelector(".added-cart-list");
    if (!this.carListContainer) return;
    this.carListContainer.innerHTML = "";

    if (!this.carListContainer) return;
    if (list.length === 0) {
      this.carListContainer.innerHTML = "";
      const html = `
      <span class="empty-list">Nenhum producto adicionado</span>`;
      this.carListContainer.insertAdjacentHTML("afterbegin", html);
    }

    if (list.length > 0) {
      list.forEach((item) => {
        const product = appData.products.find(
          (ite) => ite.id === item.productId
        );

        const html = `
       <li class="cart-item">
       <div class="added-product">
         <span>${product.name} </span>
         <span class="added-product-name">${formatNumbers.formatCurrency(
           product.price
         )}</span>
       </div>
       <div class="added-product">
         <span>${item.quantity}</span>
         <span class="added-product-name">${formatNumbers.formatCurrency(
           item.quantity * product.price
         )}</span>
       </div>
        </li>
      `;

        this.carListContainer.insertAdjacentHTML("afterbegin", html);
      });
    }
  }

  _showMiniClientList() {
    this.miniClientContainer.classList.remove("hidden");
  }

  _selectClient(e) {
    e.preventDefault();
    if (e.target.closest(".btn-add-client")) {
      this.miniClientContainer.classList.add("hidden");
      this._newClientAdded();
    }
    const target = e.target.closest("li");
    if (!target) return;

    const dataset = appData.clients.find((c) => c.id === +target.dataset.id);
    this.selectClientInput.value = dataset.name;
    this.miniClientContainer.classList.add("hidden");
    c(e.target);
  }
  _newClientAdded() {
    this.alertSellContainer.classList.remove("hidden");
    const alertText = document.querySelector(".alert-sell-text");
    alertText.textContent = "Cliente adicionado com sucesso";
  }

  _renderMiniClientList(arr) {
    if (!this.miniClientList) return;

    if (arr.length === 0) {
      this.miniClientList.innerHTML = "";
      const html = `
      <div class="unknown-client">
       <span>Não encontrado</span>
              <button class="btn-add-client">Adicionar</button>
          </div>`;
      this.miniClientList.insertAdjacentHTML("afterbegin", html);
      c(arr);
    }
    if (arr.length > 0) {
      this.miniClientList.innerHTML = "";
      arr.forEach((client) => {
        const html = `
      <li data-id="${client.id} ">
      <span class="client-name">${client.name}</span><span>${client.purchaseHistory.length}</span>
      </li>`;

        this.miniClientList.insertAdjacentHTML("afterbegin", html);
      });
    }
  }

  _filterMiniClient() {
    const value = this.selectClientInput.value.toLowerCase();
    const filtered = appData.clients.filter((item) =>
      item.name.toLowerCase().startsWith(value)
    );

    this._renderMiniClientList(filtered);
  }

  _settingDetailSellContent(id) {
    const currentSell = appData.sales.find((item) => item.id === +id);
    console.log(currentSell);
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

    const renderSellItem = function (list) {
      itemListContainer.innerHTML = "";

      list.forEach((item, i) => {
        const product = appData.products.find((p) => p.id === item.productId);

        const html = `
      <div class="details-flex-box">
         <span>Producto ${i + 1}</span>
               <span class="costumer">${product.name}</span>
           </div>
           <ul class="product-description-list">
               <li><span>Preço unitário</span> <span class="selled-product-price costumer">${formatNumbers.formatCurrency(
                 item.price
               )}</span></li>
               <li><span>Quantidade</span> <span class="selled-product-price costumer">${
                 item.quantity
               }</span>
               </li>
           </ul>
      `;

        itemListContainer.insertAdjacentHTML("afterbegin", html);
      });
    };

    renderSellItem(currentSell.items);
  }
  _confirmSell() {
    this.alertSellContainer.classList.remove("hidden");
    const alertText = document.querySelector(".alert-sell-text");
    alertText.textContent = "Venda realizada com sucesso";
  }
  _hideSellAlert(e) {
    const target = e.target;
    if (target.closest(".sell-overlay"))
      this.alertSellContainer.classList.add("hidden");
    if (target.closest(".btn-ok-alert"))
      this.alertSellContainer.classList.add("hidden");
  }
  _renderSaleList(arr) {
    if (arr.length === 0) {
      if (this.sellContainerList) this.sellContainerList.innerHTML = "";

      const emptyList = `
      <div class="empty-product">
      <p>Nenhum registro encontrado</p>
     </div>
      `;

      if (this.sellContainerList)
        this.sellContainerList.insertAdjacentHTML("afterbegin", emptyList);
    }
    if (arr.length > 0)
      if (this.sellContainerList) this.sellContainerList.innerHTML = "";
    arr.forEach((item) => {
      const html = `
      <div class="sell-box" data-id="${item.id} ">
      <div>
          <span class="sell-icon"><ion-icon
                  name="swap-horizontal-outline"></ion-icon></span>
          <div class="sell-product-description">
              <span class="invoice-number">${item.invoice.id} </span>
          </div>
      </div>
      <span class="selled-roduct-price">${formatNumbers.formatCurrency(
        item.totalAmount
      )} </span>
      <span class="selled-product-date">${formatNumbers.formatDates(
        new Date(item.date)
      )} </span>
      <span class="selled-product-status ${item.status}-payment"> ${
        item.status === "success" ? "Sucesso" : "Pendente"
      }</span>
      <span class="selled-product-costumer">${
        appData.clients.find((cl) => cl.id === item.clientId).name
      }</span>

  </div>
        `;

      if (this.sellContainerList)
        this.sellContainerList.insertAdjacentHTML("afterbegin", html);
    });
  }

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

  _sortByDate() {
    const sorted = appData.sales.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    this._pagination(sorted);
    console.log(sorted);
  }

  _sortByAmount() {
    const sorted = appData.sales.sort(
      (a, b) => new Date(a.totalAmount) - new Date(b.totalAmount)
    );
    this._pagination(sorted);
  }

  _sortBySuccess() {
    const sorted = appData.sales.filter((item) => item.status === "success");
    this._pagination(sorted);
  }

  _sortByPending() {
    const sorted = appData.sales.filter((item) => item.status === "pending");
    this._pagination(sorted);
  }

  //SEACRH SELL

  _searchSell() {
    const value = this.searchSellList.value.toLowerCase();
    console.log(value);
    const filtered = appData.sales.filter((item) =>
      item.invoice.id.toLocaleLowerCase().startsWith(value)
    );
    this._pagination(filtered);
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

  renderPage(page, list) {
    this.startIndex = (page - 1) * this.productsPerPage;
    this.endIndex = this.startIndex + this.productsPerPage;
    this.productsToRender = list.slice(this.startIndex, this.endIndex);
    this._renderSaleList(this.productsToRender);
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
    this.btnAddProductCart?.addEventListener(
      "click",
      this._addProductToCart.bind(this)
    );
    this.btnShowNewSellForm?.addEventListener(
      "click",
      this._showNewSellFunction.bind(this)
    );
    this.sellHistoryContainer?.addEventListener(
      "click",
      this._showsellDetail.bind(this)
    );
    // this.btnCloseSellFormContainer?.addEventListener(
    //   "click",
    //   this._closeSellFormFunction.bind(this)
    // );
    this.newSellFormContainer?.addEventListener(
      "click",
      this._closeSellFormFunction.bind(this)
    );
    // this.btnCloseSellDetail?.addEventListener(
    //   "click",
    //   this._closeSellDetailFunction.bind(this)
    // );
    this.btnHideSingleDetail?.forEach(
      this._hideSingleDetailFunction.bind(this)
    );

    this.selectProductInput?.addEventListener(
      "click",
      this._selectProductFunction.bind(this)
    );
    this.btnNextPage?.addEventListener("click", this.goToNextPage.bind(this));
    this.btnPevPage?.addEventListener(
      "click",
      this.goToPreviousPage.bind(this)
    );
    this.sellSortList?.addEventListener("click", this._sortSellList.bind(this));

    this.btnConfirmSell?.addEventListener(
      "click",
      this._confirmSell.bind(this)
    );
    this.alertSellContainer?.addEventListener(
      "click",
      this._hideSellAlert.bind(this)
    );
  }
  init() {
    this._miniListItemFunction(this);
    this._pagination(appData.sales);
    this._renderMiniProductList(appData.products);
    this._eventListeners();
    this._renderMiniClientList(appData.clients);
    this._renderAddedProduct([]);
    this._settingDetailSellContent(appData.sales.slice(-1)[0].id);
  }
}
const sellApp = new VendasApp();

export { sellApp };
