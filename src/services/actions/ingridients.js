import { getIngredients, getOrderDetails } from "../../utils/burger-api";
import { customAlphabet } from 'nanoid';

export const GET_DEFAULT_INGRIDIENTS_REQUEST = 'GET_DEFAULT_INGRIDIENTS_REQUEST';
export const GET_DEFAULT_INGRIDIENTS_SUCCESS = 'GET_DEFAULT_INGRIDIENTS_SUCCESS';
export const GET_DEFAULT_INGRIDIENTS_FAILED = 'GET_DEFAULT_INGRIDIENTS_FAILED';
export const OPEN_INGRIDIENT_MODAL = 'OPEN_INGRIDIENT_MODAL';
export const CLOSE_INGRIDIENT_MODAL = 'CLOSE_INGRIDIENT_MODAL';
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';
export const ADD_ITEM_IN_BURGER = 'ADD_ITEM_IN_BURGER';
export const DELETE_ITEM_IN_BURGER = 'DELETE_ITEM_IN_BURGER';
export const MOVE_ITEM_IN_BURGER = 'MOVE_ITEM_IN_BURGER';
export const OPEN_ORDER_DETAILS_MODAL = 'OPEN_ORDER_DETAILS_MODAL';
export const CLOSE_ORDER_DETAILS_MODAL = 'CLOSE_ORDER_DETAILS_MODAL';
export const DELETE_ORDER_FROM_STATE = 'DELETE_ORDER_FROM_STATE';

const nanoid = customAlphabet('1234567890', 15);

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
            })
            .catch(err => {
                console.log(err.status);
                dispatch({type: GET_DEFAULT_INGRIDIENTS_FAILED});
            });
    }
}

export function getOrderNumber(url, list, token) {
    return function(dispatch) {
        dispatch({type: GET_ORDER_NUMBER_REQUEST});
        getOrderDetails(url, list, token)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_NUMBER_SUCCESS, 
                        number: res.order.number
                    })                    
                } else {
                    dispatch({type: GET_ORDER_NUMBER_FAILED});
                }
            })
            .catch(err => {
                console.log(err.status);
                dispatch({type: GET_ORDER_NUMBER_FAILED});
            });
    }
}

export function openIngridientModal(item) {
    return {
        type: OPEN_INGRIDIENT_MODAL,
        item
    }
}

export function closeIngridientModal() {
    return {
        type: CLOSE_INGRIDIENT_MODAL,
    }
}

export function closeOrderModal() {
    return {
        type: CLOSE_ORDER_MODAL,
    }
}

export function openOrderDetailsModal(item) {
    return {
        type: OPEN_ORDER_DETAILS_MODAL,
        item
    }
}

export function closeOrderDetailsModal() {
    return {
        type: CLOSE_ORDER_DETAILS_MODAL,
    }
}

export function setCurrentTab(tab) {
    return {
        type: SET_CURRENT_TAB,
        tab
    }
}

export function addItemInBurger(item) {
    return {
        type: ADD_ITEM_IN_BURGER,
        item: {...item, uniqueId: nanoid()}
    }
}

export function deleteItemInBurger(id) {
    return {
        type: DELETE_ITEM_IN_BURGER,
        id
    }
}

export function moveItemInBurger(dragItem, dropItem) {
    return {
        type: MOVE_ITEM_IN_BURGER,
        dragItem,
        dropItem
    }
}
export function deleteOrderFromState() {
    return {
        type: DELETE_ORDER_FROM_STATE,
    }
}



