export class RenderPagination {
  constructor(
    productList,
    btnNext,
    btnPrevius,
    currentPageLabel,
    totalPagesLabel,
    renderFunction
  ) {
    this.btnNext = btnNext;
    this.btnPrevius = btnPrevius;
    this.currentPageLabel = currentPageLabel;
    this.productList = productList;
    this.totalPagesLabel = totalPagesLabel;
    this.renderFunction = renderFunction;
    this._pagination(productList);
    this.renderPage();

    // BTNS EVENT LISTENERS
    this.btnNext?.addEventListener("click", this.goToNextPage.bind(this));
    this.btnPrevius?.addEventListener(
      "click",
      this.goToPreviousPage.bind(this)
    );
  }
  _pagination(productList) {
    if (!this.totalPagesLabel) return;
    this.productsPerPage = 2;
    this.currentPage = 1;
    this.totalPages = Math.ceil(productList.length / this.productsPerPage);
    this.totalPagesLabel.textContent = `${this.totalPages
      .toString()
      .padStart(2, 0)}`;
    this.renderCurrentPage(this.currentPage);
  }
  renderPage(page) {
    this.startIndex = (page - 1) * this.productsPerPage;
    this.endIndex = this.startIndex + this.productsPerPage;
    this.productsToRender = this.productList.slice(
      this.startIndex,
      this.endIndex
    );
    this.renderFunction(this.productsToRender);
  }
  renderCurrentPage(currentPage) {
    this.renderPage(currentPage);
  }
  goToPreviousPage = function () {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderCurrentPage(this.currentPage);
    }
    this.currentPageLabel.textContent = this.currentPage;
  };
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderCurrentPage(this.currentPage);
    }
    this.currentPageLabel.textContent = this.currentPage;
  }
}

// const array = [
//   1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 9, 934, 45, 345, 45, 345, 35, 35, 5, 67, 67,
// ];

// const pagination = new RenderPagination(array);
