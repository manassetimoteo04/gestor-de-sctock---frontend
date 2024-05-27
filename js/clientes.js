// REFACTORING THE CODE
const c = console.log.bind(document);

import { appData } from "./data.js";
import { formatNumbers } from "./views/formatNumbers.js";

class ClientApp {
  _currentClientDetail;
  constructor() {
    // SELECIONANDO AS VARIÁVEIS PARA MANIPULAÇÃO DO DOM

    // VARIÁVEIR DO RESUMO OU SUMMARY
    this.totalClientNumberLabel = document.querySelector(".total-client");
    this.totalNewClientLabel = document.querySelector(".total-new-client");
    this.totalActiveClient = document.querySelector(".total-active-client");

    this.actionClientBtns = document.querySelector(".action-client-btns");
    this.clientListContainer = document.querySelector(".client-container");
    this.clientDetailContainer = document.querySelector(
      ".section__client-details"
    );

    this.btnBackToClientList = document.querySelector(
      ".btn-back-to-client-list"
    );
    this.btnCloseBuyDetail = document.querySelector(".btn-close-buy-detail");
    this.clientBuyDetailContainer = document.querySelector(
      ".client-buy-detail-container"
    );
    this.clientHistoryContainer = document.querySelector(".client-history");
    this.clientBuyDetail = document.querySelector(
      ".client-buy-detail-container"
    );
    this.clientMenuList = document.querySelector(".client-menu");

    this.clientInformationBox = document.querySelector(
      ".client-information-box"
    );
    this.clientListHistoryBox = document.querySelector(".client-list-history");
    this.btnCloseAddClientForm = document.querySelector(
      ".close-form-new-client"
    );
    this.newClientFormContainer = document.querySelector(
      ".add-new-client-container"
    );
    this.btnShowNewClientForm = document.querySelector(".btn-add-client");
    this.clientContainerList = document.querySelector(".client-list-container");

    this.totalPagesLabel = document.querySelector(".total-pages-client");
    this.curPagelabel = document.querySelector(".curr-page-number-client");
    this.btnPaginationClient = document.querySelector(".pagination-client");
    this.purchaseBtnsPage = document.querySelector(".purchase-btns-page");
    this.inputSearchClient = document.querySelector(".search-input-client");
    this.sortContainer = document.querySelector(".sort-by");

    this.clientPurchaseContainer = document.querySelector(
      ".client-purchase-list"
    );
    this.inputSearchPuchaseList = document.querySelector(
      ".search-input-client-purchase"
    );
    this.purchaseSortContainer = document.querySelector(".purchase-sort-by");
    this.totalPurchasePages = document.querySelector(".total-pages-purchases");
    this.currentPurchasePage = document.querySelector(".current-page-purchase");

    this.alertDeleteUser = document.querySelector(".delete-user-alert");
    this.btnDeleteCurrentCostumer =
      document.querySelector(".btn-delete-client");

    // INICIALIZADORES
    this._eventListeners();
    this._init();
  }

  // RENDERIZAR OS SUMMARY
  _renderSummary() {
    if (!this.totalClientNumberLabel) return;
    const actives = appData.clients.filter((cl) => cl.status === "active");
    this.totalClientNumberLabel.textContent = appData.clients.length;
    this.totalActiveClient.textContent = actives.length;
  }

  // FUNCÇÕES DOS EVENT LISTENERS
  _closeBuyDetail(e) {
    const target = e.target;
    if (target.classList.contains("overlay-buy-detail"))
      this.clientBuyDetailContainer?.classList.add("hidden");
    if (target.closest(".btn-close-buy-detail"))
      this.clientBuyDetailContainer?.classList.add("hidden");
  }

  _showBuyDetail(e) {
    const target = e.target.closest(".btn-see-buy-detail");
    if (!target) return;

    this.clientBuyDetailContainer?.classList.remove("hidden");
    const buy = target.closest(".client-history");
    const buyID = +buy.dataset.id;
    this._settingPurchaseDetailContent(buyID);
  }

  // ACÇÕES NO BOTÃO DE EVENTOS NA LISTA DOS CLIENTES, [EDIT, DELETE, SEE-DETAIL]
  _actionClient(e) {
    const target = e.target.closest("button");
    // const target = e.target.closest(".btn-details-user");
    // const target2 = e.target.closest(".btn-details-user");

    if (target.classList.contains("btn-details-user")) {
      const clientBox = target.closest(".client-box");
      const clientID = +clientBox.dataset.id;
      this._currentClientDetail = appData.clients.find(
        (cl) => cl.id === clientID
      );
      this._settingClientContentDetail();
      this._pagination(this._currentClientDetail.purchaseHistory);
      this.clientListContainer.classList.add("hidden");
      this.clientDetailContainer.classList.remove("hidden");
    }
    if (target.classList.contains("btn-delete-user")) {
      this._deleteClientShowPopUp();
    }
    if (target.classList.contains("btn-edit-user")) {
      // this._settingEditClientValues();
      this._showNewClientForm();
      const costumerId = +target.closest(".client-box").dataset.id;
      this._settinClientEditValue(costumerId);
    }
  }

  // CONFIGURAR OS VALUES NOS INPUTS AO EDITAR O CLIENTE
  _settinClientEditValue(id) {
    const currentCostumer = appData.clients.find((cl) => cl.id === id);
    console.log(currentCostumer);
    const inputClientName = document.querySelector(".input-client-name");
    const inputClientEmail = document.querySelector(".input-client-email");
    const inputClientPhone = document.querySelector(".input-client-phone");
    const inputClientAdress = document.querySelector(".input-client-address");
    const inputClientDescription = document.querySelector(
      ".input-client-description"
    );

    inputClientName.value = currentCostumer.name;
    inputClientEmail.value = currentCostumer.email;
    inputClientPhone.value = currentCostumer.phone;
    inputClientAdress.value = currentCostumer.address;
    inputClientDescription.value = currentCostumer.description;
  }

  // CONFIGURANDO O CONTENT AO VER O DETALHE DO CLIENTE ACTUAL
  _settingClientContentDetail() {
    const clientImg = document.querySelector(".client-img");
    const clientName = document.querySelector(".detail-client-name");
    const clientEmail = document.querySelector(".detail-client-email");
    const clientPhone = document.querySelector(".client-number");
    const clientID = document.querySelector(".client-id");
    const clientDescription = document.querySelector(".client-decription");
    const clientResidence = document.querySelector(".client-residence");
    const clientTotalPurchases = document.querySelector(
      ".total-client-buy-number"
    );
    const totalBuyAmount = document.querySelector(".total-client-buy-amount");

    const amount = this._currentClientDetail.purchaseHistory.reduce(
      (acc, tot) => (acc += tot.totalAmount),
      0
    );

    // MUDANDO O TEXT CONTENT
    clientImg.src = this._currentClientDetail.imgPath;
    clientName.textContent = this._currentClientDetail.name;
    clientEmail.textContent = this._currentClientDetail.email;
    clientPhone.textContent = this._currentClientDetail.phone;
    clientID.textContent = this._currentClientDetail.id;
    clientDescription.textContent = this._currentClientDetail.description;
    clientResidence.textContent = this._currentClientDetail.address;
    clientTotalPurchases.textContent =
      this._currentClientDetail.purchaseHistory.length;
    totalBuyAmount.textContent = formatNumbers.formatCurrency(amount);
  }

  // VOLTAR A LISTA DE CLIENTES
  _backToClient() {
    this.clientListContainer.classList.remove("hidden");
    this.clientDetailContainer.classList.add("hidden");
    this._pagination(appData.clients);
  }

  // FUNÇÕES PAR O MOBILE PARA VER AS INFORMAÇÕES DO CLIENTE E LISTA DE COMPRAS
  _clientHistoryFunction(e) {
    const target = e.target.closest(".btn-see-buy-detail");
    if (!target) return;
    this.clientBuyDetailContainer.classList.remove("hidden");
  }
  // FUNÇÃO PARA MUDAR ENTRE A LISTA DE COMPRAS E INFORMAÇÕES DO CLIENTE ACTUAL
  _clientToggleMenu(e) {
    this.link = e.target;
    this.afterElement = document.querySelector(".client-menu::after");
    if (this.link.closest(".link-client-profile")) {
      // const link = link.closest(".link-client-profile")
      // link.add
      this.clientInformationBox.classList.remove("hideClientInfo");
      this.clientListHistoryBox.classList.add("hideClientInfo");
    }
    if (this.link.closest(".link-client-historic")) {
      console.log(this.afterElement);
      this.clientInformationBox.classList.add("hideClientInfo");
      this.clientListHistoryBox.classList.remove("hideClientInfo");
    }
  }

  // MOSTRAR FORMULÁRIO PARA ADICIONAR CLIENTE
  _showNewClientForm() {
    this.newClientFormContainer.classList.remove("hidden");
  }

  // ESCONDER FORMULÁRIO PARA ADICIONAR CLIENTE
  _closeNewClientForm(e) {
    const target = e.target;

    if (target.classList.contains("overlay-client-form"))
      this.newClientFormContainer.classList.add("hidden");
    if (target.closest(".close-form-new-client"))
      this.newClientFormContainer.classList.add("hidden");
  }

  // RENDERIZAR A LISTA DE CLIENTES NO DOM
  _renderClientList(list) {
    if (!this.clientContainerList) return;
    if (list.length === 0) {
      this.clientContainerList.innerHTML = "";

      const html = `
      <div class="empty-product">
      <p>Nenhum cliente encontrado</p>
     </div>
      `;
      this.clientContainerList.insertAdjacentHTML("afterbegin", html);
    }

    if (list.length > 0) {
      this.clientContainerList.innerHTML = "";
      list.forEach((client) => {
        if (!client.id) return;
        const html = `
      <div class="client-box" data-id="${client.id}">
        <div>
         <span class="client-icon"><ion-icon name="person-outline"></ion-icon></span>
         <span class="client-name">${client.name} </span>
        </div>
            <span class="client-phone-number">${client.phone}</span>
            <span class="client-email">${client.email}</span>
            <span class="client-total-sell">${
              client.purchaseHistory.length
            }</span>
            <span class="client-status client-${client.status}">${
          client.status === "active" ? "activo" : "inactivo"
        }</span>
            <span class="action-client-btns">
            <button class="btn-edit-user"><ion-icon
                 name="create-outline"></ion-icon></button>
            <button class="btn-delete-user"><ion-icon
                 name="trash-outline"></ion-icon></button>
            <button class="btn-details-user"><ion-icon
                 name="eye-outline"></ion-icon></button>
            </span>

       </div>
      `;
        this.clientContainerList.insertAdjacentHTML("afterbegin", html);
      });
    }
  }

  // FUNÇÃO PARA O INPUT DE PESQUISA NA LISTA DE CLIENTES
  _searchFilter() {
    const value = this.inputSearchClient.value.toLowerCase();
    const filtered = appData.clients.filter((cl) =>
      cl.name.toLocaleLowerCase().startsWith(value)
    );
    this._pagination(filtered);
  }

  // FUNÇÃO PARA CLASSIFICAR NA LISTA DE CLIENTES
  _sortByFunction(e) {
    const target = e.target.closest(".client-sort-list span");
    if (!target) return;
    const def = document.querySelector(".default");
    if (target.classList.contains("name")) {
      this._sortByName();
      def.textContent = target.textContent;
    }

    if (target.classList.contains("active")) {
      def.textContent = target.textContent;
      this._filterActive();
    }

    if (target.classList.contains("inactive")) {
      def.textContent = target.textContent;
      this._filterInactive();
    }
  }

  // CLASSIFICAR EM ORDEM ALFABÉTICA
  _sortByName() {
    const filtered = appData.clients.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    this._pagination(filtered);
  }

  // FILTRAR CLIENTES ACTIVOS
  _filterActive() {
    const filtered = appData.clients.filter((p) => p.status === "active");
    this._pagination(filtered);
  }

  // FILTRAR CLIENTES INACTIVOS
  _filterInactive() {
    const filtered = appData.clients.filter((p) => p.status === "inactive");
    this._pagination(filtered);
  }

  // EVENTO DOS BUTTON DA PAGINAÇÃO
  _btnsPAgination(e) {
    const targer = e.target.closest("button");

    if (targer.classList.contains("btn-next-client")) this.goToNextPage();
    if (targer.classList.contains("btn-prev-client")) this.goToPreviousPage();
  }

  // RENDERIZAR A LISTA DE COMPRAS DO CLIENTE ACTUAL
  _renderClientPurchaseList(arr) {
    if (!this.clientPurchaseContainer) return;
    if (arr.length === 0) {
      this.clientPurchaseContainer.innerHTML = "";

      const html = `
      <div class="empty-product">
      <p>Nenhuma compra encontrada</p>
     </div>
      `;
      this.clientPurchaseContainer.insertAdjacentHTML("afterbegin", html);
    }
    if (arr.length > 0) {
      this.clientPurchaseContainer.innerHTML = "";
      arr.forEach((item) => {
        const puchaseNumber = appData.sales.find((i) => i.id === item.saleId);

        if (!puchaseNumber) return;
        const html = `
      <div class="client-history" data-id="${item.saleId}">
          <div> 
              <span class="client-icon"><ion-icon
                      name="swap-horizontal-outline"></ion-icon></span>
              <span class="buy-invoice-number">${item.invoideID}</span>
          </div>
          <span class="buy-date">${formatNumbers.formatDates(
            new Date(item.date)
          )}</span>
          <span class="buy-amount">${formatNumbers.formatCurrency(
            item.totalAmount
          )}</span>

          <span class="btn-see-buy-detail"><ion-icon name="eye-outline"></ion-icon></span>
      </div>
      `;
        this.clientPurchaseContainer.insertAdjacentHTML("afterbegin", html);
      });
    }
  }

  // PESQUISAR NA LISTA DE COMPRAS DO CLIENTE ACTUAL
  _searchPurchaeFilter(e) {
    const value = this.inputSearchPuchaseList.value.toLowerCase();
    const filtered = this._currentClientDetail.purchaseHistory.filter((item) =>
      item.invoideID.toLowerCase().startsWith(value)
    );
    this._pagination(filtered);
  }

  // CLASSIFICAÇÃO NA LISTA DE COMPRAS DE CLIENTE ACTUAL
  _sortPurchase(e) {
    const target = e.target.closest("span");
    const def = document.querySelector(".def");
    c(target);
    if (target.classList.contains("sort-date")) {
      def.textContent = target.textContent;
      this._sortPurchaseDate();
    }
    if (target.classList.contains("sort-amount")) {
      def.textContent = target.textContent;
      this._sortPurchaseAmount();
    }
  }

  // CLASSIFICAR POR DATA
  _sortPurchaseDate() {
    const filtered = this._currentClientDetail.purchaseHistory.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    this._pagination(filtered);
  }

  // CLASSIFICAR POR MONTANTE
  _sortPurchaseAmount() {
    const filtered = this._currentClientDetail.purchaseHistory.sort(
      (a, b) => new Date(a.totalAmount) - new Date(b.totalAmount)
    );
    this._pagination(filtered);
  }

  // CONFIGURANDO OS CONTENT DO DETALHE DE COMPRA DO CLIENTE ACTUAL
  _settingPurchaseDetailContent(id) {
    const purchase = this._currentClientDetail.purchaseHistory.find(
      (s) => s.saleId === id
    );
    const invoiceNumberLabel = document.querySelector(".invoice-number");
    const buyStatusLabel = document.querySelector(".buy-status");
    const invoiceNumberLabel2 = document.querySelector(
      ".invoice-number-detail"
    );
    const buyDateLabel = document.querySelector(".purchase-date");
    const paymentTypeLabel = document.querySelector(".pay-method");
    const buyStatusLabel2 = document.querySelector(".buy-status-detail");
    const totalBuyAmountLabel = document.querySelector(".total-buy-amount");

    //ADICIONANDO O TEXT CONTENT NO DOM
    invoiceNumberLabel.textContent = purchase.invoideID;
    invoiceNumberLabel2.textContent = purchase.invoideID;
    buyDateLabel.textContent = formatNumbers.formatDates(
      new Date(purchase.date)
    );
    paymentTypeLabel.textContent = "Cash";
    buyStatusLabel2.textContent = "Succeso";
    buyStatusLabel.textContent = "Sucesso";
    totalBuyAmountLabel.textContent = formatNumbers.formatCurrency(
      purchase.totalAmount
    );
    this._renderPuchaseItems(purchase.items);
  }
  _renderPuchaseItems(list) {
    const itemContainer = document.querySelector(".purchase-product-list");
    itemContainer.innerHTML = "";
    list.forEach((p, i) => {
      const productName = appData.products.find(
        (pr) => pr.id === p.productId
      ).name;
      const html = `
      <div class="product">
        <span class="product-header">Producto ${i + 1} <span
                class="product-name">${productName}</span></span>
        <ul class="product-bought-list">
            <li>Quantidade <span class="quantity">${p.quantity}</span></li>
            <li>Preço Unitário <span class="quantity">${formatNumbers.formatCurrency(
              p.price
            )}</span></li>
        </ul>
    </div>
      `;
      itemContainer.insertAdjacentHTML("afterbegin", html);
    });
  }

  // POPUP DE ELIMINAR CLIENTE
  _deleteClientShowPopUp() {
    this.alertDeleteUser.classList.remove("hidden");
  }
  _deleteClientClosePopUp(e) {
    const targer = e.target;
    if (targer.classList.contains("overlay-delete-user")) {
      this.alertDeleteUser.classList.add("hidden");
    }
    if (targer.classList.contains("btn-cancel-delete-costumer")) {
      this.alertDeleteUser.classList.add("hidden");
    }

    if (targer.classList.contains("btn-confirm-delete-costumer")) {
      this.alertDeleteUser.classList.add("hidden");
      this._backToClient();
    }
  }

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
    this.totalPurchasePages.textContent = `${this.totalPages
      .toString()
      .padStart(2, 0)}`;

    this.renderCurrentPage(this.currentPage, productList);
  }

  // RENDERIZAR PAGINAÇÃO
  renderPage(page, list) {
    this.startIndex = (page - 1) * this.productsPerPage;
    this.endIndex = this.startIndex + this.productsPerPage;
    this.productsToRender = list.slice(this.startIndex, this.endIndex);
    this._renderClientList(this.productsToRender);
    this._renderClientPurchaseList(this.productsToRender);
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
    this.currentPurchasePage.textContent = this.currentPage;
  };

  // PÁGINA SEGUINTE
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderCurrentPage(this.currentPage, this.productList);
    }
    this.curPagelabel.textContent = this.currentPage;
    this.currentPurchasePage.textContent = this.currentPage;
  }

  // OS EVENT LISTNERS
  _eventListeners() {
    // EVENT LISTNERS
    this.newClientFormContainer?.addEventListener(
      "click",
      this._closeNewClientForm.bind(this)
    );

    this.btnDeleteCurrentCostumer?.addEventListener(
      "click",
      this._deleteClientShowPopUp.bind(this)
    );
    this.inputSearchClient?.addEventListener(
      "input",
      this._searchFilter.bind(this)
    );
    this.sortContainer?.addEventListener(
      "click",
      this._sortByFunction.bind(this)
    );

    this.btnPaginationClient?.addEventListener(
      "click",
      this._btnsPAgination.bind(this)
    );
    this.purchaseBtnsPage?.addEventListener(
      "click",
      this._btnsPAgination.bind(this)
    );
    this.inputSearchPuchaseList?.addEventListener(
      "input",
      this._searchPurchaeFilter.bind(this)
    );
    this.purchaseSortContainer?.addEventListener(
      "click",
      this._sortPurchase.bind(this)
    );
    this.clientPurchaseContainer?.addEventListener(
      "click",
      this._showBuyDetail.bind(this)
    );

    // this.btnCloseBuyDetail?.addEventListener(
    //   "click",
    //   this._closeBuyDetail.bind(this)
    // );
    this.clientBuyDetailContainer?.addEventListener(
      "click",
      this._closeBuyDetail.bind(this)
    );
    this.clientContainerList?.addEventListener(
      "click",
      this._actionClient.bind(this)
    );
    this.btnBackToClientList?.addEventListener(
      "click",
      this._backToClient.bind(this)
    );
    this.clientHistoryContainer?.addEventListener(
      "click",
      this._clientHistoryFunction.bind(this)
    );
    this.clientMenuList?.addEventListener(
      "click",
      this._clientToggleMenu.bind(this)
    );
    this.btnShowNewClientForm?.addEventListener(
      "click",
      this._showNewClientForm.bind(this)
    );
    // this.btnCloseAddClientForm?.addEventListener(
    //   "click",
    //   this._closeNewClientForm.bind(this)
    // );
    this.alertDeleteUser?.addEventListener(
      "click",
      this._deleteClientClosePopUp.bind(this)
    );
  }

  // FUNÇÕES AUTO-INICIALIZADAS
  _init() {
    this._pagination(appData.clients);
    this._renderSummary();
  }
}

const client = new ClientApp();
export { client };
