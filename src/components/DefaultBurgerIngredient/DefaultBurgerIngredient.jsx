import React from "react";
import { data } from '../utils/data';
import styles from './DefaultBurgerIngredient.module.css'
import BurgerElement from "../BurgerElement/BurgerElement";
import PropTypes from 'prop-types';

const DefaultBurgerIngredient = ({type, title, addItem, arr}) => {

    return (
        <div id={type} className={styles.typesContainer}>
            <h2 className={`${styles.title} text text_type_main-medium mt-5 mb-2`}>{title}</h2>                    
            {data.map(item => (
                item.type === type && (    
                <BurgerElement data={arr} element={item} key={item._id} addItem={() => addItem(item)}></BurgerElement>                            
                )                        
            ))}
        </div>
    )
}

DefaultBurgerIngredient.propTypes = {   
    type: PropTypes.string,
    title: PropTypes.string,
    arr: PropTypes.array,
    addItem: PropTypes.func
}; 

export default DefaultBurgerIngredient;