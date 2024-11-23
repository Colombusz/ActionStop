
import { configureStore } from '@reduxjs/toolkit';
import figurineReducer from './figurineSlice';
import figurineModalReducer from './cardSlices/figurineModalSlice';
import add2FavoriteReducer from './cardSlices/add2FavoriteSlice';
import fetchFavoritesReducer from './cardSlices/fetchFavoritesSlice';
import  add2CartReducer  from './cardSlices/add2cartSlice';
import checkoutReducer from './checkOutSlices/checkoutSlice';

const store = configureStore({
  reducer: {
    figurines: figurineReducer,
    modalFigurines: figurineModalReducer,
    add2Favorite: add2FavoriteReducer,
    fetchFavorites: fetchFavoritesReducer,
    cart: add2CartReducer,
    checkout: checkoutReducer,
  },
});

export default store;
