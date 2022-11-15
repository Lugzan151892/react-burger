import { combineReducers } from 'redux';
import { ingridientsReducer } from './ingridients';

export const rootReducer = combineReducers({
    ingridients: ingridientsReducer,
});