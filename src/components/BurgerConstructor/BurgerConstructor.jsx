import React, {useContext, useState} from "react";
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css'
import SelectedElement from "../SelectedElement/SelectedElement";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { IngredientsContext } from "../../services/IngredientsContext";
import { getOrderDetails, API_URL } from "../../utils/burger-api";

const BurgerConstructor = () =>{
    const {loadedElements} = useContext(IngredientsContext);
    const [visible, setVisible] = useState(false);
    const [order, setOrder] = useState(null);

    function closeModal() {
        setVisible(false);
    }

    function openModal() {
        setVisible(true);
    }

    let orderList = [];
    loadedElements.forEach(element => {
        orderList.push(element._id);
    });

    const bunList = loadedElements.filter((item) => item.type === 'bun')[0];
    const nonBunList = loadedElements.filter((item) => item.type !== 'bun');
    
    const price = 0;

    const summ = loadedElements.reduce((prev, current) => {
        return prev + current.price
    }, price);

    function getOrderNumber() {
        getOrderDetails(`${API_URL}/orders`, orderList)
            .then(res => {
                setOrder(res.order.number);
            })
            .then(() => {
                openModal()
            })
    }

    return (
        <section className={styles.burgerConstructor}>
            {visible &&
                <Modal closeModal={closeModal}>                 
                    <OrderDetails orderInfo={order} />                
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
                <Button htmlType={'button'} onClick={getOrderNumber} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
      )
}

export default BurgerConstructor;