// FUNÇÃO DA PÁGINA DE PRODUCTOS
const productFunction = function () {
  const newProduct = document.querySelector(".btn-add-new-product");
  const formContainer = document.querySelector(".add-product-container");
  const cancelAddProduct = document.querySelector(".cancelar-new-product");
  const productContainer = document.querySelector(".estaticos");
  const btnCloseDetails = document.querySelector(".btn-close-details");
  const btnShowCategoryForm = document.querySelector(".btn-new-category");
  const categoryFormContainer = document.querySelector(".create-category");
  const btnCloseCategoryForm = document.querySelector(".close-category");
  // MOSTRANDO O FORMULÁRIO DE ADICIONAR PRODUCTO
  const detailsContainer = document.querySelector(".details-container");
  newProduct?.addEventListener("click", () =>
    formContainer.classList.remove("hidden")
  );
  //MOSTRAR O MINI FORMULÁRIO PARA ADICIONAR NOVA CATEGORIA
  btnShowCategoryForm?.addEventListener("click", () =>
    categoryFormContainer.classList.remove("hidden")
  );
  btnCloseCategoryForm?.addEventListener("click", () =>
    categoryFormContainer.classList.add("hidden")
  );
  //CANCELAR A ADIÇÃO DE PRODUCTO
  cancelAddProduct?.addEventListener("click", () =>
    formContainer.classList.add("hidden")
  );

  // EDITAR PRODUCTO
  productContainer?.addEventListener("click", function (e) {
    const target = e.target.closest(".btn-edit-product");
    if (!target) return;
    console.log(target);
    formContainer.classList.remove("hidden");
  });

  // VER DETALHES DO PRODUCTO
  productContainer?.addEventListener("click", function (e) {
    const target = e.target.closest(".btn-details-product");
    if (!target) return;
    console.log(target);
    detailsContainer.classList.remove("hidden");
  });

  btnCloseDetails?.addEventListener("click", () =>
    detailsContainer.classList.add("hidden")
  );
};
productFunction();

export { productFunction };
