import React from "react";
import styles from './BurgerIngredients.module.css'
import DefaultBurgerIngredient from "../DefaultBurgerIngredient/DefaultBurgerIngredient";
import UpgradedTab from "../UpgradedTab/UpgradedTab";

function BurgerIngredients({addItem, data}) { 

    const tabs = {
        BUN: 'bun',
        SAUCE: 'sauce',
        MAIN: 'main'
      }

    const [current, setCurrent] = React.useState('bun');

    return (    
        <section className={styles.createSection}>
            <h2 className={`${styles.title} text text_type_main-large mb-5`}>
                Соберите бургер
            </h2>
            <div style={{ display: 'flex' }}>
                <UpgradedTab type={tabs.BUN} title={'Булки'} current={current} setCurrent={setCurrent}></UpgradedTab>                    
                <UpgradedTab type={tabs.SAUCE} title={'Соусы'} current={current} setCurrent={setCurrent}></UpgradedTab>                    
                <UpgradedTab type={tabs.MAIN} title={'Начинки'} current={current} setCurrent={setCurrent}></UpgradedTab>                    
            </div>
            <div className={styles.container}>    
                <DefaultBurgerIngredient type={tabs.BUN} title={'Булки'} arr={data} addItem={addItem}></DefaultBurgerIngredient>
                <DefaultBurgerIngredient type={tabs.SAUCE} title={'Соусы'} arr={data} addItem={addItem}></DefaultBurgerIngredient>
                <DefaultBurgerIngredient type={tabs.MAIN} title={'Начинки'} arr={data} addItem={addItem}></DefaultBurgerIngredient>
            </div>
        </section>
    );
}

export default BurgerIngredients;

