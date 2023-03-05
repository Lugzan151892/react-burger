import { FC } from "react";
import { useSelector } from "../../services/types/hooks";
import OrderElement from "../OrderElement/OrderElement";

const OrderModal: FC = () => {
    
    const item = useSelector(store => store.ingridients.currentOrderInModal);
    
    return (
        <>
            <OrderElement item={item}/>
        </>
    )
}

export default OrderModal;
