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
};
sellFuntion();
export { sellFuntion };
