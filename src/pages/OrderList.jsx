import testObjects from "../utils/testData";
import styles from './OrderList.module.css';
import OrderListElement from "../components/OrderListElement/OrderListElement";

function OrderList() {
    const numbers = {
        ready: ['034533', '034532', '034534', '034537', '034539'],
        preparing: ['034533', '034532', '034534', '034537', '034539'],
        total: 28752,
        today: 138,
    }

    return (   
        <div className={styles.container}>     
            <h1>Лента заказов</h1>
            <div className={styles.orders}>
                <div className={`${styles.orderlist} mr-15`}>
                    {
                        testObjects.map((el, index)=>(
                            <OrderListElement item={el} key={index}/>
                        ))
                    }                
                </div>
                <div>
                    <div className={styles.orders_numbers}>
                        <div className={`${styles.orders_container} mr-9`}>
                            <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                            {
                                numbers.ready.map((el)=> (
                                    <p className="text text_type_digits-default mb-2" key={el}>{el}</p>
                                ))
                            }
                        </div>
                        <div className={styles.orders_container}>
                            <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                            {
                                numbers.preparing.map((el)=> (
                                    <p className="text text_type_digits-default mb-2" key={el}>{el}</p>
                                ))
                            }
                        </div>
                    </div>
                    <h2 className="text text_type_main-medium mt-15">Выполнено за все время:</h2>
                    <p className={`${styles.numbers} text text_type_digits-large`}>{numbers.total}</p>
                    <h2 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h2>
                    <p className={`${styles.numbers} text text_type_digits-large`}>{numbers.today}</p>
                </div>
            </div>
        </div> 
    )
}

export default OrderList;
