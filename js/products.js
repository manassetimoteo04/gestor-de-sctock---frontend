import { appData } from "./data.js";
import { formatNumbers } from "./views/formatNumbers.js";

class ProductApp {
  productList = appData.products;
  target;
  constructor() {
    // SELECIONANDO VARIÁVEIS
    this.productContainer = document.querySelector(".container-list");
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

    // CHAMANDO FUNCTIONS
    this._init();
  }

  // MOSTRAR O FORMULÁRIO PARA ADICIOANR NOVO PRODUCTO
  _showNewProductForm() {
    this.formContainer.classList.remove("hidden");
  }

  // FECHAR O FORMULÁRIO
  _closeNewProductForm(e) {
    const target = e.target;
    if (target.classList.contains("overlay-new-product-form"))
      this.formContainer.classList.add("hidden");
    if (target.closest(".btn-close-add-new-product"))
      this.formContainer.classList.add("hidden");
  }

  // MINI FORM PARA ADICIONAR CATEGORIA
  _showCategoryForm() {
    this.categoryFormContainer.classList.remove("hidden");
  }

  // FECHAR MINIFORM
  _closeCategoryForm(e) {
    const target = e.target;
    if (target.classList.contains("overlay-create-category"))
      this.categoryFormContainer.classList.add("hidden");
    if (target.closest(".close-category"))
      this.categoryFormContainer.classList.add("hidden");
  }

  // CANCELAR NOVO PRODUCTO
  _cancelAddNewProduct() {
    this.formContainer.classList.add("hidden");
  }

  // CHAMANDO A FUNÇÃO PARA EDITAR O PRODUCTO
  _editProduct(e) {
    this.target = e.target.closest(".btn-edit-product");
    if (!this.target) return;
    this.formContainer?.classList.remove("hidden");
    const productID = +this.target.closest(".product-item").dataset.id;
    this._settingTheProductEditInputValue(productID);
  }

  // CONFIGURANDO OS VALUES DO INPUT DO PRODUCTO SELECIOANDO
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

  // FUNÇÃO PARA VER OS DETALHES DO PRODUCTO SELECIONADO
  _seeProductDetail(e) {
    this.target = e.target.closest(".btn-details-product");
    if (!this.target) return;
    this.detailsContainer.classList.remove("hidden");
    const productID = +this.target.closest(".product-item").dataset.id;
    this._displayProductDetailContent(productID);
  }

  // FUNÇÃO PARA RENDERIZAR OS CONTENTS DO PRODUCTO SELECIONADO NO POPUP
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
    productStockQtyLabel.textContent = cureentProduct.stock;
    productCategoryLabel.textContent = cureentProduct.category;
    productIDLabel.textContent = cureentProduct.id;
  }

  // FECHAR DETALHES DO PRODUCTO
  _closeProductDetail(e) {
    const target = e.target;
    if (target.classList.contains("overlay-product-detail"))
      this.detailsContainer.classList.add("hidden");
    if (target.closest(".btn-close-details"))
      this.detailsContainer.classList.add("hidden");
  }

  // RENDERIZAR A LISTA DE PRODUCTOS
  _renderProductList(arrList) {
    if (!this.listContainer) return;
    if (arrList.length === 0) {
      this.listContainer.innerHTML = "";
      const emptyList = `
      <div class="empty-product">
      <p>Nenhum producto encontrado</p>
  </div>
      `;

      this.listContainer.insertAdjacentHTML("afterbegin", emptyList);
    }
    if (arrList.length !== 0) {
      this.listContainer.innerHTML = "";
      arrList.forEach((element) => {
        let html = `
      <div class="product-item" data-id="${element.id}">
         <div class="product-name-container">
             <span class=""><ion-icon name="chevron-expand-outline"></ion-icon></span>
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

        this.listContainer.insertAdjacentHTML("afterbegin", html);
      });
    }
  }

  // MENSAGEM DE ALERTA PARA ELIMINAR PRODUCTO
  _alertMessage(e) {
    const target = e.target;
    if (target.classList.contains("overlay-delete-product"))
      this.alerDeleteMsgContainer.classList.add("hidden");
    if (target.closest(".cancel-delete-btn"))
      this.alerDeleteMsgContainer.classList.add("hidden");
  }

  // CONFIGURAR O TARGET
  _setTarget(e) {
    this.target = e.target.closest(".btn-delete-product");
    if (!this.target) return;
    this.alerDeleteMsgContainer.classList.remove("hidden");
  }

  // FUNÇÃO PARA MOSTRAR O POPUP DE ALERTA PRA ELMIINAR PRODUCTO
  _deteleProductFunction(e) {
    const productID = +this.target.closest(".product-item").dataset.id;
    console.log(productID);
    const i = appData.products.findIndex((item) => item.id === productID);
    this.alerDeleteMsgContainer.classList.add("hidden");
    this._pagination(appData.products);
  }

  // FUNCIONALIDADE DE PESQUISA NA LISTA DE PRODUCTOS
  _searchProductList(e) {
    const value = this.serProductInput.value.toLowerCase();
    console.log(value);
    const filtered = appData.products.filter((item) =>
      item.name.toLocaleLowerCase().startsWith(value)
    );
    this._pagination(filtered);
  }

  // FUNÇÃO PARA CLASSIFICAR A LISTA
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

  //CLASSFICICAR EPOR DATA
  _sortByDate() {
    const sorted = appData.products.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    this._pagination(sorted);
    console.log(sorted);
  }
  //CLASSFICICAR POR PREÇO
  _sortByPrice() {
    const sorted = appData.products.sort((a, b) => a.price - b.price);
    this._pagination(sorted);
    console.log(sorted);
  }

  //CLASSFICICAR POR ESTOQUE
  _sortByStock() {
    const sorted = appData.products.sort((a, b) => a.stock - b.stock);
    this._pagination(sorted);
  }

  // PAGINAÇÃO DA LISTA DE PRODUCTOS
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

  // CONFIGURARA  PÁGINA A SER RENDERIZADA
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

  // FUNÇÃO PARA IR NA PÁGINA ANTERIOR
  goToPreviousPage = function () {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderCurrentPage(this.currentPage, this.productList);
      console.log(this.productsToRender);
    }
    this.curPagelabel.textContent = this.currentPage;
  };

  // FUNÇÃO PARA IR NA PÁGINA POSTERIOR
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderCurrentPage(this.currentPage, this.productList);
    }
    this.curPagelabel.textContent = this.currentPage;
  }

  // CHAMANDO TODOS OS EVENTLISNTERS
  _allEventListener() {
    this.newProduct?.addEventListener(
      "click",
      this._showNewProductForm.bind(this)
    );
    this.formContainer?.addEventListener(
      "click",
      this._closeNewProductForm.bind(this)
    );
    this.btnShowCategoryForm?.addEventListener(
      "click",
      this._showCategoryForm.bind(this)
    );
    this.categoryFormContainer?.addEventListener(
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

    this.alerDeleteMsgContainer?.addEventListener(
      "click",
      this._alertMessage.bind(this)
    );
    this.detailsContainer?.addEventListener(
      "click",
      this._closeProductDetail.bind(this)
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
  }

  // FUNÇÕES AUTOINICIALIZADAS
  _init() {
    this._pagination(this.productList);
    this._allEventListener();
  }
}

const productClass = new ProductApp();
export { productClass };
