import React from "react";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerElement.module.css'
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import { openIngridientModal } from "../../services/actions/ingridients";
const { elementPropTypes } = require('../../utils/data.js');


const BurgerElement = ({element}) => {
    
    const dispatch = useDispatch();
    const bunInBurger = useSelector(store => store.ingridients.bunInConstructor);
    const chosenElements = useSelector(store => store.ingridients.constructorIngridients).filter(item => element._id === item._id);
    
    function openModal(item) {
        dispatch(openIngridientModal(item));
        
    }

    function getCounter(){
        if (element.type === 'bun') {
            return (bunInBurger && bunInBurger._id === element._id) ? 2 : 0;
        }
        return chosenElements.length;
    }

    const [, dragRef] = useDrag({
        type: "ingridient",
        item: {...element},
    });

    return (
        <div draggable ref={dragRef} className={`${styles.burgerElement} mt-2 mb-5 ml-4`} onClick={() => openModal(element)}>            
            {
                getCounter() !== 0 ? <Counter count={getCounter()} size="default" /> : null
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
    element: PropTypes.shape(elementPropTypes).isRequired
}; 

export default BurgerElement;

