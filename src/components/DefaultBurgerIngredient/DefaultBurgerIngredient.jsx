import React from "react";
import styles from './DefaultBurgerIngredient.module.css'
import BurgerElement from "../BurgerElement/BurgerElement";
import PropTypes from 'prop-types';

const DefaultBurgerIngredient = ({defaultElements, type, title, addItem, arr}) => {

    const filtredElements = defaultElements.filter((item) => item.type === type);

    return (
        <div id={type} className={styles.typesContainer}>
            <h2 className={`${styles.title} text text_type_main-medium mt-5 mb-2`}>{title}</h2>       
            {filtredElements.map(item => ( 
                <BurgerElement data={arr} element={item} key={item._id} addItem={() => addItem(item)} />                                                  
            ))}            
        </div>
    )
}

DefaultBurgerIngredient.propTypes = {   
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    arr: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
      })).isRequired,
    addItem: PropTypes.func.isRequired,
    defaultElements: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
      })).isRequired,
}; 

export default DefaultBurgerIngredient;
