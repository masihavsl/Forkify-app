import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

// if (module.hot) module.hot.accept();
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    recipeView.renderSpinner();
    // 1) Loading recipe
    await model.loadRecipe(id);
    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //1)get the query
    const query = searchView.getQuery();
    if (!query) return;
    //2))loading search results
    await model.loadSearchResults(query);
    //3)rendering search results
    resultsView.render(model.getSearchResultsPage(1));
    //4)rendering pagination buttons accordingly
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goto) {
  //1)rendering search results
  resultsView.render(model.getSearchResultsPage(goto));
  //2)rendering pagination buttons accordingly
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the servings and quantity of the state.recipe
  model.updateServings(newServings);
  //update recipe with new quantities
  recipeView.update(model.state.recipe);
  // recipeView.render(model.state.recipe);
};

const controlBookmarks = function () {
  if (model.state.recipe.bookmarked === true)
    model.deleteBookmark(model.state.recipe.id);
  else model.addBookmark(model.state.recipe);
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerButton(controlPagination);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmarks);
}
init();
