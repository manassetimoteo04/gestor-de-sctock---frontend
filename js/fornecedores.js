// REFACTORING THE CODE
// import { appData } from "./data.js";
// const c = console.log.bind(document);

class SupplierApp {
  constructor() {
    // SELECIONANDO AS VARIÁVEIS DO DOM
    this.btnShowNewSupplierForm = document.querySelector(".btn-add-supplier");
    this.supplierFormContainer = document.querySelector(
      ".add-new-supplier-container"
    );
    this.supplierListContainer = document.querySelector(".supplier-list");
    this.btnCloseNewSupplierForm = document.querySelector(
      ".close-form-new-supplier"
    );
    this.supplerDetailContainer = document.querySelector(
      ".supplier-detail-container"
    );
    this.closeSupplierDetail = document.querySelector(".close-detail-supplier");
    this.supplierListR = document.querySelector(".supplier-list-container");

    this.totalPagesLabel = document.querySelector(".total-pages-supplier");
    this.btnNextPage = document.querySelector(".btn-next-supp");
    this.btnPrevPage = document.querySelector(".btn-prev-sup");
    this.curPagelabel = document.querySelector(".current-page-supp");
    this.deleteSupplierAlert = document.querySelector(".delete-supplier-alert");
    this.inputSearchSupplier = document.querySelector(".search-input-supplier");
    this.sortByContainer = document.querySelector(".sort-by");

    this.succesPopupContainer = document.querySelector(
      ".succes-alert-container"
    );

    // INICIALIZANDO AS FUNÇÕES
    this._allEventListeners();
    this._init();
  }

  // FUNCÇÕES DOS EVENT LISTENERS

  // GUARDAR O POPUP DE ALERTA PARA ELIMINAR O FORNCEDOR
  _hideAlert(e) {
    const target = e.target;
    if (e.target.classList.contains("overlay-delete-supplier"))
      this.deleteSupplierAlert.classList.add("hidden");

    if (target.closest(".btn-confirm-delete-supplier"))
      this.deleteSupplierAlert.classList.add("hidden");

    if (target.closest(".btn-cancel-delete-supplier"))
      this.deleteSupplierAlert.classList.add("hidden");
  }

  // FECHAR O POPUP DE SUCESSO
  _hideSuccesPopup(e) {
    const target = e.target;

    if (e.target.classList.contains("overlay-succes-alert"))
      this.succesPopupContainer.classList.add("hidden");

    if (target.closest(".close-succes-popup"))
      this.succesPopupContainer.classList.add("hidden");
  }

  // MOSTRAR O FORMULÁRIO PARA ADICIONAR FORNECEDOR
  _showSupplierForm() {
    const header = document.querySelector(".form-header h3");
    const inputs = document.querySelectorAll(".form-new-supplier input");
    const input = document.querySelector(".form-new-supplier textarea");
    input.value = "";
    inputs.forEach((ip) => (ip.value = ""));
    header.textContent = "Adicionar Fornecedor";
    this.supplierFormContainer.classList.remove("hidden");
  }

  // FECHAR O FORMULÁRIO PARA ADICIONAR FONRCEDOR
  _closeSupplierForm(e) {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains("overlay-new-supplier")) {
      this.supplierFormContainer.classList.add("hidden");
    }
    if (target.closest(".close-form-new-supplier"))
      this.supplierFormContainer.classList.add("hidden");

    if (target.closest(".add-supplier-btn")) {
      this.supplierFormContainer.classList.add("hidden");
      this.succesPopupContainer.classList.remove("hidden");
    }
  }

  // USANDO O EVENT DELEGATION PARA OS EVENTOS NOS BOTÕES DO FORNECEDOR
  _editSupplierInfo(e) {
    const target = e.target;
    //EDITAR FORNECEDOR
    if (target.closest(".btn-edit-supplier")) {
      this._showSupplierForm();

      // DESCOMENTAR E USAR DADOS REAIS
      //CONFIGURANDO OS VALUES DO INPUT DO BASE O FORNECEDOR SELECIONADO
      // const id = +target.closest(".supplier-box").dataset.id;
      // this._settingEditSupplierInputValues(id);
    }

    //ELIMINAR FORNECEDOR
    if (target.closest(".btn-delete-supplier")) {
      this.deleteSupplierAlert.classList.remove("hidden");
    }
    // VER DETALHES DO FORNCEDOR
    if (target.closest(".btn-details-supplier")) {
      // DESCOMENTAR E PEGAR DADOS REAIS OU ID
      // CONFIRGURANDO AS INFORMAÇÕES DO CLIENTE COM BASE O ID
      // const id = +target.closest(".supplier-box").dataset.id;
      // this._settingSupplierDetailContent(id);
      this.supplerDetailContainer.classList.remove("hidden");
    }
  }

  // FECHAR O CONTAINER DE DETALHES DO FORNECEDOR
  _closeSupplierDetail(e) {
    const target = e.target;
    if (target.classList.contains("overlay-supplier-detail"))
      this.supplerDetailContainer.classList.add("hidden");

    if (target.closest(".close-detail-supplier"))
      this.supplerDetailContainer.classList.add("hidden");
  }

  // FUNÇÃO PARA PESQUISAR NA LISTA DE FORNECEDORES
  _filterSearchSupp() {
    const value = this.inputSearchSupplier.value.toLowerCase();
    const filtered = appData.supplier.filter((sup) =>
      sup.name.toLocaleLowerCase().startsWith(value)
    );
    this._pagination(filtered);
  }

  // FUNÇÃO PARA CLASSIFICAR A LISTA DE FORNCEDORES
  _sortBy(e) {
    const target = e.target.closest("span");
    if (!target) return;
    if (target.classList.contains("name")) this.sortByName();
  }

  // CLASSFICIAR EM ORDEM ALFABÉTICA
  sortByName() {
    const filtered = appData.supplier.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    this._pagination(filtered);
  }
  // CONFIGUTANDO OS VALUES NOS INPUTS PARA EDITAR INFORMAÇÕES DO FORNECEDOR
  _settingEditSupplierInputValues(e) {
    const supplier = appData.supplier.find((sup) => sup.id === e);
    const header = document.querySelector(".form-header h3");

    const inputSuppName = document.querySelector(".input-supplier-name");
    const inputSuppEmail = document.querySelector(".input-supplier-email");
    const inputSuppPhone = document.querySelector(".input-supplier-phone");
    const inputSuppProducts = document.querySelector(
      ".input-supplier-products"
    );
    const inputSuppDesc = document.querySelector(".input-supplier-description");
    header.textContent = "Editar Fornecedor";
    inputSuppName.value = supplier.name;
    inputSuppEmail.value = supplier.email;
    inputSuppPhone.value = supplier.phone;
    inputSuppProducts.value = supplier.products.join(", ");
    inputSuppDesc.value = supplier.description;
  }

  // CONFIGURANDO O CONTENT DOS DETALHES DO FORNECEDOR
  _settingSupplierDetailContent(e) {
    const supplier = appData.supplier.find((sup) => sup.id === e);
    const supplierName = document.querySelector(".supp-name-detail");
    const supplierEmail = document.querySelector(".supp-email-detail");
    const supplierPhone = document.querySelector(".supp-phone-detail");
    const supplierID = document.querySelector(".supp-ID-detail");
    const supplierDescription = document.querySelector(".supp-desc-detail");
    const supplierAddress = document.querySelector(".supp-address-detail");
    const supplierProducts = document.querySelector(".supp-products-detail");

    supplierName.textContent = supplier.name;
    supplierEmail.textContent = supplier.email;
    supplierPhone.textContent = supplier.phone;
    supplierID.textContent = supplier.id;
    supplierDescription.textContent = supplier.description;
    supplierProducts.textContent = supplier.products.join(", ");
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

    this.renderCurrentPage(this.currentPage, productList);
  }

  // RENDERIZAR PAGINAÇÃO
  renderPage(page, list) {
    this.startIndex = (page - 1) * this.productsPerPage;
    this.endIndex = this.startIndex + this.productsPerPage;
    //LISTA A SER RENDERIZADA
    this.productsToRender = list.slice(this.startIndex, this.endIndex);
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
  };

  // PÁGINA SEGUINTE
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderCurrentPage(this.currentPage, this.productList);
    }
    this.curPagelabel.textContent = this.currentPage;
  }

  // TODOS OS EVENTLISTENERS
  _allEventListeners() {
    // LINDANDO COM OS EVENT LISTNERS
    this.inputSearchSupplier?.addEventListener(
      "input",
      this._filterSearchSupp.bind(this)
    );
    this.sortByContainer?.addEventListener("click", this._sortBy.bind(this));
    this.btnShowNewSupplierForm?.addEventListener(
      "click",
      this._showSupplierForm.bind(this)
    );
    this.supplierFormContainer?.addEventListener(
      "click",
      this._closeSupplierForm.bind(this)
    );
    this.supplierListContainer?.addEventListener(
      "click",
      this._editSupplierInfo.bind(this)
    );

    this.succesPopupContainer?.addEventListener(
      "click",
      this._hideSuccesPopup.bind(this)
    );

    this.deleteSupplierAlert?.addEventListener(
      "click",
      this._hideAlert.bind(this)
    );
    this.supplerDetailContainer?.addEventListener(
      "click",
      this._closeSupplierDetail.bind(this)
    );

    this.btnNextPage?.addEventListener("click", this.goToNextPage.bind(this));
    this.btnPrevPage?.addEventListener(
      "click",
      this.goToPreviousPage.bind(this)
    );
  }

  // FUNÇÕES AUTO-INICIALIZADAS
  _init() {
    // this._pagination(appData.supplier);
  }
}
const supplier = new SupplierApp();
export { supplier };
