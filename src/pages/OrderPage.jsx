import { useParams } from 'react-router-dom';
import OrderElement from "../components/OrderElement/OrderElement";
import testObjects from "../utils/testData";

function OrderPage () {
    
    const { id } = useParams();
    const item = testObjects.find(el => el._id === id);
    
    return (
        <div>            
            <OrderElement item={item} />
        </div>
    )
}

export default OrderPage;
