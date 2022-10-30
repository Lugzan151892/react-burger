import React from "react";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerElement.module.css'
import PropTypes from 'prop-types';

const BurgerElement = ({element, data, addItem}) => {
    
    return (
        <div className={`${styles.burgerElement} mt-2 mb-5 ml-4`} onClick={()=>addItem(element)}>
            {
                data.filter(arrItem => element._id === arrItem._id).length ? <Counter count={data.filter(arrItem => element._id === arrItem._id).length} size="default" /> : null
            }
            <img className={styles.image} alt={element.name} src={element.image} />
            <div className={styles.priceContainer}>
                <p className={`mr-2 mt-2 mb-2 text text_type_digits-default ${styles.price}`}>{element.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.name} text text_type_main-default pb-3`}>{element.name}</p>
        </div>
    );
};

BurgerElement.propTypes = {
    element: PropTypes.object,
    data: PropTypes.array,
    addItem: PropTypes.func
}; 

export default BurgerElement;