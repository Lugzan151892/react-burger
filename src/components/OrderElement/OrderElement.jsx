import styles from './OrderElement.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderElement ({item}) {
            
    return (
        <div className={styles.order_element_container}>            
            <p className={`${styles.order_number} text text_type_digits-default mb-10`}>{item.number}</p>
            <p className="text text_type_main-medium mb-3">{item.title}</p>
            <p className="text text_type_main-small mb-15">{item.status}</p>
            <p className="text_type_main-medium mb-6">Состав:</p>
            <div className={styles.order_ingridients_container}>
            {
                item.ingridients.map((el) => (
                    <div className={`${styles.order_ingridient} mr-6`} key={el._id}>
                        <div className={styles.order_ingridient_name}>
                            <img className={styles.order_ingridient_image} src={el.image_mobile} alt={el.name} />
                            <p className="text text_type_main-default ml-4">{el.name}</p>
                        </div>
                        <div className={`${styles.order_ingridient_price} ml-4`}>
                            <p className="text text_type_digits-default mr-1">{el.price}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                ))
            }                
            </div>
            <div className={`${styles.order_ingridient_time} mt-10`}>
                <p className="text text_type_main-small text_color_inactive">Вчера, 13:50 i-GMT+3</p>
                <div className={styles.order_ingridient_price}>
                    <p className="text text_type_digits-default">3000</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default OrderElement;
