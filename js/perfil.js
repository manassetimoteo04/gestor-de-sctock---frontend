// REFACTORING THE CODE

class ProfileApp {
  constructor() {
    this.accounMenuContainer = document.querySelector(".account-menu");
    this.inforBoxes = document.querySelectorAll(".account-box");
    this.btnCloseEditProfileForm = document.querySelector(
      ".btn-close-edit-profile"
    );
    this.btnShowEditProfileForm = document.querySelector(
      ".btn-edit-profile-info"
    );
    this.editProfileContainer = document.querySelector(
      ".edit-profile-information"
    );
    this.fieldsInputs = document.querySelectorAll(".field input");
    this.fields = document.querySelectorAll(".field");
    this.btnShowEditPasswordForm = document.querySelector(".password");
    this.passwordForm = document.querySelector(".edit-user-password");
    this.closeEditPasssordForm = document.querySelector(
      ".btn-close-edit-password"
    );

    this.showDeleteAccountBox = document.querySelector(".delete-account");
    this.alertDeleteContainer = document.querySelector(
      ".delete-alert-notification"
    );
    this.alertDeleteBox = document.querySelector(".alert-message-container");
    this.alertMessageBtns = document.querySelector(".alert-message-btns");

    this.confirmDeleteAccountBox = document.querySelector(
      ".confirm-delete-password"
    );
    this.deleteAccountBtn = document.querySelector(".delete-account-btn");
    this.closeDeleteConfirmPassword = document.querySelector(
      ".btn-close-delete-account"
    );

    // event listners
    this.accounMenuContainer?.addEventListener(
      "click",
      this._toggleActiveMenu.bind(this)
    );
    this.btnCloseEditProfileForm?.addEventListener(
      "click",
      this._closeEditForm.bind(this)
    );
    this.btnShowEditProfileForm?.addEventListener(
      "click",
      this._showEditForm.bind(this)
    );
    this.btnShowEditPasswordForm?.addEventListener(
      "click",
      this._showEditPasswordForm.bind(this)
    );
    this.closeEditPasssordForm?.addEventListener(
      "click",
      this._closeEditPasswordForm.bind(this)
    );
    this.showDeleteAccountBox?.addEventListener(
      "click",
      this._showDeleteAlertContainer.bind(this)
    );
    this.alertMessageBtns?.addEventListener(
      "click",
      this._alertMessageBtns.bind(this)
    );
    this.closeDeleteConfirmPassword?.addEventListener(
      "click",
      this._closeDeleteAlertContainer.bind(this)
    );

    // chamando funções
    this._floatingLabel();
  }
  _toggleActiveMenu(e) {
    const target = e.target.closest("ul li");
    if (!target) return;
    const [classNAme] = target.classList;
    document
      .querySelectorAll("ul li")
      .forEach((li) => li.classList.remove("active-menu"));
    document
      .querySelector(`.account-menu ul .${classNAme}`)
      .classList.add("active-menu");

    this.inforBoxes.forEach((box) => box.classList.add("hidden"));
    const contianer = document.querySelector(`.${classNAme}-box`);
    contianer.classList.remove("hidden");
  }

  _closeEditForm() {
    this.editProfileContainer.classList.add("hidden");
  }
  _showEditForm() {
    this.editProfileContainer.classList.remove("hidden");
  }
  _floatingLabel() {
    this.fieldsInputs?.forEach((input) => {
      input.addEventListener("focus", function () {
        const target = input.closest(".field");
        target.classList.add("active");
      });

      input.addEventListener("blur", function () {
        if (this.value === "") {
          const target = input.closest(".field");

          target.classList.remove("active");

          this.nextElementSibling.classList.remove("active");
        }
      });

      if (input.value !== "") {
        const target = input.closest(".field");
        target.classList.add("active");
      }
    });
    // this.fields.forEach((fld) => {
    //   fld.addEventListener("click", function (e) {
    //     alert();
    //     const target = e.target.closest(".field input");
    //   });
    // });
  }

  // FUNCÇÕES DOS EVENT LISTENERS
  _showEditPasswordForm() {
    this.passwordForm.classList.remove("hidden");
  }
  _closeEditPasswordForm() {
    this.passwordForm.classList.add("hidden");
  }
  _showDeleteAlertContainer() {
    this.alertDeleteContainer.classList.remove("hidden");
  }
  _closeDeleteAlertContainer() {
    this.alertDeleteContainer.classList.add("hidden");
    this.confirmDeleteAccountBox.classList.add("hidden");
    this.alertDeleteBox.classList.remove("hidden");
  }
  _alertMessageBtns(e) {
    const target = e.target;
    if (target.closest(".confirm-alert")) {
      this.confirmDeleteAccountBox.classList.remove("hidden");
      this.alertDeleteBox.classList.add("hidden");
    }
    if (target.closest(".cancel-alert")) {
      this._closeDeleteAlertContainer();
    }
  }
}
const profile = new ProfileApp();
export { profile };
