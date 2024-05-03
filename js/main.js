const toggleMenuBtn = document.querySelector(".toggleMenu__btn");
const body = document.querySelector("body");

toggleMenuBtn.addEventListener("click", function () {
  body.classList.toggle("menu-hidden");
});
console.log("Welcome");
