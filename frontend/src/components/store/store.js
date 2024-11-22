
import { configureStore } from '@reduxjs/toolkit';
import figurineReducer from './figurineSlice';
import figurineModalReducer from './cardSlices/figurineModalSlice';
import add2FavoriteReducer from './cardSlices/add2FavoriteSlice';
import fetchFavoritesReducer from './cardSlices/fetchFavoritesSlice';
import  add2CartReducer  from './cardSlices/add2cartSlice';

const store = configureStore({
  reducer: {
    figurines: figurineReducer,
    modalFigurines: figurineModalReducer,
    add2Favorite: add2FavoriteReducer,
    fetchFavorites: fetchFavoritesReducer,
    cart: add2CartReducer,

  },
});

export default store;
