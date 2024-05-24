import { appData } from "./data.js";
import { formatNumbers } from "./views/formatNumbers.js";

const productList = [];
class ProductApp {
  productList = appData.products;
  target;
  constructor() {
    // SELECIONANDO VARIÁVEIS
    this.productContainer = document.querySelector(".estaticos");
    this.newProduct = document.querySelector(".btn-add-new-product");
    this.serProductInput = document.querySelector(".product-search-input");
    this.formContainer = document.querySelector(".add-product-container");
    // console.log(this.formContainer);
    this.cancelAddProduct = document.querySelector(".cancelar-new-product");
    this.btnCloseDetails = document.querySelector(".btn-close-details");
    this.btnShowCategoryForm = document.querySelector(".btn-new-category");
    this.categoryFormContainer = document.querySelector(".create-category");
    this.btnCloseCategoryForm = document.querySelector(".close-category");
    this.btnCloseNewProductForm = document.querySelector(
      ".btn-close-add-new-product"
    );
    this.detailsContainer = document.querySelector(".details-container");
    this.listContainer = document.querySelector(".product-list");
    this.btnConfirmDelete = document.querySelector(".confirm-delete-btn");
    this.btnCancelDelete = document.querySelector(".cancel-delete-btn");
    this.alerDeleteMsgContainer = document.querySelector(
      ".alert-message-container"
    );
    this.curPagelabel = document.querySelector(".curr-page-number-product");
    this.curPage = document.querySelector(".current-product-page");
    this.totalPagesLabel = document.querySelector(".total-pages-product");
    this.searchInput = document.querySelector(".input__search");
    this.btnNextPage = document.querySelector(".btn-next-page-product");
    this.btnPevPage = document.querySelector(".btn-previous-page-product");
    this.sorContainer = document.querySelector(".sort-list");

    this.newProduct?.addEventListener(
      "click",
      this._showNewProductForm.bind(this)
    );
    this.btnCloseNewProductForm?.addEventListener(
      "click",
      this._closeNewProductForm.bind(this)
    );
    this.btnShowCategoryForm?.addEventListener(
      "click",
      this._showCategoryForm.bind(this)
    );
    this.btnCloseCategoryForm?.addEventListener(
      "click",
      this._closeCategoryForm.bind(this)
    );
    this.cancelAddProduct?.addEventListener(
      "click",
      this._cancelAddNewProduct.bind(this)
    );
    this.productContainer?.addEventListener(
      "click",
      this._editProduct.bind(this)
    );
    this.productContainer?.addEventListener(
      "click",
      this._seeProductDetail.bind(this)
    );
    this.btnCloseDetails?.addEventListener(
      "click",
      this._closeProductDetail.bind(this)
    );
    this.btnCancelDelete?.addEventListener(
      "click",
      this._alertMessage.bind(this)
    );
    this.btnConfirmDelete?.addEventListener(
      "click",
      this._deteleProductFunction.bind(this)
    );
    this.productContainer?.addEventListener(
      "click",
      this._setTarget.bind(this)
    );
    this.serProductInput?.addEventListener(
      "input",
      this._searchProductList.bind(this)
    );
    this.sorContainer?.addEventListener(
      "click",
      this._sortProductList.bind(this)
    );

    //PAGINATION BTNS
    this.btnNextPage?.addEventListener("click", this.goToNextPage.bind(this));
    this.btnPevPage?.addEventListener(
      "click",
      this.goToPreviousPage.bind(this)
    );
    // CHAMANDO FUNCTIONS
    this._pagination(this.productList);
  }

  //FUNCTIONS
  _allEventListener() {}
  _showNewProductForm() {
    this.formContainer.classList.remove("hidden");
  }
  _closeNewProductForm() {
    this.formContainer.classList.add("hidden");
  }
  _showCategoryForm() {
    this.categoryFormContainer.classList.remove("hidden");
  }
  _closeCategoryForm() {
    this.categoryFormContainer.classList.add("hidden");
  }
  _cancelAddNewProduct() {
    this.formContainer.classList.add("hidden");
  }
  _editProduct(e) {
    this.target = e.target.closest(".btn-edit-product");
    if (!this.target) return;
    this.formContainer?.classList.remove("hidden");
    const productID = +this.target.closest(".product-item").dataset.id;
    // SELECIONANDO VARÍAVEIS DO EDIT PRODUCT
    this._settingTheProductEditInputValue(productID);
  }
  _settingTheProductEditInputValue(product) {
    const cureentProduct = appData.products.find((item) => item.id === product);
    console.log(cureentProduct);
    const heading = document.querySelector(".add-new-header .heading-h2");
    const inputName = document.querySelector(".input-edit-product-name");
    const inputPrice = document.querySelector(".input-edit-product-price");
    const inputBuyPrice = document.querySelector(".input-edit-buy-price");
    const inputDescription = document.querySelector(
      ".product-description-input"
    );
    const estockQ = document.querySelector(".input-quantity");
    heading.textContent = "Editar Producto";
    inputName.value = cureentProduct.name;
    inputPrice.value = cureentProduct.price;
    inputBuyPrice.value = 2303;
    inputDescription.value = cureentProduct.description;
    estockQ.value = cureentProduct.stock;
  }
  _seeProductDetail(e) {
    this.target = e.target.closest(".btn-details-product");
    if (!this.target) return;
    this.detailsContainer.classList.remove("hidden");
    const productID = +this.target.closest(".product-item").dataset.id;
    this._displayProductDetailContent(productID);
  }
  _displayProductDetailContent(product) {
    const cureentProduct = appData.products.find((item) => item.id === product);
    const productNameLabel = document.querySelector(".product-name-details");
    const productCategoryLabel = document.querySelector(
      ".product-category-details"
    );
    const productBuyPrice = document.querySelector(
      ".product-buy-price-details"
    );
    const productSellPriceLabel = document.querySelector(
      ".product-sell-price-details"
    );
    const productStockQtyLabel = document.querySelector(
      ".product-stock-qtd-details"
    );
    const productIDLabel = document.querySelector(".product-id-details");

    productNameLabel.textContent = cureentProduct.name;
    productBuyPrice.textContent = formatNumbers.formatCurrency(2304);
    productSellPriceLabel.textContent = formatNumbers.formatCurrency(
      cureentProduct.price
    );
    productCategoryLabel.textContent = cureentProduct.category;
    productIDLabel.textContent = cureentProduct.id;
  }
  _closeProductDetail() {
    this.detailsContainer.classList.add("hidden");
  }
  _renderProductList(arrList) {
    if (arrList.length === 0) {
      if (this.listContainer) this.listContainer.innerHTML = "";
      const emptyList = `
      <div class="empty-product">
      <p>Nenhum producto encontrado</p>
  </div>
      `;
      if (this.listContainer)
        this.listContainer.insertAdjacentHTML("afterbegin", emptyList);
    }
    if (arrList.length !== 0) {
      if (this.listContainer) this.listContainer.innerHTML = "";
      arrList.forEach((element) => {
        let html = `
      <div class="product-item" data-id="${element.id}">
         <!-- NOME DO PRODUCTO -->
         <div>
             <span class="select-btn"><ion-icon
                     name="caret-down-outline"></ion-icon></ion-icon></span>
             <span class="product-name">${element.name} </span>
         </div>
         <span class="product-category">${element.category}</span>
         <span class="product-price">${formatNumbers.formatCurrency(
           element.price
         )}</span>
         <span class="product-qtd">${element.stock}</span>
         <span class="product-date">${formatNumbers.formatDates(
           new Date(element.date)
         )}</span>
         <span class="product-action">
             <button class="btn-edit-product"><ion-icon
                     name="create-outline"></ion-icon></button>
             <button class="btn-delete-product"><ion-icon
                     name="trash-outline"></ion-icon></button>
             <button class="btn-details-product"><ion-icon
                     name="ellipsis-vertical-outline"></ion-icon></button>
         </span>
     </div>
      `;
        // VERIFICAR NOVAMENTO SE O LISTCONTAINER NÃO É UNDEFINED
        if (this.listContainer)
          this.listContainer.insertAdjacentHTML("afterbegin", html);
      });
    }
    // if (arrList.length === 0) {
    //   console.log(arrList);
    //   document
    //     .querySelector(".product-list")
    //     .insertAdjacentHTML(
    //       "afterbegin",
    //       `<p classs="sem-resul">Nenhum producto encontrado </p>`
    //     );
    // }
  }

  _alertMessage() {
    this.alerDeleteMsgContainer.classList.add("hidden");
  }
  _setTarget(e) {
    this.target = e.target.closest(".btn-delete-product");
    if (!this.target) return;
    this.alerDeleteMsgContainer.classList.remove("hidden");
  }
  _deteleProductFunction(e) {
    const productID = +this.target.closest(".product-item").dataset.id;
    console.log(productID);
    const i = appData.products.findIndex((item) => item.id === productID);
    console.log(appData.products);
    console.log(i);
    appData.products.splice(i, 1);
    console.log(appData.products);
    // this.renderPagination(productList);
    if (productList.length === 1) productList.splice(0, -1);
    this.alerDeleteMsgContainer.classList.add("hidden");
    // ALERTA DE SUCESSO NO PROCESSO DE ELIMINAÇÃO
    this._pagination(appData.products);
    document
      .querySelector(".delete-confirmed-message")
      .classList.remove("hidden");
    // ESCONDENDO APÓS 1,5 SEGUNDOS
    setTimeout(
      () =>
        document
          .querySelector(".delete-confirmed-message")
          .classList.add("hidden"),
      1500
    );
    setLocalStorage();
  }

  // FUNCIONALIDADE DE PESQUISA
  _searchProductList(e) {
    const value = this.serProductInput.value.toLowerCase();
    console.log(value);
    const filtered = appData.products.filter((item) =>
      item.name.toLocaleLowerCase().startsWith(value)
    );
    this._pagination(filtered);
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
    if (target.className === "price") {
      this._sortByPrice();
      def.textContent = target.textContent;
    }
    if (target.className === "income") {
      this._filetInComeProduct();
      def.textContent = target.textContent;
    }
  }
  _sortByDate() {
    const sorted = appData.products.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    this._pagination(sorted);
    console.log(sorted);
  }
  _sortByPrice() {
    const sorted = appData.products.sort((a, b) => a.price - b.price);
    this._pagination(sorted);
    console.log(sorted);
  }
  _sortByStock() {
    const sorted = appData.products.sort((a, b) => a.stock - b.stock);
    this._pagination(sorted);
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
    this._renderProductList(this.productsToRender);
    console.log(this.productsToRender);
  }
  renderCurrentPage(currentPage, list) {
    this.renderPage(currentPage, list);
  }
  goToPreviousPage = function () {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderCurrentPage(this.currentPage, this.productList);
      console.log(this.productsToRender);
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

const productClass = new ProductApp();
export { productList, productClass };
