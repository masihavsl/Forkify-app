import { getJSON } from './helpers';
import { API_URL } from './config';
import { RESULTS_PER_PAGE } from './config';

export const state = {
  recipe: {},
  bookmarks: [],
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    let { recipe } = data.data;
    state.recipe = {
      bookMark: recipe.bookMark,
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookmarks.some(bm => bm.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const results = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = results.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (updateTo) {
  const curServing = state.recipe.servings;
  state.recipe.servings = +updateTo;
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (+updateTo / curServing);
  });
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  const i = state.bookmarks.findIndex(bm => bm.id === id);
  state.bookmarks.splice(i, 1);
  state.recipe.bookmarked = false;
};
