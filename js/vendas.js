// REFACTORING THE CODE

class VendasApp {
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
    //LIDANDO COM OS EVENTLISTNERS
    this.btnShowNewSellForm?.addEventListener(
      "click",
      this._showNewSellFunction.bind(this)
    );
    this.sellHistoryContainer?.addEventListener(
      "click",
      this._showsellDetail.bind(this)
    );
    this.btnCloseSellFormContainer?.addEventListener(
      "click",
      this._closeSellFormFunction.bind(this)
    );
    this.btnCloseSellDetail?.addEventListener(
      "click",
      this._closeSellDetailFunction.bind(this)
    );
    this.btnHideSingleDetail?.forEach(
      this._hideSingleDetailFunction.bind(this)
    );

    this.selectProductInput?.addEventListener(
      "click",
      this._selectProductFunction.bind(this)
    );

    //
    this._miniListItemFunction(this);
  }
  _showsellDetail(e) {
    const target = e.target.closest(".sell-box");
    if (!target) return;
    this.sellDetailContainer.classList.remove("hidden");
    this.sellDetailContainer.classList.remove("hide-detail");
  }
  _showNewSellFunction() {
    this.sellDetailContainer.classList.add("hidden");
    this.newSellFormContainer.classList.remove("hidden");
  }
  _closeSellFormFunction() {
    this.sellDetailContainer.classList.remove("hidden");
    this.sellDetailContainer.classList.add("hide-detail");
    this.newSellFormContainer.classList.add("hidden");
  }
  _closeSellDetailFunction() {
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
  _hideMiniList() {
    this.miniProductList.classList.add("hidden");
  }
}
const sellApp = new VendasApp();

export { sellApp };
