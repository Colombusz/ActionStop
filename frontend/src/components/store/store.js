
import { configureStore } from '@reduxjs/toolkit';
import figurineReducer from './figurineSlice';
import figurineModalReducer from './cardSlices/figurineModalSlice';

const store = configureStore({
  reducer: {
    figurines: figurineReducer,
    modalFigurine: figurineModalReducer,
  },
});

export default store;
