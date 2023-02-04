import { useEffect, useState } from 'react';
import styles from './OrderElement.module.css';
import { useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/wsActions';
import { wsUrl } from '../../utils/data';

function OrderElement ({item}) {
    const dispatch = useDispatch();
    const ordersList = useSelector(store => store.orders.allOrders);
    const accessToken = useSelector(store => store.user.accessToken);
    const { id } = useParams();
    const isUserAuth = useSelector(store => store.user.userIsAuth);
    const wsConnected = useSelector(store => store.orders.wsConnected);
    const currentOrder = item ? item : ordersList.find(el => el._id === id);
    const allIngredients = useSelector(store => store.ingridients.defaultIngridients);
    const [ingredientsInOrder, setIngredientsInOrder] = useState(null);
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);

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
            
    useEffect(()=> {        
        if(currentOrder){   
            let ingredientsList = [];
            currentOrder.ingredients.forEach(el => {
                ingredientsList.push(allIngredients.find(element => element._id === el));
            });
            let ingredientListWithAmount = [];
            ingredientsList.forEach(ingredient => {
                let amount = ingredientsList.filter(el => el._id === ingredient._id).length;
                if(!ingredientListWithAmount.find(el => el._id === ingredient._id)){
                    ingredientListWithAmount.push({amount: amount, ...ingredient});
                }
            });
            let totalPrice = ingredientsList.reduce((acc, cur)=> acc + cur.price, 0);
            setTotalOrderPrice(totalPrice);
            setIngredientsInOrder(ingredientListWithAmount);   
        }   
    }, [ordersList, currentOrder]);
    
    return (
        currentOrder ?          
        <div className={styles.order_element_container}>            
            <p className={`${styles.order_number} text text_type_digits-default mb-10`}>{currentOrder.number}</p>
            <p className="text text_type_main-medium mb-3">{currentOrder.name}</p>
            <p className={currentOrder.status ==='done' ? `text text_type_main-small mb-15 ${styles.done}` : 'text text_type_main-small mb-15'}>
                {currentOrder.status === 'done' ? 'Выполнен' : currentOrder.status === 'created' ? 'Создан' : 'Готовится'}
            </p>
            <p className="text_type_main-medium mb-6">Состав:</p>
            <div className={styles.order_ingridients_container}>
            {
                ingredientsInOrder ? ingredientsInOrder.map((el, index) => (
                    <div className={`${styles.order_ingridient} mr-6`} key={index}>
                        <div className={styles.order_ingridient_name}>
                            <img className={styles.order_ingridient_image} src={el.image_mobile} alt={el.name} />
                            <p className="text text_type_main-default ml-4">{el.name}</p>
                        </div>
                        <div className={`${styles.order_ingridient_price} ml-4`}>
                            <p className="text text_type_digits-default mr-2">{el.amount} x {el.price}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                )) : null
            }                
            </div>
            <div className={`${styles.order_ingridient_time} mt-10`}>
                <p className="text text_type_main-small text_color_inactive">
                    <FormattedDate date={new Date(currentOrder.createdAt)}/>
                </p>
                <div className={styles.order_ingridient_price}>
                    <p className="text text_type_digits-default mr-2">{totalOrderPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>   
        : null     
    )
}

export default OrderElement;
