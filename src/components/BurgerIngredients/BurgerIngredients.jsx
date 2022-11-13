import React from "react";
import styles from './BurgerIngredients.module.css'
import DefaultBurgerIngredient from "../DefaultBurgerIngredient/DefaultBurgerIngredient";
import UpgradedTab from "../UpgradedTab/UpgradedTab";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

const tabs = {
    BUN: 'bun',
    SAUCE: 'sauce',
    MAIN: 'main'
}
function BurgerIngredients() {
    
    const [current, setCurrent] = React.useState(tabs.BUN);
    const [visible, setVisible] = React.useState(false);
    const [elementInModal, setElementInModal] = React.useState(null);

    function openModal(item) {
        setElementInModal(item);
        setVisible(true);
    }

    function closeModal() {
        setVisible(false);
    }

    const setTab = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({behavior: "smooth"});
    };

    return (    
        <section className={styles.createSection}>
            {elementInModal && visible &&
                <Modal closeModal={closeModal}>
                    <IngredientDetails item={elementInModal}/>
                </Modal> 
            }            
            <h2 className={`${styles.title} text text_type_main-large mb-5`}>
                Соберите бургер
            </h2>
            <div className={styles.tabsContainer}>
                <UpgradedTab type={tabs.BUN} title={'Булки'} setTab={setTab} current={current} setCurrent={setCurrent} />                    
                <UpgradedTab type={tabs.SAUCE} title={'Соусы'} setTab={setTab} current={current} setCurrent={setCurrent} />                    
                <UpgradedTab type={tabs.MAIN} title={'Начинки'} setTab={setTab} current={current} setCurrent={setCurrent} />                    
            </div>
            <div className={styles.container}>    
                <DefaultBurgerIngredient type={tabs.BUN} title={'Булки'} openIngridientModal={openModal}/>
                <DefaultBurgerIngredient type={tabs.SAUCE} title={'Соусы'} openIngridientModal={openModal}/>
                <DefaultBurgerIngredient type={tabs.MAIN} title={'Начинки'} openIngridientModal={openModal}/>
            </div>
        </section>
    );
}

export default BurgerIngredients;

