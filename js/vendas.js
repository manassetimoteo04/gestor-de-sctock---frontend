// const sellFuntion = function () {
//   const sellDetailContainer = document.querySelector(".section-sell-ditails");
//   const newSellFormContainer = document.querySelector(".section-new-sell");
//   const btnShowNewSellForm = document.querySelector(".btn-add-new-sell");
//   const btnCloseSellFormContainer = document.querySelector(
//     ".btn-close-sell-form"
//   );
//   const btnCloseSellDetail = document.querySelector(".btn-close-sell-details");

//   btnShowNewSellForm?.addEventListener("click", function (e) {
//     sellDetailContainer?.classList.add("hidden");
//     newSellFormContainer?.classList.remove("hidden");
//   });
//   btnCloseSellFormContainer?.addEventListener("click", function () {
//     sellDetailContainer?.classList.remove("hidden");
//     newSellFormContainer?.classList.add("hidden");
//   });
//   btnCloseSellDetail?.addEventListener("click", function () {
//     sellDetailContainer?.classList.add("hidden");
//   });

//   // ESCONDENDO O DETAIL
//   const btnHideSingleDetail = document.querySelectorAll(".hide-dett");
//   btnHideSingleDetail.forEach((btn) => {
//     btn.addEventListener("click", function (e) {
//       const name = btn.dataset.class;
//       const target = document.querySelector(`.${name}`);
//       console.log(target);
//       target.classList.toggle("hidden");
//     });
//   });

//   // /////////////////////////////////////////////
//   const selectProductInput = document.querySelector(".select-product-input");
//   const miniProductList = document.querySelector(".product-list-select");
//   selectProductInput?.addEventListener("click", function (e) {
//     miniProductList.classList.remove("hidden");
//   });
//   const listItem = document.querySelectorAll(".product-list-select ul li");
//   listItem?.forEach((item) => {
//     item.addEventListener("click", function () {
//       miniProductList.classList.add("hidden");
//     });
//   });
// };

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
    this.miniListItem = document.querySelectorAll(".product-item-select");
    //LIDANDO COM OS EVENTLISTNERS
    this.btnShowNewSellForm?.addEventListener(
      "click",
      this._showNewSellFunction.bind(this)
    );
    this.btnCloseSellFormContainer?.addEventListener(
      "click",
      this._closeSellFormFunction.bind(this)
    );
    this.btnCloseSellDetail?.addEventListener(
      "click",
      this._closeSellDetailFunction
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
  _showNewSellFunction() {
    console.log(this.sellDetailContainer);
    this.sellDetailContainer.classList.add("hidden");
    this.newSellFormContainer.classList.remove("hidden");
  }
  _closeSellFormFunction() {
    this.sellDetailContainer.classList.remove("hidden");
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
