import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from './BurgerIngredients.module.css'
import DefaultBurgerIngredient from "../DefaultBurgerIngredient/DefaultBurgerIngredient";
import UpgradedTab from "../UpgradedTab/UpgradedTab";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { getDefaultIngridients, closeIngridientModal, setCurrentTab } from "../../services/actions/ingridients";


const tabs = {
    BUN: 'bun',
    SAUCE: 'sauce',
    MAIN: 'main'
}

function BurgerIngredients() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDefaultIngridients('ingredients'));
        dispatch(setCurrentTab('bun'));
    }, []);

    const visible = useSelector(store => store.ingridients.ingridientModalVisible);
    const elementInModal = useSelector(store => store.ingridients.currentIngridient);

    function closeModal() {
        dispatch(closeIngridientModal());
    }

    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const setTab = (type) => {
        dispatch(setCurrentTab(type));
        type === 'bun' && bunRef.current.scrollIntoView({behavior: "smooth"});
        type === 'sauce' && sauceRef.current.scrollIntoView({behavior: "smooth"});
        type === 'main' && mainRef.current.scrollIntoView({behavior: "smooth"});
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
                <UpgradedTab setTab={setTab} type={tabs.BUN} title={'Булки'} />                    
                <UpgradedTab setTab={setTab} type={tabs.SAUCE} title={'Соусы'} />                    
                <UpgradedTab setTab={setTab} type={tabs.MAIN} title={'Начинки'} />                    
            </div>
            <div id={'burgertabs'} className={styles.container}>    
                <DefaultBurgerIngredient refType={bunRef} type={tabs.BUN} title={'Булки'} />
                <DefaultBurgerIngredient refType={sauceRef} type={tabs.SAUCE} title={'Соусы'} />
                <DefaultBurgerIngredient refType={mainRef} type={tabs.MAIN} title={'Начинки'} />
            </div>
        </section>
    );
}

export default BurgerIngredients;



