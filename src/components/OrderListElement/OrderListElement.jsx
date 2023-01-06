import styles from './OrderListElement.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function OrderListElement({ item, status }) {
    const ingridientsList = item.ingridients.slice(0, 5);
    const extraItem = item.ingridients[5];
    const amountOfExtraElements = item.ingridients.slice(5, item.ingridients.length).length;
    
    return (
        <div className={`${styles.order_element} mr-2 mb-4`}>
            <div className={`${styles.description} mt-6 ml-6 mr-6`}>
                <p className='text text_type_digits-default'>{item.number}</p>
                <p className='text text_type_main-small text_color_inactive'>{item.time}</p>
            </div>
            <h2 className='text text_type_main-medium mt-6 ml-6'>{item.title}</h2>
            {
                status ? 
                <p className='text text_type_main-default ml-6 mt-2'>{item.status}</p> : null
            }
            <div className={`${styles.ingridients} m-6`}>
                <div className={styles.images}>
                    {ingridientsList.map((el, index) => (                        
                        <img className={styles.image} style={{ left:`-${index*48}px`, zIndex:`${5-index}`}} src={el.image_mobile} alt={el.name} key={el._id}/>
                    ))}
                    {
                        extraItem ? (
                            <div className={styles.extra_image_container} style={{left:`-${5*48}px`, zIndex:'0'}}>
                                <div className={styles.extra_number}>{`+${amountOfExtraElements}`}</div>
                                <img className={styles.extra_image} src={extraItem.image_mobile} alt={extraItem.name}/>
                            </div>
                            
                        ) : null
                    }
                </div>
                <div className={styles.price}>
                    <p className='text text_type_digits-default mr-2'>{item.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default OrderListElement;
