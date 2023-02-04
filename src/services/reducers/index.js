import { combineReducers } from 'redux';
import { ingridientsReducer } from './ingridients';
import { userReducer } from './user';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
    ingridients: ingridientsReducer,
    user: userReducer,
    orders: wsReducer
});
