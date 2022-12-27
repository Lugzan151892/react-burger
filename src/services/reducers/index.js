import { combineReducers } from 'redux';
import { ingridientsReducer } from './ingridients';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    ingridients: ingridientsReducer,
    user: userReducer
});
