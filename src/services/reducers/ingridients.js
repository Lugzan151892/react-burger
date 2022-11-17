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
        ADD_ITEM_IN_BURGER,
        DELETE_ITEM_IN_BURGER,
        MOVE_ITEM_IN_BURGER

} from "../actions/ingridients";

const initialState = {
    defaultIngridients: [],
    defaultIngridientsRequest: false,
    defaultIngridientsFailed: false,

    bunInConstructor: null,
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

        case ADD_ITEM_IN_BURGER: {
            if (action.item.type === 'bun') {
                return {...state, bunInConstructor: action.item};
            }           
            return {
                ...state,
                constructorIngridients: [
                    ...state.constructorIngridients, 
                    {...action.item, uniqueId: action.uniqueId}
                ]
                };
        }

        case DELETE_ITEM_IN_BURGER: {
            return {...state, constructorIngridients: state.constructorIngridients.filter(item => item.uniqueId !== action.id)};
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