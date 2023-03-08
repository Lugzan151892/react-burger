import { FC, useEffect, useState } from 'react';
import styles from './OrderElement.module.css';
import { useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/wsActions';
import { wsUrl } from '../../utils/data';
import { TIngridient, TOrderElement, TOrderElementComponent } from '../../services/types/data';


const OrderElement: FC<TOrderElementComponent> = ({ item }) => {
    const dispatch = useDispatch();
    const ordersList = useSelector(store => store.orders.allOrders);
    const accessToken = useSelector(store => store.user.accessToken);
    const { id } = useParams<{id: string}>();
    const isUserAuth = useSelector(store => store.user.userIsAuth);
    const wsConnected = useSelector(store => store.orders.wsConnected);
    const currentOrder = item ? item : ordersList.find((el: TOrderElement) => el._id === id);
    const allIngredients = useSelector(store => store.ingridients.defaultIngridients);
    const [ingredientsInOrder, setIngredientsInOrder] = useState<Array<TIngridient> | null>(null);
    const [totalOrderPrice, setTotalOrderPrice] = useState<number>(0);

    useEffect(() => {   
        if(isUserAuth) {
            if(wsConnected) {
                dispatch(wsConnectionClosed());
            }
            if(accessToken){
                dispatch(wsConnectionStart(`${wsUrl}?token=${accessToken.split('Bearer ')[1]}`));
            }            
        } else {
            if(wsConnected) {
                dispatch(wsConnectionClosed());
            }
            dispatch(wsConnectionStart(`${wsUrl}/all`));
        } 
        return () => { wsConnectionClosed() };   
        // eslint-disable-next-line   
    }, [isUserAuth]);
            
    useEffect(()=> {        
        if(currentOrder){   
            let ingredientsList: Array<TIngridient> = [];
            currentOrder.ingredients.forEach((el: string) => {
                const newIngridient = allIngredients.find((element: TIngridient) => element._id === el);
                if (newIngridient) {
                    ingredientsList.push(newIngridient);
                };
            });
            let ingredientListWithAmount: Array<TIngridient> = [];
            ingredientsList.forEach((ingredient: TIngridient) => {
                let amount = ingredientsList.filter((el: TIngridient) => el._id === ingredient._id).length;
                if(!ingredientListWithAmount.find((el: TIngridient) => el._id === ingredient._id)){
                    ingredientListWithAmount.push({amount: amount, ...ingredient});
                }
            });
            let totalPrice = ingredientsList.reduce((acc: number, cur: TIngridient)=> acc + cur.price, 0);
            setTotalOrderPrice(totalPrice);
            setIngredientsInOrder(ingredientListWithAmount);   
        }
        // eslint-disable-next-line
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
                ingredientsInOrder ? ingredientsInOrder.map((el: TIngridient, index: number) => (
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
