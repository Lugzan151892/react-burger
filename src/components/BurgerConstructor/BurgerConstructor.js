import React from "react";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css'

// To do:
// 1. Подумать над подгрузкой элементов при выборе. (Возможно они должны быть отдельным элементом, который будет подгружаться).
// 2. Реализовать счетчик окончательной суммы.
// 3. !(Выполнено) Подумать над скролл-баром.
// 4. Не забыть после реализации скролла, сделать отступы у секции.


function BurgerConstructor() {
    
    return (
        <section className={styles.burgerConstructor}>
            <div className={styles.burgerElements}>
                <div className={styles.element}>
                    <div className='mr-2'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </div>
                <div className={styles.element}>
                    <div className='mr-2'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </div>
                <div className={styles.element}>
                    <div className='mr-2'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </div>
                <div className={styles.element}>
                    <div className='mr-2'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </div>
                <div className={styles.element}>
                    <div className='mr-2'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </div>
                <div className={styles.element}>
                    <div className='mr-2'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </div>
                <div className={styles.element}>
                    <div className='mr-2'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </div>
                <div className={styles.element}>
                    <div className='mr-2'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </div>
                <div className={styles.element}>
                    <div className='mr-2'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </div>
                <div className={styles.element}>
                    <div className='mr-2'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </div>
                <div className={styles.element}>
                    <div className='mr-2'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </div>
                <div className={styles.element}>
                    <div className='mr-2'>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </div>
                
            </div>
            <div className={`${styles.burgerOrder} mt-5`}>
                <div className={styles.priceContainer}>
                    <p className={`mr-2 mt-3 mb-3 text text_type_digits-medium`}>600</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large">
                    Нажми на меня
                </Button>
            </div>
        </section>
      )
}

export default BurgerConstructor;