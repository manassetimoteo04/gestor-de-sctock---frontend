// Defina a função stockFunction
// import { productList } from "./products.js";
import { appData } from "./data.js";
import { formatNumbers } from "./views/formatNumbers.js";

//REFACTORING THE CODE

class StockApp {
  index;
  lowStockProductList;
  constructor() {
    // SELECIONADO AS VARIAVEIS
    this.ctx = document.getElementById("pieChart");
    this.historicDetailContainer = document.querySelector(
      ".historic-product-detail "
    );
    this.lowStockContainer = document.querySelector(".low-stock-list");
    this.btnUpdateStockConfirm = document.querySelector(
      ".confirm-update-product"
    );

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
    // LIDANDO COM EVENT LISTNERS
    this.sorContainer?.addEventListener(
      "click",
      this._sortProductList.bind(this)
    );
    // this.lowStockContainer?.addEventListener(
    //   "click",
    //   this._updateStock.bind(this)
    // );
    this.productInOUtHistory?.addEventListener(
      "click",
      this._updateStock.bind(this)
    );
    this.btnUpdateStockConfirm?.addEventListener(
      "click",
      this._confirmUpdateStock.bind(this)
    );
    // this.btnCloseUpdateContainer?.addEventListener(
    //   "click",
    //   this._closeHistoricDetail.bind(this)
    // );
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

    this._renderLowStockNotifications(appData.inventory.lowStockNotifications);
    this._pagination(appData.registerInOutProducts);
  }

  _renderLowStockNotifications(arrList) {
    if (arrList.length === 0) {
      this.lowNotificationContainer?.insertAdjacentHTML(
        "afterbegin",
        `<p classs="sem-resul">Nenhum producto encontrado </p>`
      );
    } else {
      if (this.lowNotificationContainer)
        this.lowNotificationContainer.innerHTML = "";
      arrList.forEach((element) => {
        let html = `
        <div class="stock-notification-box" data-id="">
        <ion-icon name="notifications-outline"></ion-icon>
        <div class="notification-content">
            <div class="text">
                <p>
                ${element.message}
                </p>
                <span class="notification-time">${formatNumbers.formatDates(
                  new Date(element.date)
                )}</span>
            </div>
        </div>
    </div>
    `;
        // VERIFICAR NOVAMENTO SE O LISTCONTAINER NÃO É UNDEFINED
        if (this.lowNotificationContainer)
          this.lowNotificationContainer.insertAdjacentHTML("afterbegin", html);
      });
    }
  }

  _renderRegisterInOutList(list) {
    if (list.length === 0) {
      if (this.productInOUtHistory) this.productInOUtHistory.innerHTML = "";
      const emptyList = `
      <div class="empty-product">
      <p>Nenhum producto encontrado</p>
     </div>
      `;
      if (this.productInOUtHistory)
        this.productInOUtHistory.insertAdjacentHTML("afterbegin", emptyList);
    }
    if (list.length > 0)
      if (this.productInOUtHistory) this.productInOUtHistory.innerHTML = "";
    let html;
    list.forEach((item) => {
      html = `
        <div class="product-item-history" data-id="${item.productId}">

          <span class="product-name"><ion-icon name="arrow-${
            item.type === "entrada" ? "down" : "up"
          }-outline" class="${
        item.type === "entrada" ? "in-product" : "out-product"
      }"></ion-icon>
          ${item.name}</span>

          <span class="product-category">${item.category} </span>
          <span class="product-price">${item.quantity} </span>
          <span class="product-qtd ">${item.type} </span>
          <span class="product-date">${formatNumbers.formatDates(
            new Date(item.date)
          )}</span>
                               
          <span class="product-action">
              <button class="btn-update-stock"><ion-icon name="eye-outline"></ion-icon></button>
          </span>
        </div>
        `;
      if (this.productInOUtHistory)
        this.productInOUtHistory.insertAdjacentHTML("afterbegin", html);
    });
  }
  _updateStock(e) {
    this.target = e.target.closest(".btn-update-stock");
    if (!this.target) return;
    const Id = +this.target.closest(".product-item-history").dataset.id;

    this.historicDetailContainer.classList.remove("hidden");
    this._renderUpdateForm(Id);
  }
  _closeHistoricDetail(e) {
    const target = e.target;
    if (target.classList.contains("overlay-historic-detail"))
      this.historicDetailContainer.classList.add("hidden");
    if (target.closest(".btn-close-historic-detail"))
      this.historicDetailContainer.classList.add("hidden");
  }
  _renderUpdateForm(id) {
    const item = appData.registerInOutProducts.find((p) => p.productId === id);

    document.querySelector(".product-name-historic").textContent = item.name;
    document.querySelector(".product-category-historic").textContent =
      item.category;

    document.querySelector(".product-qty-historic").textContent = item.quantity;
    document.querySelector(".product-event-type").textContent = item.type;
    document.querySelector(".product-date-historic").textContent =
      formatNumbers.formatDates(new Date(item.date));
  }
  _confirmUpdateStock() {
    productList[this.index].quantity += +this.inputQuantityUpdate.value;
    this.historicDetailContainer.classList.add("hidden");
    this.lowStockProductList = productList.filter(
      (product) => product.quantity < product.alertQuantity
    );
    this._renderLowStockProduct(this.lowStockProductList);
  }
  _sortProductList(e) {
    const target = e.target.closest("span");
    const def = document.querySelector(".default");
    if (!target) return;
    if (target.className === "date") {
      this._sortByDate();
      def.textContent = target.textContent;
    }
    if (target.className === "qtd") {
      this._sortByStock();
      def.textContent = target.textContent;
    }
    if (target.className === "outcome") {
      this._filetOutComeProduct();
      def.textContent = target.textContent;
    }
    if (target.className === "income") {
      this._filetInComeProduct();
      def.textContent = target.textContent;
    }
  }
  _sortByDate() {
    const sorted = appData.registerInOutProducts.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    this._pagination(sorted);
  }
  // _sortByPrice() {
  //   const sorted = appData.registerInOutProducts.sort(
  //     (a, b) => a.date - b.date
  //   );
  //   this._pagination(sorted);
  // }
  _sortByStock() {
    const sorted = appData.registerInOutProducts.sort(
      (a, b) => a.quantity - b.quantity
    );
    this._pagination(sorted);
  }
  _filetInComeProduct() {
    const sorted = appData.registerInOutProducts.filter(
      (item) => item.type === "entrada"
    );
    this._pagination(sorted);
    console.log(sorted);
  }
  _filetOutComeProduct() {
    const sorted = appData.registerInOutProducts.filter(
      (item) => item.type === "saída"
    );
    this._pagination(sorted);
    console.log(sorted);
  }
  _serachInOutList() {
    const value = this.historyInputSearch.value.toLowerCase();
    console.log(value);
    const filtered = appData.registerInOutProducts.filter((item) =>
      item.name.toLocaleLowerCase().startsWith(value)
    );
    this._pagination(filtered);
  }
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
  renderPage(page, list) {
    this.startIndex = (page - 1) * this.productsPerPage;
    this.endIndex = this.startIndex + this.productsPerPage;
    this.productsToRender = list.slice(this.startIndex, this.endIndex);
    this._renderRegisterInOutList(this.productsToRender);
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
}
const newStock = new StockApp();
export { newStock };
