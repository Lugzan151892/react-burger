import { useEffect, useState } from 'react';
import styles from './OrderElement.module.css';
import { useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

function OrderElement ({item}) {

    const ordersList = useSelector(store => store.orders.allOrders);
    const { id } = useParams();
    const currentOrder = item ? item : ordersList.find(el => el._id === id);
    const allIngredients = useSelector(store => store.ingridients.defaultIngridients);
    const [ingredientsInOrder, setIngredientsInOrder] = useState(null);
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);
            
    useEffect(()=> {
        let newArray = [];        
        currentOrder.ingredients.forEach(el => {
            newArray.push(allIngredients.find(element => element._id === el));
        });
        let totalPrice = newArray.reduce((acc, cur)=> acc + cur.price, 0);
        setTotalOrderPrice(totalPrice);
        setIngredientsInOrder(newArray);      
    }, [ordersList]);

    if(!currentOrder) return null;
    
    return (        
        <div className={styles.order_element_container}>            
            <p className={`${styles.order_number} text text_type_digits-default mb-10`}>{currentOrder.number}</p>
            <p className="text text_type_main-medium mb-3">{currentOrder.name}</p>
            <p className="text text_type_main-small mb-15">{currentOrder.status}</p>
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
                            <p className="text text_type_digits-default mr-2">{el.price}</p>
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
    )
}

export default OrderElement;
