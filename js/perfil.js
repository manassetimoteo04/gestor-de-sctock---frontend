// REFACTORING THE CODE

import { appData } from "./data.js";

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
    this.filedsLabel = document.querySelectorAll(".field label");
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

    this.popupSuccessUpdateInfo = document.querySelector(
      ".alert-information-update"
    );
    this.editPasswordForm = document.querySelector(".edit-password-form");
    // event listners
    this.accounMenuContainer?.addEventListener(
      "click",
      this._toggleActiveMenu.bind(this)
    );
    this.editProfileContainer?.addEventListener(
      "click",
      this._closeEditForm.bind(this)
    );
    this.btnShowEditProfileForm?.addEventListener(
      "click",
      this._showEditForm.bind(this)
    );
    this.popupSuccessUpdateInfo?.addEventListener(
      "click",
      this._closeSuccesUpdadePopup.bind(this)
    );
    this.btnShowEditPasswordForm?.addEventListener(
      "click",
      this._showEditPasswordForm.bind(this)
    );
    this.passwordForm?.addEventListener(
      "click",
      this._closeEditPasswordForm.bind(this)
    );
    // this.closeEditPasssordForm?.addEventListener(
    //   "click",
    //   this._closeEditPasswordForm.bind(this)
    // );
    this.showDeleteAccountBox?.addEventListener(
      "click",
      this._showDeleteAlertContainer.bind(this)
    );
    this.alertMessageBtns?.addEventListener(
      "click",
      this._alertMessageBtns.bind(this)
    );
    this.alertDeleteContainer?.addEventListener(
      "click",
      this._closeDeleteAlertContainer.bind(this)
    );
    this.editPasswordForm?.addEventListener(
      "click",
      this._showHidePassword.bind(this)
    );
    // chamando funções
    this._floatingLabel();
    this._renderUserInformatio();
    this._initializeInputLabels();
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

  _closeEditForm(e) {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains("overlay-edit-profile"))
      this.editProfileContainer.classList.add("hidden");
    if (target.closest(".btn-close-edit-profile"))
      this.editProfileContainer.classList.add("hidden");
    if (target.closest(".btn-save-profile-info")) {
      this.editProfileContainer.classList.add("hidden");
      this._showSuccesUpatInfoPopUp();
    }
  }
  _showEditForm() {
    this.editProfileContainer.classList.remove("hidden");

    this._settingEditProfileInputValue();
    this._initializeInputLabels();
  }

  _initializeInputLabels() {
    this.fieldsInputs.forEach((input) => {
      if (input.value !== "") {
        const target = input.closest(".field");
        target.classList.add("active");
      }
    });
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
    });

    this.filedsLabel.forEach((lbl) => {
      lbl.addEventListener("click", function () {
        const target = lbl.closest(".field");
        target.classList.add("active");
        const sibl = target.children;
        sibl[0].focus();
      });
    });
  }

  // FUNCÇÕES DOS EVENT LISTENERS
  _showEditPasswordForm() {
    this.passwordForm.classList.remove("hidden");
  }
  _showSuccesUpatInfoPopUp() {
    this.popupSuccessUpdateInfo.classList.remove("hidden");
  }
  _closeSuccesUpdadePopup(e) {
    const target = e.target;
    if (target.classList.contains("overlay-sucess-update"))
      this.popupSuccessUpdateInfo.classList.add("hidden");
    if (target.closest(".btn-close-succes-update-popup"))
      this.popupSuccessUpdateInfo.classList.add("hidden");
  }
  _closeEditPasswordForm(e) {
    const target = e.target;
    if (target.classList.contains("overlay-edit-password")) {
      this.passwordForm.classList.add("hidden");
    }
    if (target.closest(".btn-close-edit-password")) {
      this.passwordForm.classList.add("hidden");
    }
  }
  _showDeleteAlertContainer() {
    this.alertDeleteContainer.classList.remove("hidden");
  }
  _closeDeleteAlertContainer(e) {
    const target = e.target;
    if (target.classList.contains("overlay-delete-account")) {
      this.alertDeleteContainer.classList.add("hidden");
      this.confirmDeleteAccountBox.classList.add("hidden");
      this.alertDeleteBox.classList.remove("hidden");
    }
    if (target.closest(".cancel-alert")) {
      this.alertDeleteContainer.classList.add("hidden");
      this.confirmDeleteAccountBox.classList.add("hidden");
      this.alertDeleteBox.classList.remove("hidden");
    }
    if (target.closest(".delete-account-btn")) {
      this.alertDeleteContainer.classList.add("hidden");
      this.confirmDeleteAccountBox.classList.add("hidden");
      this.alertDeleteBox.classList.remove("hidden");
      this._showSuccesUpatInfoPopUp();
    }
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

  _renderUserInformatio() {
    const userFullNameLabel = document.querySelector(".user-full-name");
    const accountTypeLabel = document.querySelector(".account-type");
    const usernameLabel = document.querySelector(".username");
    const firstNameLabel = document.querySelector(".first-name");
    const secondNameLabel = document.querySelector(".second-name");
    const userEmailLabel = document.querySelector(".user-email");
    const userPhoneLabel = document.querySelector(".user-phone");
    const userBioLabel = document.querySelector(".user-bio");
    const usernameLabel2 = document.querySelector(".user-name");
    const userCountryLabel = document.querySelector(".user-country");
    const userProvinceLabel = document.querySelector(".user-province");
    const userTown = document.querySelector(".user-township");
    const userNeihgborLabel = document.querySelector(".user-neighbor");
    if (!userBioLabel) return;
    // SETTING THE CONTENT
    const [first, second] = appData.loggedInUser.name.split(" ");

    const [country, province, city, neighbor] =
      appData.loggedInUser.userInfo.address.split(", ");
    userFullNameLabel.textContent = appData.loggedInUser.name;
    accountTypeLabel.textContent = appData.loggedInUser.role;
    usernameLabel.textContent = appData.loggedInUser.username;
    firstNameLabel.textContent = first;
    secondNameLabel.textContent = second;
    userEmailLabel.textContent = appData.loggedInUser.userInfo.email;
    userBioLabel.textContent = appData.loggedInUser.userInfo.bio;
    userPhoneLabel.textContent = appData.loggedInUser.userInfo.phone;
    usernameLabel2.textContent = appData.loggedInUser.username;
    userCountryLabel.textContent = country;
    userProvinceLabel.textContent = province;
    userTown.textContent = city;
    userNeihgborLabel.textContent = neighbor;
  }

  _settingEditProfileInputValue() {
    const inputFistName = document.querySelector(".input-edit-first-name");
    const inputLastName = document.querySelector(".input-edit-last-name");
    const inputEmail = document.querySelector(".input-edit-email");
    const inputPhone = document.querySelector(".input-edit-phone");
    const inputBio = document.querySelector(".input-edit-bio");
    const inputUsername = document.querySelector(".input-edit-username");
    const inputCountry = document.querySelector(".input-edit-country");
    const inputProvince = document.querySelector(".input-edit-province");
    const inputNeighbor = document.querySelector(".input-edit-neighbor");
    const inputTown = document.querySelector(".input-edit-town");

    const [first, second] = appData.loggedInUser.name.split(" ");

    const [country, province, city, neighbor] =
      appData.loggedInUser.userInfo.address.split(", ");

    // CONFIGURANDO OS VALUES
    inputFistName.value = first;
    inputLastName.value = second;
    inputEmail.value = appData.loggedInUser.userInfo.email;
    inputPhone.value = appData.loggedInUser.userInfo.phone;
    inputBio.value = appData.loggedInUser.userInfo.bio;
    inputUsername.value = appData.loggedInUser.username;
    inputCountry.value = country;
    inputProvince.value = province;
    inputTown.value = city;
    inputNeighbor.value = neighbor;
  }

  _showHidePassword(e) {
    const target = e.target.closest(".see-box");
    if (!target) return;
    const input = target.previousElementSibling;
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");

    const childs = target.children;
    childs[0].classList.toggle("hidden");
    childs[1].classList.toggle("hidden");
  }
}
const profile = new ProfileApp();
export { profile };
