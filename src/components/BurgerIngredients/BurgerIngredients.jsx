import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from './BurgerIngredients.module.css'
import DefaultBurgerIngredient from "../DefaultBurgerIngredient/DefaultBurgerIngredient";
import UpgradedTab from "../UpgradedTab/UpgradedTab";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { getDefaultIngridients, CLOSE_INGRIDIENT_MODAL, SET_CURRENT_TAB } from "../../services/actions/ingridients";


const tabs = {
    BUN: 'bun',
    SAUCE: 'sauce',
    MAIN: 'main'
}

function BurgerIngredients() {

    const dispatch = useDispatch();

    // const options = {
    //     root: document.querySelector('#burgertabs'),
    //     rootMargin: '0px',
    //     threshold: 1
    // }

    // function bunCallback() {
    //     dispatch({type: SET_CURRENT_TAB, tab: tabs.BUN});
    //     console.log('bun')
    // }

    // function mainCallback() {
    //     dispatch({type: SET_CURRENT_TAB, tab: tabs.MAIN});
    //     console.log('main')
    // }

    // function sauceCallback() {
    //     dispatch({type: SET_CURRENT_TAB, tab: tabs.SAUCE});
    //     console.log('sauce')
    // }

    // const bunObserver = new IntersectionObserver(bunCallback, options);
    // const mainObserver = new IntersectionObserver(mainCallback, options);
    // const sauceObserver = new IntersectionObserver(sauceCallback, options);

    // useEffect(()=> {        
    //     let bunTarget = document.querySelector('#bun');
    //     let mainTarget = document.querySelector('#main');
    //     let sauceTarget = document.querySelector('#sauce');
    //     bunObserver.observe(bunTarget);
    //     mainObserver.observe(mainTarget);
    //     sauceObserver.observe(sauceTarget);
    // }, []);

    useEffect(() => {
        dispatch(getDefaultIngridients('ingredients'));
    }, [dispatch]);

    const visible = useSelector(store => store.ingridients.ingridientModalVisible);
    const elementInModal = useSelector(store => store.ingridients.currentIngridient);

    function closeModal() {
        dispatch({type: CLOSE_INGRIDIENT_MODAL});
    }

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
                <UpgradedTab type={tabs.BUN} title={'Булки'} />                    
                <UpgradedTab type={tabs.SAUCE} title={'Соусы'} />                    
                <UpgradedTab type={tabs.MAIN} title={'Начинки'} />                    
            </div>
            <div id={'burgertabs'} className={styles.container}>    
                <DefaultBurgerIngredient type={tabs.BUN} title={'Булки'} />
                <DefaultBurgerIngredient type={tabs.SAUCE} title={'Соусы'} />
                <DefaultBurgerIngredient type={tabs.MAIN} title={'Начинки'} />
            </div>
        </section>
    );
}

export default BurgerIngredients;

