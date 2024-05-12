const btnCloseBuyDetail = document.querySelector(".btn-close-buy-detail");
const clientBuyDetailContainer = document.querySelector(
  ".client-buy-detail-container"
);

btnCloseBuyDetail?.addEventListener("click", function () {
  clientBuyDetailContainer?.classList.add("hidden");
});

//////////////////////////////77
const actionClientBtns = document.querySelector(".action-client-btns");
const clientListContainer = document.querySelector(".client-container");
const clientDetailContainer = document.querySelector(
  ".section__client-details"
);
const btnBackToClientList = document.querySelector(".btn-back-to-client-list");

actionClientBtns?.addEventListener("click", function (e) {
  const target = e.target.closest(".btn-details-user");
  if (!target) return;
  clientListContainer.classList.add("hidden");
  clientDetailContainer.classList.remove("hidden");
});
btnBackToClientList?.addEventListener("click", function () {
  clientListContainer.classList.remove("hidden");
  clientDetailContainer.classList.add("hidden");
});

export { btnCloseBuyDetail };
