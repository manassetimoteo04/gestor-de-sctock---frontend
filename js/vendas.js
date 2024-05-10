const sellFuntion = function () {
  const sellDetailContainer = document.querySelector(".section-sell-ditails");
  const newSellFormContainer = document.querySelector(".section-new-sell");
  const btnShowNewSellForm = document.querySelector(".btn-add-new-sell");
  const btnCloseSellFormContainer = document.querySelector(
    ".btn-close-sell-form"
  );
  const btnCloseSellDetail = document.querySelector(".btn-close-sell-details");

  btnShowNewSellForm?.addEventListener("click", function (e) {
    sellDetailContainer?.classList.add("hidden");
    newSellFormContainer?.classList.remove("hidden");
  });
  btnCloseSellFormContainer?.addEventListener("click", function () {
    sellDetailContainer?.classList.remove("hidden");
    newSellFormContainer?.classList.add("hidden");
  });
  btnCloseSellDetail?.addEventListener("click", function () {
    sellDetailContainer?.classList.add("hidden");
  });

  // ESCONDENDO O DETAIL
  const btnHideSingleDetail = document.querySelectorAll(".hide-dett");
  btnHideSingleDetail.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const name = btn.dataset.class;
      const target = document.querySelector(`.${name}`);
      console.log(target);
      target.classList.toggle("hidden");
    });
  });

  // /////////////////////////////////////////////
  const selectProductInput = document.querySelector(".select-product-input");
  const miniProductList = document.querySelector(".product-list-select");
  selectProductInput?.addEventListener("click", function (e) {
    miniProductList.classList.remove("hidden");
  });
  const listItem = document.querySelectorAll(".product-list-select ul li");
  listItem?.forEach((item) => {
    item.addEventListener("click", function () {
      miniProductList.classList.add("hidden");
    });
  });
};

export { sellFuntion };
