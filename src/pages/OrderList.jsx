import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import styles from './OrderList.module.css';
import Modal from "../components/Modal/Modal";
import { closeOrderDetailsModal } from '../services/actions/ingridients';
import OrderListElement from "../components/OrderListElement/OrderListElement";
import OrderModal from '../components/OrderModal/OrderModal';
import { wsConnectionStart, wsConnectionClosed } from '../services/actions/wsActions';
import { wsUrl } from '../utils/data';

function OrderList() {   
    const totalOrders = useSelector(store => store.orders.total);
    const totalToday = useSelector(store => store.orders.totalToday);
    const isUserAuth = useSelector(store => store.user.userIsAuth);
    const allOrders = useSelector(store => store.orders.allOrders);
    const readyOrders = useSelector(store => store.orders.readyOrders);
    const preparingOrders = useSelector(store => store.orders.preparingOrders);
    const wsConnected = useSelector(store => store.orders.wsConnected);
    const accessToken = useSelector(store => store.user.accessToken);
    const dispatch = useDispatch();
    const history = useHistory();
    const { path } = useRouteMatch();
    
    const orderModalVisible = useSelector(store => store.ingridients.orderDetailsModalVisible);

    useEffect(() => {   
        if(isUserAuth) {
            if(wsConnected) {
                dispatch(wsConnectionClosed());
            }
            dispatch(wsConnectionStart(`${wsUrl}?token=${accessToken.split('Bearer ')[1]}`));
        } else {
            if(wsConnected) {
                dispatch(wsConnectionClosed());
            }
            dispatch(wsConnectionStart(`${wsUrl}/all`));
        }  
        return ()=> wsConnectionClosed();      
    }, [isUserAuth]);

    function closeModal() {
        dispatch(closeOrderDetailsModal());
        history.replace({ pathname: `/feed` });
    }

    return (
        <>
        {orderModalVisible ?
        <Route 
            path={`${path}/feed/:id`} 
            children={() => {
                return (
                    orderModalVisible &&
                    <Modal closeModal={closeModal}>
                        <OrderModal/>
                    </Modal>
                )
            }}
        /> : null}
        <div className={styles.container}>     
            <h1>Лента заказов</h1>
            <div className={styles.orders}>
                <div className={`${styles.orderlist} mr-15`}>
                    {
                        isUserAuth ? 
                        allOrders.reverse().map(el => (
                            <OrderListElement isProfile={false} item={el} key={el._id}/>
                        )) :
                        allOrders.map(el => (
                            <OrderListElement isProfile={false} item={el} key={el._id}/>
                        ))
                    }                
                </div>
                <div>
                    <div className={styles.orders_numbers}>
                        <div className={`${styles.orders_container} mr-9`}>
                            <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                            <div className={styles.orders__numbersList}>
                                <div className='mr-4'>
                                    {
                                        readyOrders.slice(0, 10).map((el, index)=> (
                                            <p className="text text_type_digits-default mb-2" key={index}>{el.number}</p>
                                        ))
                                    }
                                </div>
                                {
                                    readyOrders.length > 10 ? 
                                    <div>
                                        {
                                            readyOrders.slice(10, 20).map((el, index)=> (
                                                <p className="text text_type_digits-default mb-2" key={index}>{el.number}</p>
                                            ))
                                        }
                                    </div> 
                                    : null
                                }
                            </div>
                        </div>
                        <div className={styles.orders_container}>
                            <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                            <div className={styles.orders__numbersList}>
                                <div className='mr-4'>
                                    {
                                        preparingOrders.slice(0, 10).map((el, index)=> (
                                            <p className="text text_type_digits-default mb-2" key={index}>{el.number}</p>
                                        ))
                                    }
                                </div>
                                {
                                    preparingOrders.length > 10 ? 
                                    <div>
                                        {
                                            preparingOrders.slice(10, 20).map((el, index)=> (
                                                <p className="text text_type_digits-default mb-2" key={index}>{el.number}</p>
                                            ))
                                        }
                                    </div> 
                                    : null
                                }                                
                            </div>
                        </div>
                    </div>
                    <h2 className="text text_type_main-medium mt-15">Выполнено за все время:</h2>
                    <p className={`${styles.numbers} text text_type_digits-large`}>{totalOrders}</p>
                    <h2 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h2>
                    <p className={`${styles.numbers} text text_type_digits-large`}>{totalToday}</p>
                </div>
            </div>
        </div>
        </> 
    )
}

export default OrderList;
