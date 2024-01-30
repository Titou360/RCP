// store/reducers/index.js
import { combineReducers } from 'redux';
import registrationReducer from './registration';

const rootReducer = combineReducers({
  registration: registrationReducer,

  // Reducers à ajouter ici au besoin
});

export default rootReducer;
