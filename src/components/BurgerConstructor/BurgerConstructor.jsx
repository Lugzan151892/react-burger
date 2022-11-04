import React from "react";
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css'
import SelectedElement from "../SelectedElement/SelectedElement";
import PropTypes from 'prop-types';
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
const { elementPropTypes } = require('../../utils/data.js');

const BurgerConstructor = ({data}) =>{

    const [visible, setVisible] = React.useState(false);    

    function closeModal() {
        setVisible(false);
    }

    function openModal(e) {
        setVisible(true);
    }

    const bunList = data.filter((item) => item.type === 'bun');
    const nonBunList = data.filter((item) => item.type !== 'bun');
    const price = 0;

    const summ = data.reduce((prev, current) => {
        return prev + current.price
    }, price);

    return (
        <section className={styles.burgerConstructor}>
            <Modal setVisible={setVisible} closeModal={closeModal} visible={visible}>
                {visible && 
                <OrderDetails/>
                }
            </Modal>
            <div className={styles.burgerElements}>
                {bunList[0] && 
                <SelectedElement                      
                    element={bunList[0]}
                    type={'top'}
                    >
                </SelectedElement>}
                {data && nonBunList.map((element, number) => (
                <SelectedElement 
                    key={number} 
                    element={element}
                    type={element.type}
                    >
                </SelectedElement>)
                )}
                {bunList[0] && 
                <SelectedElement                      
                    element={bunList[0]}
                    type={'bottom'}
                    >
                </SelectedElement>}
            </div>
            <div className={`${styles.burgerOrder} mt-5`}>
                <div className={styles.priceContainer}>
                    <p className={`mr-2 mt-3 mb-3 text text_type_digits-medium`}>{summ}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType={'button'} onClick={(e) => openModal(e)} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
      )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(elementPropTypes)).isRequired,
}; 

export default BurgerConstructor;