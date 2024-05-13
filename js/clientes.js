// REFACTORING THE CODE

class ClientApp {
  constructor() {
    // SELECIONANDO AS VARIÁVEIS
    this.actionClientBtns = document.querySelector(".action-client-btns");
    this.clientListContainer = document.querySelector(".client-container");
    this.clientDetailContainer = document.querySelector(
      ".section__client-details"
    );
    this.btnBackToClientList = document.querySelector(
      ".btn-back-to-client-list"
    );
    this.btnCloseBuyDetail = document.querySelector(".btn-close-buy-detail");
    this.clientBuyDetailContainer = document.querySelector(
      ".client-buy-detail-container"
    );
    this.clientHistoryContainer = document.querySelector(".history");
    this.clientBuyDetail = document.querySelector(
      ".client-buy-detail-container"
    );
    // EVENT LISTNERS
    this.btnCloseBuyDetail?.addEventListener(
      "click",
      this._closeBuyDetail.bind(this)
    );

    this.actionClientBtns?.addEventListener(
      "click",
      this._actionClient.bind(this)
    );
    this.btnBackToClientList?.addEventListener(
      "click",
      this._backToClient.bind(this)
    );
    this.clientHistoryContainer?.addEventListener(
      "click",
      this._clientHistoryFunction.bind(this)
    );
  }

  // FUNCÇÕES DOS EVENT LISTENERS
  _closeBuyDetail() {
    this.clientBuyDetailContainer?.classList.add("hidden");
  }
  _actionClient(e) {
    const target = e.target.closest(".btn-details-user");
    if (!target) return;
    this.clientListContainer.classList.add("hidden");
    this.clientDetailContainer.classList.remove("hidden");
  }
  _backToClient() {
    this.clientListContainer.classList.remove("hidden");
    this.clientDetailContainer.classList.add("hidden");
  }
  _clientHistoryFunction(e) {
    const target = e.target.closest(".btn-see-buy-detail");
    if (!target) return;
    this.clientBuyDetailContainer.classList.remove("hidden");
  }
}
const client = new ClientApp();
export { client };
