import React from "react";
import styles from './BurgerIngredients.module.css'
import DefaultBurgerIngredient from "../DefaultBurgerIngredient/DefaultBurgerIngredient";
import UpgradedTab from "../UpgradedTab/UpgradedTab";
import PropTypes from 'prop-types';

function BurgerIngredients({addItem, data}) { 

    const tabs = {
        BUN: 'bun',
        SAUCE: 'sauce',
        MAIN: 'main'
    }

    const [current, setCurrent] = React.useState('bun');

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
            <div style={{ display: 'flex' }}>
                <UpgradedTab type={tabs.BUN} title={'Булки'} setTab={setTab} current={current} setCurrent={setCurrent}></UpgradedTab>                    
                <UpgradedTab type={tabs.SAUCE} title={'Соусы'} setTab={setTab} current={current} setCurrent={setCurrent}></UpgradedTab>                    
                <UpgradedTab type={tabs.MAIN} title={'Начинки'} setTab={setTab} current={current} setCurrent={setCurrent}></UpgradedTab>                    
            </div>
            <div className={styles.container}>    
                <DefaultBurgerIngredient type={tabs.BUN} title={'Булки'} arr={data} addItem={addItem}></DefaultBurgerIngredient>
                <DefaultBurgerIngredient type={tabs.SAUCE} title={'Соусы'} arr={data} addItem={addItem}></DefaultBurgerIngredient>
                <DefaultBurgerIngredient type={tabs.MAIN} title={'Начинки'} arr={data} addItem={addItem}></DefaultBurgerIngredient>
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {    
    data: PropTypes.array,
    addItem: PropTypes.func
}; 

export default BurgerIngredients;

