import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OrderElement from "../components/OrderElement/OrderElement";

function OrderPage () {

    const allOrders = useSelector(store => store.orders.allOrders)
    
    const { id } = useParams();
    const item = allOrders.find(el => el._id === id);
    
    return (
        <div>            
            <OrderElement item={item} />
        </div>
    )
}

export default OrderPage;
