import { useSelector } from '../services/types/hooks';
import { FC } from "react";
import { useParams } from 'react-router-dom';
import OrderElement from "../components/OrderElement/OrderElement";
import { TOrderElement } from '../services/types/data';

const OrderPage: FC = () => {

    const allOrders = useSelector(store => store.orders.allOrders)
    
    const { id } = useParams<{id: string}>();
    const item = allOrders.find((el: TOrderElement) => el._id === id);
    
    return (
        <div>            
            <OrderElement item={item} />
        </div>
    )
}

export default OrderPage;
