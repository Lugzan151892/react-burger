import React from "react";
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css'
import SelectedElement from "../SelectedElement/SelectedElement";

const BurgerConstructor = ({data, remove}) =>{

    let sortElements = data;
    sortElements.sort((a, b) => b.id - a.id);

    const price = 0;

    let summ = data.reduce((prev, current) => {
        return prev + current.price
    }, price);

    return (
        <section className={styles.burgerConstructor}>
            <div className={styles.burgerElements}>
                {data && sortElements.map((element, number) => (
                <SelectedElement remove={remove} key={number} element={element}>
                </SelectedElement>)
                )}
            </div>
            <div className={`${styles.burgerOrder} mt-5`}>
                <div className={styles.priceContainer}>
                    <p className={`mr-2 mt-3 mb-3 text text_type_digits-medium`}>{summ}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType={'button'} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
      )
}

export default BurgerConstructor;