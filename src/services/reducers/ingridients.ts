import { GET_DEFAULT_INGRIDIENTS_FAILED,
        GET_DEFAULT_INGRIDIENTS_SUCCESS,
        GET_DEFAULT_INGRIDIENTS_REQUEST,
        OPEN_INGRIDIENT_MODAL,
        CLOSE_INGRIDIENT_MODAL,
        GET_ORDER_NUMBER_REQUEST,
        GET_ORDER_NUMBER_SUCCESS,
        GET_ORDER_NUMBER_FAILED,
        OPEN_ORDER_MODAL,
        CLOSE_ORDER_MODAL,
        SET_CURRENT_TAB,
        ADD_ITEM_IN_BURGER,
        DELETE_ITEM_IN_BURGER,
        MOVE_ITEM_IN_BURGER,
        OPEN_ORDER_DETAILS_MODAL,
        CLOSE_ORDER_DETAILS_MODAL,
        DELETE_ORDER_FROM_STATE,
        TIngredientsActions
} from "../actions/ingridients";
import { TIngridient, TOrderElement } from "../types/data";

type TIngredientsState = {
    defaultIngridients: Array<TIngridient>;
    defaultIngridientsRequest: boolean;
    defaultIngridientsFailed: boolean;
    bunInConstructor: TIngridient | null;
    constructorIngridients: Array<TIngridient>;
    currentIngridient: TIngridient | null;
    orderNumber: number | null;
    orderNumberRequest: boolean;
    orderNumberFailed: boolean;
    orderDetailsModalVisible: boolean;
    currentOrderInModal: TOrderElement | null;
    ingridientModalVisible: boolean;
    orderModalVisible: boolean;
    currentTab: string;
}

const initialState: TIngredientsState = {
    defaultIngridients: [],
    defaultIngridientsRequest: false,
    defaultIngridientsFailed: false,

    bunInConstructor: null,
    constructorIngridients: [],
    currentIngridient: null,

    orderNumber: null,
    orderNumberRequest: false,
    orderNumberFailed: false,

    orderDetailsModalVisible: false,
    currentOrderInModal: null,

    ingridientModalVisible: false,
    orderModalVisible: false,

    currentTab: 'bun'
}

export const ingridientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
    switch (action.type) {
        case GET_DEFAULT_INGRIDIENTS_REQUEST:
            return {...state, defaultIngridientsRequest: true};
        case GET_DEFAULT_INGRIDIENTS_SUCCESS:
            return {...state, defaultIngridients: action.items, defaultIngridientsRequest: false, defaultIngridientsFailed: false};
        case GET_DEFAULT_INGRIDIENTS_FAILED:
            return {...state, defaultIngridientsRequest: false, defaultIngridientsFailed: true};

        case OPEN_INGRIDIENT_MODAL:
            return {...state, ingridientModalVisible: true, currentIngridient: {...state.currentIngridient, ...action.item}};
        case CLOSE_INGRIDIENT_MODAL:
            return {...state, ingridientModalVisible: false, currentIngridient: null};

        case GET_ORDER_NUMBER_REQUEST:
            return {...state, orderNumberRequest: true};
        case GET_ORDER_NUMBER_SUCCESS:
            return {...state, orderNumber: action.number, orderNumberRequest: false, orderNumberFailed: false};
        case GET_ORDER_NUMBER_FAILED:
            return {...state, orderNumberRequest: false, orderNumberFailed: true};

        case OPEN_ORDER_MODAL:
            return {...state, orderModalVisible: true, bunInConstructor: null, constructorIngridients: []};
        case CLOSE_ORDER_MODAL:
            return {...state, orderModalVisible: false};

        case OPEN_ORDER_DETAILS_MODAL:
            return {...state, orderDetailsModalVisible: true, currentOrderInModal: action.item};
        case CLOSE_ORDER_DETAILS_MODAL:
            return {...state, orderDetailsModalVisible: false};
        
        case DELETE_ORDER_FROM_STATE:
            return {...state, currentOrderInModal: null}
        
        case SET_CURRENT_TAB:
            return {...state, currentTab: action.tab};

        case ADD_ITEM_IN_BURGER: {
            if (action.item.type === 'bun') {
                return {...state, bunInConstructor: action.item};
            }           
            return {
                ...state,
                constructorIngridients: [
                    ...state.constructorIngridients, 
                    {...action.item}
                ]
                };
        }

        case DELETE_ITEM_IN_BURGER: {
            return {...state, constructorIngridients: state.constructorIngridients.filter((item: TIngridient) => item.uniqueId !== action.id)};
        }

        case MOVE_ITEM_IN_BURGER: {            
            let arr = [...state.constructorIngridients].map(elem => {
                if(elem.uniqueId === action.dropItem.uniqueId) {                    
                    return {...elem, uniqueId: action.dragItem.uniqueId}
                }
                if(elem.uniqueId === action.dragItem.uniqueId) {
                    return {...elem, uniqueId: action.dropItem.uniqueId}
                }
                return elem;
            })            
            return {
                ...state, constructorIngridients: arr
            }
        }

        default:
            return state;
    }
}
