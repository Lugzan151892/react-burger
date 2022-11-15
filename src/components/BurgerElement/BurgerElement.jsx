import React from "react";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerElement.module.css'
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { OPEN_INGRIDIENT_MODAL } from "../../services/actions/ingridients";
const { elementPropTypes } = require('../../utils/data.js');


const BurgerElement = ({element}) => {
    
    const dispatch = useDispatch();
    const loadedElements = useSelector(store => store.ingridients.defaultIngridients);
    const chosenElements = loadedElements.filter(item => element._id === item._id);

    function openModal(item) {
        dispatch({type: OPEN_INGRIDIENT_MODAL, item});
    }

    return (
        <div className={`${styles.burgerElement} mt-2 mb-5 ml-4`} onClick={() => openModal(element)}>            
            {
                chosenElements.length ? <Counter count={chosenElements.length} size="default" /> : null
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
    element: PropTypes.shape(elementPropTypes).isRequired,
    openIngridientModal: PropTypes.func
}; 

export default BurgerElement;