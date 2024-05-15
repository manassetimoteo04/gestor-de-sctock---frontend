// REFACTORING THE CODE

class SupplierApp {
  constructor() {
    // SELECIONANDO AS VARIÁVEIS
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
    // LINDANDO COM OS EVENT LISTNERS
    this.btnShowNewSupplierForm.addEventListener(
      "click",
      this._showSupplierForm.bind(this)
    );
    this.btnCloseNewSupplierForm.addEventListener(
      "click",
      this._closeSupplierForm.bind(this)
    );
    this.supplierListContainer.addEventListener(
      "click",
      this._editSupplierInfo.bind(this)
    );
    this.supplierListContainer.addEventListener(
      "click",
      this._showSupplierDetail.bind(this)
    );
    this.closeSupplierDetail.addEventListener(
      "click",
      this._closeSupplierDetail.bind(this)
    );
  }
  // FUNCÇÕES DOS EVENT LISTENERS

  _showSupplierForm() {
    this.supplierFormContainer.classList.remove("hidden");
  }
  _closeSupplierForm() {
    this.supplierFormContainer.classList.add("hidden");
  }
  _editSupplierInfo(e) {
    const target = e.target.closest(".btn-edit-supplier");
    if (!target) return;
    this._showSupplierForm();
  }
  _showSupplierDetail(e) {
    const target = e.target.closest(".btn-details-supplier");
    if (!target) return;
    this.supplerDetailContainer.classList.remove("hidden");
  }
  _closeSupplierDetail() {
    this.supplerDetailContainer.classList.add("hidden");
  }
}
const supplier = new SupplierApp();
export { supplier };
