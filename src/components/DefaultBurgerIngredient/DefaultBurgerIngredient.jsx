import React from "react";
import styles from './DefaultBurgerIngredient.module.css'
import BurgerElement from "../BurgerElement/BurgerElement";
import PropTypes from 'prop-types';
import { IngredientsContext } from "../../services/IngredientsContext";

const DefaultBurgerIngredient = ({type, title, openIngridientModal}) => {

    const {loadedElements} = React.useContext(IngredientsContext);
    const filtredElements = loadedElements.filter((item) => item.type === type);

    return (
        <div id={type} className={styles.typesContainer}>
            <h2 className={`${styles.title} text text_type_main-medium mt-5 mb-2`}>{title}</h2>       
            {filtredElements.map(item => ( 
                <BurgerElement data={loadedElements} element={item} key={item._id} openIngridientModal={openIngridientModal}/>                                                  
            ))}            
        </div>
    )
}

DefaultBurgerIngredient.propTypes = {   
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    openIngridientModal: PropTypes.func
}; 

export default DefaultBurgerIngredient;
