import React from "react";
import styles from './DefaultBurgerIngredient.module.css'
import BurgerElement from "../BurgerElement/BurgerElement";
import PropTypes from 'prop-types';
const { elementPropTypes } = require('../../utils/data.js');

const DefaultBurgerIngredient = ({defaultElements, type, title, openIngridientModal}) => {

    const filtredElements = defaultElements.filter((item) => item.type === type);

    return (
        <div id={type} className={styles.typesContainer}>
            <h2 className={`${styles.title} text text_type_main-medium mt-5 mb-2`}>{title}</h2>       
            {filtredElements.map(item => ( 
                <BurgerElement data={defaultElements} element={item} key={item._id} openIngridientModal={openIngridientModal}/>                                                  
            ))}            
        </div>
    )
}

DefaultBurgerIngredient.propTypes = {   
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,    
    defaultElements: PropTypes.arrayOf(PropTypes.shape(elementPropTypes)).isRequired,
    openIngridientModal: PropTypes.func
}; 

export default DefaultBurgerIngredient;
