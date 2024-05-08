const sellFuntion = function () {
  const sellDetailContainer = document.querySelector(".sell-detail-container");
  const newSellFormContainer = document.querySelector(".new-sell-container");
  const btnShowNewSellForm = document.querySelector(".btn-add-new-sell");
  const btnCloseSellFormContainer = document.querySelector(
    ".btn-close-sell-form"
  );

  btnShowNewSellForm?.addEventListener("click", function (e) {
    sellDetailContainer?.classList.add("hidden");
    newSellFormContainer?.classList.remove("hidden");
  });
  btnCloseSellFormContainer?.addEventListener("click", function () {
    sellDetailContainer?.classList.remove("hidden");
    newSellFormContainer?.classList.add("hidden");
  });
};
sellFuntion();
export { sellFuntion };
