import { ThunkAction} from "redux-thunk";
import thunk from 'redux-thunk';
import { Action, ActionCreator, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { TIngredientsActions } from "../actions/ingridients";
import { TWsActions } from "../actions/wsActions";
import { socketMiddleware } from "../middleware/wsMiddleware";
import { rootReducer } from "../reducers";
// import { store } from "../..";
import { WS_SEND_MESSAGE, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_MESSAGE } from "../actions/wsActions";

const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

const initialState = {};

export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions)))
);

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TIngredientsActions | TWsActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

export type AppDispatch = typeof store.dispatch;
