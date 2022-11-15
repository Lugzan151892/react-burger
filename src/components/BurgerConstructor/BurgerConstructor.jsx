import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css'
import SelectedElement from "../SelectedElement/SelectedElement";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { CLOSE_ORDER_MODAL } from "../../services/actions/ingridients";
import { getOrderNumber } from "../../services/actions/ingridients";

const BurgerConstructor = () =>{
    const loadedElements = useSelector(store => store.ingridients.defaultIngridients);
    const visible = useSelector(store => store.ingridients.orderModalVisible);
    const dispatch = useDispatch();

    function closeModal() {
        dispatch({type: CLOSE_ORDER_MODAL})
    }

    let orderList = [];
    loadedElements.forEach(element => {
        orderList.push(element._id);
    });

    function openModal() {
        dispatch(getOrderNumber('orders', orderList))
    }

    const bunList = loadedElements.filter((item) => item.type === 'bun')[0];
    const nonBunList = loadedElements.filter((item) => item.type !== 'bun');
    
    const price = 0;

    const summ = loadedElements.reduce((prev, current) => {
        return prev + current.price
    }, price);

    return (
        <section className={styles.burgerConstructor}>
            {visible &&
                <Modal closeModal={closeModal}>                 
                    <OrderDetails />                
                </Modal>
            }
            <div className={styles.burgerElements}>
                {bunList && 
                <SelectedElement                      
                    element={bunList}
                    type={'top'}
                    >
                </SelectedElement>}
                {loadedElements && nonBunList.map((element, number) => (
                <SelectedElement 
                    key={number} 
                    element={element}
                    type={element.type}
                    >
                </SelectedElement>)
                )}
                {bunList && 
                <SelectedElement                      
                    element={bunList}
                    type={'bottom'}
                    >
                </SelectedElement>}
            </div>
            <div className={`${styles.burgerOrder} mt-5`}>
                <div className={styles.priceContainer}>
                    <p className={`mr-2 mt-3 mb-3 text text_type_digits-medium`}>{summ}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType={'button'} onClick={openModal} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
      )
}

export default BurgerConstructor;