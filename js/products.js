const productList = [];

// REFACTORING THE CODE
// FUNÇÃO ALEATÓRIA PARA GERAR DADOS DE PRODUCTOS

//CONSTRUCTOR FUNTION PARA CRIAÇÃO DOS PRODUCTOS
const CreateProduct = function (
  name,
  category,
  quantity,
  date,
  sellPrice,
  buyPrice,
  SKUCode,
  description
) {
  this.name = name;
  this.category = category;
  this.quantity = quantity;
  this.date = date;
  this.sellPrice = sellPrice;
  this.buyPrice = buyPrice;
  this.SKUCode = SKUCode;
  this.description = description;
  this.searchData = this.name.toLowerCase();
  this.alertQuantity = 20;
};

// prettier-ignore
let alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//GERAL INICIAIS ALEATÓRIAS
for (let i = 1; i <= 6; i++) {
  const randomIndex = Math.floor(Math.random() * 16) + 1;
  const randomMonth = Math.floor(Math.random() * 12) + 1;
  const randomDate = Math.floor(Math.random() * 31) + 1;
  const product = new CreateProduct(
    `${alfabeto[randomIndex]}${alfabeto[randomIndex]}${alfabeto[randomIndex]} Product ${i}`,
    `Category ${i % 5}`,
    Math.floor(Math.random() * 100) + 1, // Quantidade aleatória entre 1 e 100
    `2024-${randomMonth.toString().padStart(2, 0)}-${randomDate
      .toString()
      .padStart(2, 0)}`,
    Math.floor(Math.random() * 10000) + 1, // Preço de venda aleatório entre 1 e 10000
    Math.floor(Math.random() * 5000) + 1, // Preço de compra aleatório entre 1 e 5000
    `SKU00${i}`,
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit placeat error autem nihil."
  );

  productList.push(product);
}
class ProductApp {
  productList = productList;
  target;
  constructor() {
    // SELECIONANDO VARIÁVEIS

    this.productContainer = document.querySelector(".estaticos");
    this.newProduct = document.querySelector(".btn-add-new-product");
    this.formContainer = document.querySelector(".add-product-container");
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
    this.prevPageBtn = document.querySelector(".btn-previous-page");
    this.nextPageBtn = document.querySelector(".btn-next-page");
    this.curPagelabel = document.querySelector(".curr-page-number");
    this.curPage = document.querySelector(".current-product-page");
    this.totalPageslabel = document.querySelector(".total-pages");
    this.searchInput = document.querySelector(".input__search");
    this.sortContainer = document.querySelector(".sort");

    // LIDANDO COM EVENT LISTNERS
    // this.detailsContainer?.addEventListener(
    //   "click",
    //   this._showNewProductForm.bind(this)
    // );
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
    this.productContainer?.addEventListener(
      "click",
      this._setTarget.bind(this)
    );
    this.searchInput?.addEventListener(
      "keypress",
      this._searchFunctionality.bind(this)
    );
    this.sortContainer?.addEventListener(
      "change",
      this._sortFunction.bind(this)
    );

    //PAGINATION BTNS
    this.prevPageBtn?.addEventListener(
      "click",
      this.goToPreviousPage.bind(this)
    );
    this.nextPageBtn?.addEventListener("click", this.goToNextPage.bind(this));
    this.btnConfirmDelete?.addEventListener(
      "click",
      this._deteleProductFunction.bind(this)
    );
    // CHAMANDO FUNCTIONS
    this.renderPagination(productList);
  }

  //FUNCTIONS
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
    this.formContainer.classList.remove("hidden");
  }
  _seeProductDetail(e) {
    this.target = e.target.closest(".btn-details-product");
    if (!this.target) return;
    this.detailsContainer.classList.remove("hidden");
  }
  _closeProductDetail() {
    this.detailsContainer.classList.add("hidden");
  }
  _renderProductList(arrList) {
    if (arrList.length === 0) {
      document
        .querySelector(".product-list")
        .insertAdjacentHTML(
          "afterbegin",
          `<p classs="sem-resul">Nenhum producto encontrado </p>`
        );
    } else {
      if (this.listContainer) this.listContainer.innerHTML = "";
      arrList.forEach((element) => {
        let html = `
      <div class="product-item" data-id="${element.SKUCode}">
         <!-- NOME DO PRODUCTO -->
         <div>
             <span class="select-btn"><ion-icon
                     name="caret-down-outline"></ion-icon></ion-icon></span>
             <span class="product-name">${element.name} </span>
         </div>
         <span class="product-category">${element.category}</span>
         <span class="product-price">$ ${element.sellPrice}</span>
         <span class="product-qtd">${element.quantity}</span>
         <span class="product-date">${element.date}</span>
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
    // PEGANDO O PARENT COM A CLASS PRODUCT ITEM COM O EVENTO TARGET
    this.item = this.target;
    this.index = this.item.dataset.id;
    console.log(this.item);
    this.product = productList.find((i) => i.SKUCode === this.index);
    const i = productList.indexOf(this.product);
    productList.splice(i, 1);
    console.log(productList);
    this.renderPagination(productList);
    if (productList.length === 1) productList.splice(1);
    this.alerDeleteMsgContainer.classList.add("hidden");
    // ALERTA DE SUCESSO NO PROCESSO DE ELIMINAÇÃO
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
  }

  // FUNÇÃO PARA A PAGINAÇÃO DAS LISTAS
  renderPagination(productList) {
    if (this.totalPageslabel) {
      this.productsPerPage = 7;
      this.currentPage = 1;
      this.totalPages = Math.ceil(productList.length / this.productsPerPage);
      this.totalPageslabel.textContent = this.totalPages;
      this.renderCurrentPage(this.currentPage);
    }
  }
  renderPage(page) {
    this.startIndex = (page - 1) * this.productsPerPage;
    this.endIndex = this.startIndex + this.productsPerPage;
    this.productsToRender = productList.slice(this.startIndex, this.endIndex);
    this._renderProductList(this.productsToRender);
  }
  renderCurrentPage(currentPage) {
    this.renderPage(currentPage);
  }
  goToPreviousPage = function () {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderCurrentPage(this.currentPage);
    }
    this.curPagelabel.textContent = this.currentPage;
    this.curPage.textContent = this.currentPage;
  };
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderCurrentPage(this.currentPage);
    }
    this.curPagelabel.textContent = this.currentPage;
    this.curPage.textContent = this.currentPage;
  }

  // FUNCIONALIDADE DE PESQUISA
  _searchFunctionality(e) {
    this.value = this.searchInput.value.toLowerCase();
    this.result = this.productList.filter((item) => {
      return item.searchData.startsWith(this.value);
    });

    document.querySelector(".product-list").innerHTML = "";
    this.paginationRender(this.result);

    this.searchInput.addEventListener("keydown", function (e) {
      if (searchInput.value === "" && e.key === "Backspace")
        this.paginationRender(productList);
    });
  }
  _sortFunction() {
    this.productList.sort((a, b) => {
      if (e === "date") {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
      }
      // if (e === "date") {
      //   if (a.tipo === "entrada" && b.tipo === "saida") return -1;
      //   if (a.tipo === "saida" && b.tipo === "entrada") return 1;
      // }
      if (e === "qtd") {
        if (a.quantity > b.quantity) return 1;
        if (a.quantity < b.quantity) return -1;
      }

      if (e === "price") {
        if (a.sellPrice > b.sellPrice) return 1;
        if (a.sellPrice < b.sellPrice) return -1;
      }
      return 0;
    });
    this.paginationRender(this.productList);
  }
}

const productClass = new ProductApp();
// export { productFunction };
export { productList, productClass };
