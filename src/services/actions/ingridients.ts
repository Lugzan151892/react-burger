import { getIngredients, getOrderDetails } from "../../utils/burger-api";
import { customAlphabet } from 'nanoid';
import { AppDispatch, AppThunk } from "../types";
import { TIngridient, TOrderElement } from "../types/data";

export const GET_DEFAULT_INGRIDIENTS_REQUEST: 'GET_DEFAULT_INGRIDIENTS_REQUEST' = 'GET_DEFAULT_INGRIDIENTS_REQUEST';
export const GET_DEFAULT_INGRIDIENTS_SUCCESS: 'GET_DEFAULT_INGRIDIENTS_SUCCESS' = 'GET_DEFAULT_INGRIDIENTS_SUCCESS';
export const GET_DEFAULT_INGRIDIENTS_FAILED: 'GET_DEFAULT_INGRIDIENTS_FAILED' = 'GET_DEFAULT_INGRIDIENTS_FAILED';
export const OPEN_INGRIDIENT_MODAL: 'OPEN_INGRIDIENT_MODAL' = 'OPEN_INGRIDIENT_MODAL';
export const CLOSE_INGRIDIENT_MODAL: 'CLOSE_INGRIDIENT_MODAL' = 'CLOSE_INGRIDIENT_MODAL';
export const GET_ORDER_NUMBER_REQUEST: 'GET_ORDER_NUMBER_REQUEST' = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED' = 'GET_ORDER_NUMBER_FAILED';
export const OPEN_ORDER_MODAL: 'OPEN_ORDER_MODAL' = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL: 'CLOSE_ORDER_MODAL' = 'CLOSE_ORDER_MODAL';
export const SET_CURRENT_TAB: 'SET_CURRENT_TAB' = 'SET_CURRENT_TAB';
export const ADD_ITEM_IN_BURGER: 'ADD_ITEM_IN_BURGER' = 'ADD_ITEM_IN_BURGER';
export const DELETE_ITEM_IN_BURGER: 'DELETE_ITEM_IN_BURGER' = 'DELETE_ITEM_IN_BURGER';
export const MOVE_ITEM_IN_BURGER: 'MOVE_ITEM_IN_BURGER' = 'MOVE_ITEM_IN_BURGER';
export const OPEN_ORDER_DETAILS_MODAL: 'OPEN_ORDER_DETAILS_MODAL' = 'OPEN_ORDER_DETAILS_MODAL';
export const CLOSE_ORDER_DETAILS_MODAL: 'CLOSE_ORDER_DETAILS_MODAL' = 'CLOSE_ORDER_DETAILS_MODAL';
export const DELETE_ORDER_FROM_STATE: 'DELETE_ORDER_FROM_STATE' = 'DELETE_ORDER_FROM_STATE';

const nanoid = customAlphabet('1234567890', 15);

export const getDefaultIngridients: AppThunk = (url: string) => {
    return function(dispatch: AppDispatch) {
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

export const getOrderNumber: AppThunk = (url: string, list: Array<string>, token: string) => {
    return function(dispatch: AppDispatch) {
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

export interface IGetDefaultIngredientsRequest {
    readonly type: typeof GET_DEFAULT_INGRIDIENTS_REQUEST;
}

export interface IGetDefaultIngredientsSuccess {
    readonly type: typeof GET_DEFAULT_INGRIDIENTS_SUCCESS;
    readonly items: Array<TIngridient>;
}

export interface IGetDefaultIngredientsFailed {
    readonly type: typeof GET_DEFAULT_INGRIDIENTS_FAILED;
}

export interface IGetOrderNumberRequest {
    readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderNumberSuccess {
    readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
    readonly number: number;
}

export interface IGetOrderNumberFailed {
    readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export interface IOpenIngridientModal {
    readonly type: typeof OPEN_INGRIDIENT_MODAL;
    readonly item: TIngridient;
}

export interface ICloseIngridientModal {
    readonly type: typeof CLOSE_INGRIDIENT_MODAL
}

export interface IOpenOrderModal {
    readonly type: typeof OPEN_ORDER_MODAL
}

export interface ICloseOrderModal {
    readonly type: typeof CLOSE_ORDER_MODAL
}

export interface IOpenOrderDetailsModal {
    readonly type: typeof OPEN_ORDER_DETAILS_MODAL;
    readonly item: TOrderElement;
}

export interface ICloseOrderDetailsModal {
    readonly type: typeof CLOSE_ORDER_DETAILS_MODAL;
}

export interface ISetCurrentTab {
    readonly type: typeof SET_CURRENT_TAB;
    readonly tab: string;
}

export interface IAddItemInBurger {
    readonly type: typeof ADD_ITEM_IN_BURGER;
    readonly item: TIngridient;
}

export interface IDeleteItemInBurger {
    readonly type: typeof DELETE_ITEM_IN_BURGER;
    readonly id: string;
}

export interface IMoveItemInBurger {
    readonly type: typeof MOVE_ITEM_IN_BURGER;
    readonly dragItem: TIngridient;
    readonly dropItem: TIngridient;
}

export interface IDeleteOrderFromState {
    readonly type: typeof DELETE_ORDER_FROM_STATE;
}

export type TIngredientsActions = 
    IGetDefaultIngredientsRequest |
    IGetDefaultIngredientsSuccess |
    IGetDefaultIngredientsFailed |
    IGetOrderNumberRequest |
    IGetOrderNumberSuccess |
    IGetOrderNumberFailed |
    IOpenIngridientModal | 
    ICloseIngridientModal |
    IOpenOrderModal |
    ICloseOrderModal |
    IOpenOrderDetailsModal |
    ICloseOrderDetailsModal |
    ISetCurrentTab |
    IAddItemInBurger |
    IDeleteItemInBurger |
    IMoveItemInBurger |
    IDeleteOrderFromState;
    
export function openIngridientModal(item: TIngridient): IOpenIngridientModal {
    return {
        type: OPEN_INGRIDIENT_MODAL,
        item
    }
}

export function closeIngridientModal(): ICloseIngridientModal {
    return {
        type: CLOSE_INGRIDIENT_MODAL,
    }
}

export function closeOrderModal(): ICloseOrderModal {
    return {
        type: CLOSE_ORDER_MODAL,
    }
}

export function openOrderDetailsModal(item: TOrderElement): IOpenOrderDetailsModal {
    return {
        type: OPEN_ORDER_DETAILS_MODAL,
        item
    }
}

export function closeOrderDetailsModal(): ICloseOrderDetailsModal {
    return {
        type: CLOSE_ORDER_DETAILS_MODAL,
    }
}

export function setCurrentTab(tab: string): ISetCurrentTab {
    return {
        type: SET_CURRENT_TAB,
        tab
    }
}

export function addItemInBurger(item: TIngridient): IAddItemInBurger {
    return {
        type: ADD_ITEM_IN_BURGER,
        item: {...item, uniqueId: nanoid()}
    }
}

export function deleteItemInBurger(id: string): IDeleteItemInBurger {
    return {
        type: DELETE_ITEM_IN_BURGER,
        id
    }
}

export function moveItemInBurger(dragItem: TIngridient, dropItem: TIngridient): IMoveItemInBurger {
    return {
        type: MOVE_ITEM_IN_BURGER,
        dragItem,
        dropItem
    }
}
export function deleteOrderFromState(): IDeleteOrderFromState {
    return {
        type: DELETE_ORDER_FROM_STATE,
    }
}



