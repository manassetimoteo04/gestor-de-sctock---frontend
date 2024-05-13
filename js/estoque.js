// Defina a função stockFunction
import { productList } from "./products.js";

//REFACTORING THE CODE

class StockApp {
  index;
  lowStockProductList;
  constructor() {
    // SELECIONADO AS VARIAVEIS
    this.ctx = document.getElementById("pieChart");
    this.lowStockForm = document.querySelector(".low-stock-edit-container");
    this.lowStockContainer = document.querySelector(".low-stock-list");
    this.btnUpdateStockConfirm = document.querySelector(
      ".confirm-update-product"
    );
    this.inputQuantityUpdate = document.querySelector(".update-quantity-input");
    this.listContainer = document.querySelector(".low-stock-list");
    // LIDANDO COM EVENT LISTNERS
    this.lowStockContainer?.addEventListener(
      "click",
      this._updateStock.bind(this)
    );
    this.btnUpdateStockConfirm?.addEventListener(
      "click",
      this._confirmUpdateStock.bind(this)
    );

    this._filterLowStockProduct();
    this._renderLowStockProduct(this.lowStockProductList);
    // if (this.ctx) this._renderPieChart();
  }
  // _renderPieChart() {
  //   this.pieData = {
  //     datasets: [
  //       {
  //         type: "bar",
  //         label: "Saidas de Productos",
  //         data: [10, 20, 30, 40],
  //       },
  //       {
  //         type: "line",
  //         label: "Meta",
  //         data: [50, 50, 50, 50],
  //       },
  //     ],
  //     labels: ["January", "February", "March", "April"],
  //   };

  //   // Configuração do gráfico de pizza
  //   this.pieConfig = {
  //     type: "scatter",
  //     data: this.pieData,
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //       plugins: {
  //         datalabels: {
  //           color: "inherit", // Usa a cor do elemento pai (herda do CSS)
  //           font: {
  //             size: 18, // Define o tamanho da fonte dos rótulos
  //           },
  //         },
  //       },
  //     },
  //   };
  //   if (this.ctx) {
  //     this.myChart = new Chart(this.ctx, this.pieConfig);
  //     console.log(this.myChart);
  //   }
  // }
  _filterLowStockProduct() {
    this.lowStockProductList = productList.filter(
      (product) => product.quantity < product.alertQuantity
    );
  }
  _renderLowStockProduct(arrList) {
    if (arrList.length === 0) {
      this.listContainer?.insertAdjacentHTML(
        "afterbegin",
        `<p classs="sem-resul">Nenhum producto encontrado </p>`
      );
    } else {
      if (this.listContainer) this.listContainer.innerHTML = "";
      arrList.forEach((element) => {
        let html = `
    <div class="product-item" data-id="${element.SKUCode}">
       <!-- NOME DO PRODUCTO -->
       <div>
           <span class="alert-icon"><ion-icon name="alert-circle-outline"></ion-icon></span>
           <span class="product-name">${element.name} </span>
       </div>
       <span class="product-category">${element.category}</span>
       <span class="product-price"> ${element.alertQuantity}</span>
       <span class="product-qtd ">${element.quantity}</span>
       <span class="product-qtd status-baixo">Baixo</span>
       <span class="product-date">${element.date}</span>
       <!-- ACÇÃO DO PRODUCTO, EDITAR, ELIMINAR, VER DETALHES -->
       <span class="product-action">
           <button class="btn-update-stock"><ion-icon
                   name="create-outline"></ion-icon></button>
       </span>
   </div>
    `;
        // VERIFICAR NOVAMENTO SE O LISTCONTAINER NÃO É UNDEFINED
        if (this.listContainer)
          this.listContainer.insertAdjacentHTML("afterbegin", html);
      });
    }
  }
  _updateStock(e) {
    this.target = e.target.closest(".btn-update-stock");
    if (!this.target) return;
    this.data = this.target.closest(".product-item");
    this.item = productList.find((p) => p.SKUCode === this.data.dataset.id);
    this.index = productList.indexOf(this.item);
    console.log(productList[this.index]);
    this.lowStockForm.classList.remove("hidden");
    this._renderUpdateForm(productList[this.index]);
  }
  _renderUpdateForm(item) {
    document.querySelector(".update-product-name").textContent = item.name;
    document.querySelector(".update-product-category").textContent =
      item.category;
    document.querySelector(
      ".update-product-sell-price"
    ).textContent = `$ ${item.sellPrice}`;
    document.querySelector(
      ".update-product-buy-price"
    ).textContent = `$ ${item.buyPrice}`;
    document.querySelector(".update-product-actual-stock").textContent =
      item.quantity;
    document.querySelector(".update-product-min-stock").textContent =
      item.alertQuantity;
  }
  _confirmUpdateStock() {
    productList[this.index].quantity += +this.inputQuantityUpdate.value;
    this.lowStockForm.classList.add("hidden");
    this.lowStockProductList = productList.filter(
      (product) => product.quantity < product.alertQuantity
    );
    this._renderLowStockProduct(this.lowStockProductList);
  }
}
const newStock = new StockApp();
export { newStock };
