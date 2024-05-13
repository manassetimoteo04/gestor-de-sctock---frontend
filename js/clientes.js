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
    this.clientHistoryContainer = document.querySelector(".client-history");
    this.clientBuyDetail = document.querySelector(
      ".client-buy-detail-container"
    );
    this.clientMenuList = document.querySelector(".client-menu");

    this.clientInformationBox = document.querySelector(
      ".client-information-box"
    );
    this.clientListHistoryBox = document.querySelector(".client-list-history");
    this.btnCloseAddClientForm = document.querySelector(
      ".close-form-new-client"
    );
    this.newClientFormContainer = document.querySelector(
      ".add-new-client-container"
    );
    this.btnShowNewClientForm = document.querySelector(".btn-add-client");
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
    this.clientMenuList?.addEventListener(
      "click",
      this._clientToggleMenu.bind(this)
    );
    this.btnShowNewClientForm?.addEventListener(
      "click",
      this._showNewClientForm.bind(this)
    );
    this.btnCloseAddClientForm?.addEventListener(
      "click",
      this._closeNewClientForm.bind(this)
    );
    // this.newClientFormContainer?.addEventListener(
    //   "click",
    //   this._closeNewClientForm.bind(this)
    // );
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
  _clientToggleMenu(e) {
    this.link = e.target;
    this.afterElement = document.querySelector(".client-menu::after");
    if (this.link.closest(".link-client-profile")) {
      // const link = link.closest(".link-client-profile")
      // link.add
      this.clientInformationBox.classList.remove("hideClientInfo");
      this.clientListHistoryBox.classList.add("hideClientInfo");
    }
    if (this.link.closest(".link-client-historic")) {
      console.log(this.afterElement);
      this.clientInformationBox.classList.add("hideClientInfo");
      this.clientListHistoryBox.classList.remove("hideClientInfo");
    }
  }
  _showNewClientForm() {
    this.newClientFormContainer.classList.remove("hidden");
  }
  _closeNewClientForm() {
    this.newClientFormContainer.classList.add("hidden");
  }
}
const client = new ClientApp();
export { client };
