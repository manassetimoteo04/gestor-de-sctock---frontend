class NOTAuthenticated {
  constructor() {
    this._notAuthenticated();
  }
  _notAuthenticated() {
    const isLoged = JSON.parse(localStorage.getItem("loged"));

    if (!isLoged) {
      window.location.href = "../index.html";
    }
  }
}

const AUTHENTICATION = new NOTAuthenticated();
