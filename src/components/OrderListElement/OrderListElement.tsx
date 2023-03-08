import { openOrderDetailsModal } from '../../services/actions/ingridients';
import styles from './OrderListElement.module.css';
import { useHistory} from 'react-router-dom';
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { FC, useEffect, useState } from 'react';
import { TIngridient, TOrderListElement } from '../../services/types/data';

const OrderListElement: FC<TOrderListElement> = ({ item, isProfile }) => {
    const dispatch = useDispatch();
    const history = useHistory();   
    const allIngredients = useSelector(store => store.ingridients.defaultIngridients);
    const [ingredientsInOrder, setIngredientsInOrder] = useState<Array<TIngridient> | null>(null);
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);
    
    const [amountOfExtraElements, setAmountOfExtraElements] = useState<number | null>(null);
    const openModal = () => {        
        dispatch(openOrderDetailsModal(item));
        if(isProfile) {
            history.replace({ pathname: `orders/${item._id}` });
        } else {
            history.replace({ pathname: `feed/${item._id}` });
        }
    }

    useEffect(() => {
        let newArray: Array<TIngridient> = [];        
        let currentExtraAmount = 0;
        item.ingredients.forEach((el: string) => {
            const newIngridient = allIngredients.find((element: TIngridient) => element._id === el);
            if (newIngridient) {
                newArray.push(newIngridient);
            };
        });
        currentExtraAmount = newArray.slice(5, item.ingredients.length).length;        
        let totalPrice = newArray.filter((el: TIngridient) => el !== undefined).reduce((acc: number, cur: TIngridient)=> acc + cur.price, 0);
        setTotalOrderPrice(totalPrice);
        setIngredientsInOrder(newArray);
        setAmountOfExtraElements(currentExtraAmount);
        // eslint-disable-next-line     
    }, [allIngredients]);

    return (
        <div onClick={openModal} className={`${styles.order_element} mr-2 mb-4`}>
            <div className={`${styles.description} mt-6 ml-6 mr-6`}>
                <p className='text text_type_digits-default'>{item.number}</p>
                <p className='text text_type_main-small text_color_inactive'>
                    <FormattedDate date={new Date(item.createdAt)}/>
                </p>
            </div>
            <h2 className='text text_type_main-medium mt-6 ml-6'>{item.name}</h2>
            {
                isProfile && item.status ? 
                <p className={item.status ==='done' ? `text text_type_main-default ml-6 mt-2 ${styles.done}` : 'text text_type_main-default ml-6 mt-2'}>
                    {item.status === 'done' ? 'Выполнен' : item.status === 'created' ? 'Создан' : 'Готовится'}
                </p> : null
            }
            <div className={`${styles.ingridients} m-6`}>
                <div className={styles.images}>
                    {ingredientsInOrder ? ingredientsInOrder.slice(0, 5).map((ingredient: TIngridient, index: number) => ( 
                        ingredient &&                      
                        <img className={styles.image} style={{ left:`-${index*20}px`, zIndex:`${5-index}`}} alt={ingredient.name} src={ingredient.image} key={index}/>
                    )) : null}
                    {
                        ingredientsInOrder && ingredientsInOrder[5] ? (
                            <div className={styles.extra_image_container} style={{left:`-${5*20}px`, zIndex:'0'}}>
                                <div className={styles.extra_number}>{`+${amountOfExtraElements}`}</div>
                                <img className={styles.extra_image} src={ingredientsInOrder[5].image_mobile} alt={ingredientsInOrder[5].name}/>
                            </div>
                        ) : null
                    }
                </div>
                <div className={styles.price}>
                    {totalOrderPrice && <p className='text text_type_digits-default mr-2'>{totalOrderPrice}</p>}
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default OrderListElement;
