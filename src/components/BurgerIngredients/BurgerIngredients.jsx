import React from "react";
import styles from './BurgerIngredients.module.css'
import DefaultBurgerIngredient from "../DefaultBurgerIngredient/DefaultBurgerIngredient";
import UpgradedTab from "../UpgradedTab/UpgradedTab";
import PropTypes from 'prop-types';
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

const { elementPropTypes } = require('../../utils/data.js');

const tabs = {
    BUN: 'bun',
    SAUCE: 'sauce',
    MAIN: 'main'
}
function BurgerIngredients({defaultElements}) { 

    const [current, setCurrent] = React.useState(tabs.BUN);
    const [visible, setVisible] = React.useState(false);
    const [elementInModal, setElementInModal] = React.useState(null);

    function openModal(item) {
        setVisible(true);
        setElementInModal(item);
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
            <Modal closeModal={closeModal} setVisible={setVisible} visible={visible}>
                {elementInModal ? <IngredientDetails item={elementInModal}/> : null}
            </Modal>            
            <h2 className={`${styles.title} text text_type_main-large mb-5`}>
                Соберите бургер
            </h2>
            <div className={styles.tabsContainer}>
                <UpgradedTab type={tabs.BUN} title={'Булки'} setTab={setTab} current={current} setCurrent={setCurrent} />                    
                <UpgradedTab type={tabs.SAUCE} title={'Соусы'} setTab={setTab} current={current} setCurrent={setCurrent} />                    
                <UpgradedTab type={tabs.MAIN} title={'Начинки'} setTab={setTab} current={current} setCurrent={setCurrent} />                    
            </div>
            <div className={styles.container}>    
                <DefaultBurgerIngredient defaultElements={defaultElements} type={tabs.BUN} title={'Булки'} openIngridientModal={openModal}/>
                <DefaultBurgerIngredient defaultElements={defaultElements} type={tabs.SAUCE} title={'Соусы'} openIngridientModal={openModal}/>
                <DefaultBurgerIngredient defaultElements={defaultElements} type={tabs.MAIN} title={'Начинки'} openIngridientModal={openModal}/>
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    defaultElements: PropTypes.arrayOf(PropTypes.shape(elementPropTypes)).isRequired,
}; 

export default BurgerIngredients;

