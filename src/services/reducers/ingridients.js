import { GET_DEFAULT_INGRIDIENTS_FAILED,
        GET_DEFAULT_INGRIDIENTS_SUCCESS,
        GET_DEFAULT_INGRIDIENTS_REQUEST,
        GET_INGRIDIENT_INFO,
        OPEN_INGRIDIENT_MODAL,
        CLOSE_INGRIDIENT_MODAL,
        GET_ORDER_NUMBER_REQUEST,
        GET_ORDER_NUMBER_SUCCESS,
        GET_ORDER_NUMBER_FAILED,
        OPEN_ORDER_MODAL,
        CLOSE_ORDER_MODAL,
        SET_CURRENT_TAB,
} from "../actions/ingridients";

const initialState = {
    defaultIngridients: [],
    defaultIngridientsRequest: false,
    defaultIngridientsFailed: false,

    constructorIngridients: [],
    currentIngridient: null,

    orderNumber: null,
    orderNumberRequest: false,
    orderNumberFailed: false,

    ingridientModalVisible: false,
    orderModalVisible: false,

    currentTab: 'bun'
}

export const ingridientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEFAULT_INGRIDIENTS_REQUEST:
            return {...state, defaultIngridientsRequest: true};
        case GET_DEFAULT_INGRIDIENTS_SUCCESS:
            return {...state, defaultIngridients: action.items, defaultIngridientsRequest: false, defaultIngridientsFailed: false};
        case GET_DEFAULT_INGRIDIENTS_FAILED:
            return {...state, defaultIngridientsRequest: false, defaultIngridientsFailed: true};

        case GET_INGRIDIENT_INFO:
            return {...state, currentIngridient: {...state.currentIngridient, ...action.item}};

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
            return {...state, orderModalVisible: true};
        case CLOSE_ORDER_MODAL:
            return {...state, orderModalVisible: false};
        
        case SET_CURRENT_TAB:
            return {...state, currentTab: action.tab};

        default:
            return state;
    }
}