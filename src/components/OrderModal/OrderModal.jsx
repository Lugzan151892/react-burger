import { useSelector } from "react-redux";
import OrderElement from "../OrderElement/OrderElement";

function OrderModal () {
    
    const item = useSelector(store => store.ingridients.currentOrderInModal);
    
    return (
        <>
            <OrderElement item={item}/>
        </>
    )
}

export default OrderModal;
