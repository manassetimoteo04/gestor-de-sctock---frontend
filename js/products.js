// FUNÇÃO DA PÁGINA DE PRODUCTOS
const productContainer = document.querySelector(".estaticos");
const productFunction = function () {
  const newProduct = document.querySelector(".btn-add-new-product");
  const formContainer = document.querySelector(".add-product-container");
  const cancelAddProduct = document.querySelector(".cancelar-new-product");
  const btnCloseDetails = document.querySelector(".btn-close-details");
  const btnShowCategoryForm = document.querySelector(".btn-new-category");
  const categoryFormContainer = document.querySelector(".create-category");
  const btnCloseCategoryForm = document.querySelector(".close-category");
  const btnCloseNewProductForm = document.querySelector(
    ".btn-close-add-new-product"
  );
  // MOSTRANDO O FORMULÁRIO DE ADICIONAR PRODUCTO
  const detailsContainer = document.querySelector(".details-container");
  newProduct?.addEventListener("click", () =>
    formContainer.classList.remove("hidden")
  );
  btnCloseNewProductForm?.addEventListener("click", () =>
    formContainer.classList.add("hidden")
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
    formContainer.classList.remove("hidden");
  });

  // VER DETALHES DO PRODUCTO
  productContainer?.addEventListener("click", function (e) {
    const target = e.target.closest(".btn-details-product");
    if (!target) return;
    console.log(target);
    detailsContainer.classList.remove("hidden");
  });
  //FECHAR DETALHES DO PRODUCTO
  btnCloseDetails?.addEventListener("click", () =>
    detailsContainer.classList.add("hidden")
  );
};
productFunction();

// DADOS FICTICIOS DE PRODUCTOS PARA TRABALHAR COM A FUNCIONALIDADE DO SEACRCH, ELIMIÇÃO E PAGINAÇÃO DOS PRODUCTOS
const productList = [];

//CONSTRUCTOR FUNTION PARA CRIAÇÃO DOS PRODUCTOS
const CreateProduct = function (
  name,
  category,
  quantity,
  date,
  sellPrice,
  buyPrice,
  SKUCode,
  description
) {
  this.name = name;
  this.category = category;
  this.quantity = quantity;
  this.date = date;
  this.sellPrice = sellPrice;
  this.buyPrice = buyPrice;
  this.SKUCode = SKUCode;
  this.description = description;
  this.searchData = this.name.toLowerCase();
};

// prettier-ignore
let alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

for (let i = 1; i <= 100; i++) {
  const randomIndex = Math.floor(Math.random() * 16) + 1;
  const product = new CreateProduct(
    `${alfabeto[randomIndex]}${alfabeto[randomIndex]}${alfabeto[randomIndex]} Product ${i}`,
    `Category ${i % 5}`,
    Math.floor(Math.random() * 100) + 1, // Quantidade aleatória entre 1 e 100
    "12/10/2024",
    Math.floor(Math.random() * 10000) + 1, // Preço de venda aleatório entre 1 e 10000
    Math.floor(Math.random() * 5000) + 1, // Preço de compra aleatório entre 1 e 5000
    `SKU00${i}`,
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit placeat error autem nihil."
  );

  productList.push(product);
}
// ADICIONANDO OS DADOS NA LISTA

//OBS: DADOS FICTICIOS PARA FAZER O FUNCIONAMENTO DO SEARCH BAR NO INPUT SEADH DA PARTE DOS PRODUCTOS
// RENDERIZAÇÃO DOS PRODUCTOS NA LISTA
const renderProductList = function (arrList) {
  // SE A LISTA DE ERRAY ESTIVER VAZIA VAI RENDELIZAR LISTA FAZIA
  if (arrList.length === 0) {
    document
      .querySelector(".product-list")
      .insertAdjacentHTML(
        "afterbegin",
        `<p classs="sem-resul">Nenhum producto encontrado </p>`
      );
  } else {
    // RENDERIZAR ELEMENTO HTML NO DOM PARA A LISTA
    const listContainer = document.querySelector(".product-list");
    // VERIFICAR SE P LISTCONTANER NÃO É UNDEFINED PARA NÃO DAR ERRO QUANDO É ABERTO OUTRAS PÁGINAS DA APLICAÇÃO
    if (listContainer) listContainer.innerHTML = "";
    arrList.forEach((element) => {
      let html = `
    <div class="product-item" data-id="${element.SKUCode}">
       <!-- NOME DO PRODUCTO -->
       <div>
           <span class="select-btn"><ion-icon
                   name="caret-down-outline"></ion-icon></ion-icon></span>
           <span class="product-name">${element.name} </span>
       </div>
       <span class="product-category">${element.category}</span>
       <span class="product-price">$ ${element.sellPrice}</span>
       <span class="product-qtd">${element.quantity}</span>
       <span class="product-date">${element.date}</span>
       <!-- ACÇÃO DO PRODUCTO, EDITAR, ELIMINAR, VER DETALHES -->
       <span class="product-action">
           <button class="btn-edit-product"><ion-icon
                   name="create-outline"></ion-icon></button>
           <button class="btn-delete-product"><ion-icon
                   name="trash-outline"></ion-icon></button>
           <button class="btn-details-product"><ion-icon
                   name="ellipsis-vertical-outline"></ion-icon></button>
       </span>
   </div>
    `;
      // VERIFICAR NOVAMENTO SE O LISTCONTAINER NÃO É UNDEFINED
      if (listContainer) listContainer.insertAdjacentHTML("afterbegin", html);
    });
  }
};

// FUNÇÃO PARA ALERTA DE CONFIRMAÇÃO DE ELIMINAÇÃO DE UM PRODUCTO
const alertConfirmFunction = function () {
  let target;
  // SELECIONANDO AS VARIÁVEIS DOS BOTÕES E DO CONTAINER
  const btnConfirmDelete = document.querySelector(".confirm-delete-btn");
  const btnCancelDelete = document.querySelector(".cancel-delete-btn");
  const alerDeleteMsgContainer = document.querySelector(
    ".alert-message-container"
  );

  // EVENTO DE CLICQUE NO BOTÃO DE CANCELAMENTO DA ELIMINAÇÃO DO PRODUCTO
  btnCancelDelete?.addEventListener("click", () =>
    alerDeleteMsgContainer.classList.add("hidden")
  );

  // USANDO O EVENT TARGET PARA PEGAR A REFERÊNCIA DO PRODUCTO QUE FOI CLICADO
  productContainer?.addEventListener("click", function (e) {
    target = e.target.closest(".btn-delete-product");
    if (!target) return;
    alerDeleteMsgContainer.classList.remove("hidden");
  });
  // FUNÇÃO PARA CONFIRMAÇÃO DE ELIMINAÇÃO DO PRODUCTO
  const deleteProduct = function () {
    // PEGANDO O PARENT COM A CLASS PRODUCT ITEM COM O EVENTO TARGET
    const item = target.closest(".product-item");

    // PEGANDO O DATA-SET.ID NO ELEMENTO DOM,  PARA COMPARAR COM O ID DOS ELEMENTOS NA LISTA DE PRODUCTOS
    const index = item.dataset.id;
    const product = productList.find((i) => i.SKUCode === index);
    const i = productList.indexOf(product);
    // MODIFICANDO A LISTA DE ERRAY E ELIMINANDO O ELEMENTO SELECIONADO COM O MÉTODO SPLICE QUE MUTA O ERRAY ORIGIANL
    productList.splice(i, 1);
    if (productList.length === 1) productList.splice(1);

    // RENDERIZANDO A LISTA DE ERRAY COM O ERRAY MUTADO ATÉ A ESTE PONTO
    renderProductList(productList);

    // ESCONDENDO O PAINEL DE CONFIRMAÇÃO DE ELIMINAÇÃO
    alerDeleteMsgContainer.classList.add("hidden");
    // ALERTA DE SUCESSO NO PROCESSO DE ELIMINAÇÃO
    document
      .querySelector(".delete-confirmed-message")
      .classList.remove("hidden");
    // ESCONDENDO APÓS 1,5 SEGUNDOS
    setTimeout(
      () =>
        document
          .querySelector(".delete-confirmed-message")
          .classList.add("hidden"),
      1500
    );
  };
  // CHAMANDO O EVENTO DE CLIQUE NO BOTÃO DE CONFIRMAR
  btnConfirmDelete?.addEventListener("click", deleteProduct);
};
alertConfirmFunction();

// FUNÇÃO PARA A PAGINAÇÃO DA LISTA COM UM LIMITE DE 10 PRODUCTOS POR PÁGINA
const paginationRender = function (productList) {
  const prevPageBtn = document.querySelector(".btn-previous-page");
  const nextPageBtn = document.querySelector(".btn-next-page");
  const curPagelabel = document.querySelector(".curr-page-number");
  const curPage = document.querySelector(".current-product-page");
  const totalPageslabel = document.querySelector(".total-pages");

  if ((curPagelabel, curPagelabel, totalPageslabel)) {
    const productsPerPage = 7;
    let currentPage = 1;
    const totalPages = Math.ceil(productList.length / productsPerPage);
    totalPageslabel.textContent = totalPages;
    // Função para renderizar uma página específica da lista de produtos
    const renderPage = function (page) {
      const startIndex = (page - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const productsToRender = productList.slice(startIndex, endIndex);
      renderProductList(productsToRender);
    };

    // Função para renderizar a lista de produtos na página atual
    const renderCurrentPage = function () {
      renderPage(currentPage);
    };

    // Função para navegar para a página anterior
    const goToPreviousPage = function () {
      if (currentPage > 1) {
        currentPage--;
        renderCurrentPage();
      }
      curPagelabel.textContent = currentPage;
      curPage.textContent = currentPage;
    };

    // Função para navegar para a próxima página
    const goToNextPage = function () {
      if (currentPage < totalPages) {
        currentPage++;
        renderCurrentPage();
      }
      curPagelabel.textContent = currentPage;
      curPage.textContent = currentPage;
    };
    // Adiciona eventos aos botões de navegação

    prevPageBtn.addEventListener("click", goToPreviousPage);
    nextPageBtn.addEventListener("click", goToNextPage);
    // Renderiza a página inicial
    renderCurrentPage();
  }
};

paginationRender(productList);
// FUNÇÃO PARA DE PESQUISA

const searchFunction = function () {
  // PEGANDO O VALOR DO INPUT DO SEARCH BAR
  const searchInput = document.querySelector(".input__search");

  // ADICIONAR UM EVENTO DE PRESSIONAR O TECLADO NO INPUT SEARCH
  searchInput.addEventListener("keypress", function (e) {
    // TRANSFORMANDO O VALOR DO INPUT EM MINUSCULA PARA FACILITAR SEMPRE NA COMPARAÇÃO
    const value = searchInput.value.toLowerCase();
    // FILTRAR ELEMENTOS DO PRODUCT LIST COM O MÉTODO FILTER, COM PASSE NA CONDIÇÃO QUE RETORNA VERDADEIRA
    const result = productList.filter((item) => {
      return item.searchData.startsWith(value);
    });

    // LIMPANDO O CONTAINER PARA DEPOIS RENDERIZAR O RESULTADO DA PESQUISA NO CONTAINER DA LISTA
    document.querySelector(".product-list").innerHTML = "";
    paginationRender(result);
  });

  // FUNÇÃO PARA VOLTAR A RENDERIZAR A LISTA INTEIRA SEMPRE O INPUT ESTIVER VAZIA
  searchInput.addEventListener("keydown", function (e) {
    console.log(e.key);
    if (searchInput.value === "" && e.key === "Backspace")
      paginationRender(productList);
  });
};
searchFunction();
export { productFunction };
