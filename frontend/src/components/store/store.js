
import { configureStore } from '@reduxjs/toolkit';
import figurineReducer from './figurineSlice';

const store = configureStore({
  reducer: {
    figurines: figurineReducer,
  },
});

export default store;
