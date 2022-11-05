import React from 'react';
import styles from "./OrderDetails.module.css";
import checkDone from '../../images/donecheck.png';

function OrderDetails() {
    return (
        <div className={styles.orderContainer} onClick={(e) => e.stopPropagation()}>            
            <p className='text text_type_digits-large mt-30 mb-8'>034536</p>
            <p className="text text_type_main-default mb-15">идентификатор заказа</p>
            <img className={styles.image} src={checkDone} alt={'Галочка подтвержденного заказа'} />
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;