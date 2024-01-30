// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  // Ajoute d'autres configurations si nécessaire
});

export default store;
