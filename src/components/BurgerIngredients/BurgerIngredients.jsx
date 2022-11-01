import React from "react";
import styles from './BurgerIngredients.module.css'
import DefaultBurgerIngredient from "../DefaultBurgerIngredient/DefaultBurgerIngredient";
import UpgradedTab from "../UpgradedTab/UpgradedTab";
import PropTypes from 'prop-types';

const tabs = {
    BUN: 'bun',
    SAUCE: 'sauce',
    MAIN: 'main'
}
function BurgerIngredients({defaultElements, addItem, data}) { 

    const [current, setCurrent] = React.useState(tabs.BUN);

    const setTab = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({behavior: "smooth"});
    };

    return (    
        <section className={styles.createSection}>
            <h2 className={`${styles.title} text text_type_main-large mb-5`}>
                Соберите бургер
            </h2>
            <div className={styles.tabsContainer}>
                <UpgradedTab type={tabs.BUN} title={'Булки'} setTab={setTab} current={current} setCurrent={setCurrent} />                    
                <UpgradedTab type={tabs.SAUCE} title={'Соусы'} setTab={setTab} current={current} setCurrent={setCurrent} />                    
                <UpgradedTab type={tabs.MAIN} title={'Начинки'} setTab={setTab} current={current} setCurrent={setCurrent} />                    
            </div>
            <div className={styles.container}>    
                <DefaultBurgerIngredient defaultElements={defaultElements} type={tabs.BUN} title={'Булки'} arr={data} addItem={addItem} />
                <DefaultBurgerIngredient defaultElements={defaultElements} type={tabs.SAUCE} title={'Соусы'} arr={data} addItem={addItem} />
                <DefaultBurgerIngredient defaultElements={defaultElements} type={tabs.MAIN} title={'Начинки'} arr={data} addItem={addItem} />
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {    
    data: PropTypes.arrayOf(PropTypes.shape({
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

export default BurgerIngredients;

