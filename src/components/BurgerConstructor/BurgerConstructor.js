import React from "react";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css'

// To do:
// 1. Подумать над подгрузкой элементов при выборе. (Возможно они должны быть отдельным элементом, который будет подгружаться).
// 2. Реализовать счетчик окончательной суммы.
// 3. !(Выполнено) Подумать над скролл-баром.
// 4. !(Выполнено) Не забыть после реализации скролла, сделать отступы у секции.


const SelectedElement = (props) => {

    return (
        <div className={styles.element}>
            {props.type ? null : 
            <div className='mr-2'>
                <DragIcon type="primary" />
            </div>
            }
            <ConstructorElement
                type={props.type}
                isLocked={props.isLocked}
                text={props.text}
                price={props.element.price}
                thumbnail={props.element.image}
                handleClose={()=>{props.remove(props.element.id)}}
            />
        </div>
    );
};

function BurgerConstructor(props) {
    let currentPrice = 0;
    props.data.map((element) => element.type === 'bun' ? (currentPrice += element.price*2) : (currentPrice += element.price));
    
    const makeCorrectBurger = (element) => {
        if (element.type === 'bun') {
            return (
                <>
                    <SelectedElement element={element} text={`${element.name} (верх)`} isLocked={true} type={'top'}></SelectedElement>
                    <SelectedElement element={element} text={`${element.name} (низ)`} isLocked={true} type={'bottom'}></SelectedElement>
                </>
            )
        }
        return (
            <SelectedElement remove={props.remove} text={element.name} element={element} isLocked={false}></SelectedElement>
        )
    }

    return (
        <>
            <div className={styles.burgerElements}>
                {props.data && props.data.map(element => makeCorrectBurger(element))}
            </div>
            <div className={`${styles.burgerOrder} mt-5`}>
                <div className={styles.priceContainer}>
                    <p className={`mr-2 mt-3 mb-3 text text_type_digits-medium`}>{currentPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large">
                    Нажми на меня
                </Button>
            </div>
        </>
      )
}

export default BurgerConstructor;