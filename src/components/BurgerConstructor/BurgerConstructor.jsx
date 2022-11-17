import React, { useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css'
import { useDrop } from "react-dnd";
import SelectedElement from "../SelectedElement/SelectedElement";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { closeOrderModal, addItemInBurger } from "../../services/actions/ingridients";
import { getOrderNumber, OPEN_ORDER_MODAL } from "../../services/actions/ingridients";

const BurgerConstructor = () =>{
    
    const elementsInBurger = useSelector(store => store.ingridients.constructorIngridients);
    const bunInBurger = useSelector(store => store.ingridients.bunInConstructor);
    const visible = useSelector(store => store.ingridients.orderModalVisible);
    const dispatch = useDispatch();

    const sortItems = (a, b) => a.uniqueId > b.uniqueId ? 1 : -1;

    function closeModal() {
        dispatch(closeOrderModal())
    }

    const onDropHandler = (element) => {        
        dispatch(addItemInBurger(element));
    }

    const [, dropTarget] = useDrop({
        accept: "ingridient",
        drop(item) {
            onDropHandler(item);
        },
    });

    function openModal() {
        const orderList = [];
        elementsInBurger.forEach(element => {
            orderList.push(element._id)
        });
        dispatch({type: OPEN_ORDER_MODAL});
        dispatch(getOrderNumber('orders', orderList));
    }
    
    const price = bunInBurger ? bunInBurger.price * 2 : 0;

    const summ = elementsInBurger.reduce((prev, current) => {
        return prev + current.price
    }, price);

    return (
        <section ref={dropTarget} className={styles.burgerConstructor}>
            {visible &&
                <Modal closeModal={closeModal}>                 
                    <OrderDetails />                
                </Modal>
            }
            <div className={styles.burgerElements}>
                {bunInBurger && 
                <SelectedElement                      
                    element={bunInBurger}
                    type={'top'}
                    >
                </SelectedElement>}
                {elementsInBurger && elementsInBurger.sort(sortItems).map((element) => (
                <SelectedElement 
                    key={element.uniqueId} 
                    element={element}
                    type={element.type}
                    >
                </SelectedElement>)
                )}
                {bunInBurger && 
                <SelectedElement                      
                    element={bunInBurger}
                    type={'bottom'}
                    >
                </SelectedElement>}
            </div>
            <div className={`${styles.burgerOrder} mt-5`}>
                <div className={styles.priceContainer}>
                    <p className={`mr-2 mt-3 mb-3 text text_type_digits-medium`}>{summ}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button disabled={bunInBurger ? false : true} htmlType={'button'} onClick={openModal} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
      )
}

export default BurgerConstructor;

