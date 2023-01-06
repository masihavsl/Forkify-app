import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach(function (newEl, i) {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
    //convert each into an array of nodes
    //loop over the array
    //check if text content is diffrent
    //change the text content of that node

    //check if attribute is diff btw the nodes
    //if so change thair attribute
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
      <svg>
      <use href="${icons}#icon-loader"></use>
      </svg>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
      <div>
      <svg>
      <use href="${icons}#icon-alert-triangle"></use>
      </svg>
      </div>
      <p>${message}</p>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
        <div>
        <svg>
        <use href="${icons}#icon-smile"></use>
        </svg>
        </div>
        <p>${message}</p>
        </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }
}

// renderSearches(recipesArr) {
//   this._searchResultsParentElement.innerHTML = '';
//   recipesArr.forEach((obj, i) => {
//     const listItem = `
//     <li class="preview">
//       <a class="preview__link preview__link--active" href="#${obj.id}">
//         <figure class="preview__fig">
//           <img src="${obj.image}" alt="Test" />
//         </figure>
//         <div class="preview__data">
//           <h4 class="preview__title">${obj.title}</h4>
//           <p class="preview__publisher">${obj.publisher}</p>
//           <div class="preview__user-generated">
//             <svg>
//               <use href="${icons}#icon-user"></use>
//             </svg>
//           </div>
//         </div>
//       </a>
//     </li>
//     `;

//     i < 10
//       ? this._searchResultsParentElement.insertAdjacentHTML(
//           'afterbegin',
//           listItem
//         )
//       : '';
//   });
// }
