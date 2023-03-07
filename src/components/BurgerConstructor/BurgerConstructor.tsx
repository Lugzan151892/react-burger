// import { useSelector, useDispatch } from 'react-redux';
import { useDispatch, useSelector } from '../../services/types/hooks';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import { useHistory } from 'react-router-dom';
import { FC } from 'react';
import { useDrop } from "react-dnd";
import SelectedElement from "../SelectedElement/SelectedElement";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { closeOrderModal, addItemInBurger } from "../../services/actions/ingridients";
import { getOrderNumber, OPEN_ORDER_MODAL } from "../../services/actions/ingridients";
import { TIngridientWithUID } from '../../services/types/data';

const BurgerConstructor: FC = () =>{
    const history = useHistory();
    const elementsInBurger = useSelector((store) => store.ingridients.constructorIngridients);
    const accessToken = useSelector((store) => store.user.accessToken);
    const isUserAuth = useSelector((store) => store.user.userIsAuth);
    const bunInBurger = useSelector((store) => store.ingridients.bunInConstructor);
    const visible = useSelector((store) => store.ingridients.orderModalVisible);
    const dispatch = useDispatch();

    const sortItems = (a: {uniqueId: string}, b: {uniqueId: string} ) => a.uniqueId > b.uniqueId ? 1 : -1;

    function closeModal(): void {
        dispatch(closeOrderModal())
    }

    const onDropHandler = (element: TIngridientWithUID): void => {        
        dispatch(addItemInBurger(element));
    }

    const [, dropTarget] = useDrop({
        accept: "ingridient",
        drop(item: TIngridientWithUID) {
            onDropHandler(item);
        },
    });

    function openModal(): void {
        if(!isUserAuth) {
            history.replace({ pathname: '/login' });
            return;
        }
        const orderList = [];
        orderList.push(bunInBurger._id);
        elementsInBurger.forEach((element: TIngridientWithUID) => {
            console.log(element);
            orderList.push(element._id)
        });
        orderList.push(bunInBurger._id);
        dispatch({type: OPEN_ORDER_MODAL});        
        dispatch(getOrderNumber('orders', orderList, accessToken));
    }
    
    const price: number = bunInBurger ? bunInBurger.price * 2 : 0;

    const summ: number = elementsInBurger.reduce((prev: number, current: TIngridientWithUID) => {
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
                />}
                {elementsInBurger && elementsInBurger.sort(sortItems).map((element: TIngridientWithUID) => (
                <SelectedElement 
                    key={element.uniqueId} 
                    element={element}
                    type={element.type}
                />)
                )}
                {bunInBurger && 
                <SelectedElement                      
                    element={bunInBurger}
                    type={'bottom'}
                />}
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

