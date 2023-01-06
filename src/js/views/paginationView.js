import View from './view';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerButton(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      handler(+btn.dataset.goto);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const totalPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //at page 1
    if (curPage === 1 && totalPages > 1)
      return this._generateMarkupButton('r', curPage);
    //at middle
    if (curPage < totalPages)
      return this._generateMarkupButton('both', curPage);

    //at end
    if (curPage === totalPages && totalPages > 1)
      return this._generateMarkupButton('l', curPage);

    //no other pages
    return '';
  }
  _generateMarkupButton(type, curPage) {
    if (type === 'r')
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
      `;
    if (type === 'l')
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
      </button>
      `;

    return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button> 
  `;
  }
}

export default new PaginationView();
