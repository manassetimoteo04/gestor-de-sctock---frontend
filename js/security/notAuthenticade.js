class NOTAuthenticated {
  constructor() {
    this._notAuthenticated();
  }
  _notAuthenticated() {
    const isLoged = JSON.parse(localStorage.getItem("loged"));

    if (isLoged === false) {
      const pathParts = window.location.pathname.split("/");
      const depth = pathParts.length - 2;

      let loginPath = "/login.html";
      for (let i = 0; i < depth; i++) {
        loginPath = ".." + loginPath;
      }
      console.log(loginPath);
      window.location.href = loginPath;
    }
  }
}

const AUTHENTICATION = new NOTAuthenticated();
