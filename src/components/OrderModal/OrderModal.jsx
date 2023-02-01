import { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import OrderElement from "../OrderElement/OrderElement";

function OrderModal ({isProfile}) {
    
    const item = useSelector(store => store.ingridients.currentOrderInModal);
    const history = useHistory();

    // useEffect(() => {
    //     if(isProfile) {
    //         history.replace({ pathname: `profile/orders/${item._id}` });
    //     } else {
    //         history.replace({ pathname: `feed/${item._id}` });
    //     }
    // }, []);
    
    return (
        <>
            <OrderElement item={item}/>
        </>
    )
}

export default OrderModal;
