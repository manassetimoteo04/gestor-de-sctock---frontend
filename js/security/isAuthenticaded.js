class isAuthenticated {
  constructor() {
    this._isAuthenticated();
  }
  _isAuthenticated() {
    const isLoged = JSON.parse(localStorage.getItem("loged"));

    if (isLoged === true) {
      window.location.href = "index.html";
    }
  }
}

const AUTHENTICATION = new isAuthenticated();
