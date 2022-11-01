import React from "react";
import styles from './IngredientDetails.module.css';
import close from '../../images/close.png';
import PropTypes from "prop-types";

function IngredientDetails({item, closeModal}) {
    return (
        <div className={styles.ingridient} onClick={(e) => e.stopPropagation()}>
            <div className={styles.title}>
                <h2 className='text text_type_main-large'>Детали ингредиента</h2>
                <button onClick={closeModal} className={styles.button}><img src={close} alt="Кнопка закрытия окна" /></button>
            </div>
            <img src={item.image_large} alt={item.name} />
            <p className="text text_type_main-medium mt-4 mb-8">{item.name}</p>
            <div className={styles.stats}>
                <div className={`${styles.cell} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.calories}</p>
                </div>
                <div className={`${styles.cell} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.proteins}</p>
                </div>
                <div className={`${styles.cell} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.fat}</p>
                </div>
                <div className={styles.cell}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
};

IngredientDetails.propTypes = {
    item: PropTypes.shape({
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
    }).isRequired, 
    closeModal: PropTypes.func.isRequired,
};

export default IngredientDetails;