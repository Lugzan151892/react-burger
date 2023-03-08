import { 
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from "react-redux";
import { AppDispatch, AppThunk, RootState } from ".";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

type TDispatchFunc = () => AppDispatch | AppThunk;

export const useDispatch: TDispatchFunc = dispatchHook; 
