import { getIngredients, getOrderDetails } from "../../utils/burger-api";

export const GET_DEFAULT_INGRIDIENTS_REQUEST = 'GET_DEFAULT_INGRIDIENTS_REQUEST';
export const GET_DEFAULT_INGRIDIENTS_SUCCESS = 'GET_DEFAULT_INGRIDIENTS_SUCCESS';
export const GET_DEFAULT_INGRIDIENTS_FAILED = 'GET_DEFAULT_INGRIDIENTS_FAILED';
export const GET_INGRIDIENT_INFO = 'GET_INGRIDIENT_INFO';
export const OPEN_INGRIDIENT_MODAL = 'OPEN_INGRIDIENT_MODAL';
export const CLOSE_INGRIDIENT_MODAL = 'CLOSE_INGRIDIENT_MODAL';

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

export function getDefaultIngridients(url) {
    return function(dispatch) {
        dispatch({type: GET_DEFAULT_INGRIDIENTS_REQUEST});
        getIngredients(url)
            .then(res => {
                if(res && res.success) {
                    dispatch({
                        type: GET_DEFAULT_INGRIDIENTS_SUCCESS,
                        items: res.data
                    });
                } else {
                    dispatch({type: GET_DEFAULT_INGRIDIENTS_FAILED});
                }
            });
    }
}

export function getOrderNumber(url, list) {
    return function(dispatch) {
        dispatch({type: GET_ORDER_NUMBER_REQUEST});
        getOrderDetails(url, list)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_NUMBER_SUCCESS, 
                        number: res.order.number
                    })
                    dispatch({type: OPEN_ORDER_MODAL});
                } else {
                    dispatch({type: GET_ORDER_NUMBER_FAILED});
                }
            })

    }
}
