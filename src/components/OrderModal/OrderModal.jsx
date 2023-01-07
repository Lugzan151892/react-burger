import { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import OrderElement from "../OrderElement/OrderElement";

function OrderModal () {
    
    const item = useSelector(store => store.ingridients.currentOrderInModal);
    const history = useHistory();

    useEffect(() => {
        history.replace({ pathname: `feed/${item._id}` });
    }, []);
    
    return (
        <>
            <OrderElement item={item}/>
        </>
    )
}

export default OrderModal;
