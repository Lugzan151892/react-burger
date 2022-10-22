import React from "react";
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../utils/data';
import styles from './BurgerIngredients.module.css'

function BurgerIngredients() {

    const [current, setCurrent] = React.useState('one');
         

    return (
        <section className={styles.createSection}>
            <h2>Соберите бургер</h2>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.container}>
                <h2 className={styles.title}>Булки</h2>                    
                {data.map(item => (
                    item.type === 'bun' &&
                    <div className={`${styles.burgerElement} mt-2 mr-3 mb-5 ml-4`} key={item.id}>
                        <img className={styles.image} alt={item.name} src={item.image} />
                        <div className={styles.price}>
                            <p >{item.price}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
            <div className={styles.container}>
                <h2 className={styles.title}>Соусы</h2>                    
                {data.map(item => (
                    item.type === 'sauce' &&
                    <div className={`${styles.burgerElement} mt-2 mr-3 mb-5 ml-4`} key={item.id}>
                        <img className={styles.image} alt={item.name} src={item.image} />
                        <div className={styles.price}>
                            <p >{item.price}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
            <div className={styles.container}>
                <h2 className={styles.title}>Начинки</h2>                    
                {data.map(item => (
                    item.type === 'main' &&
                    <div className={`${styles.burgerElement} mt-2 mr-3 mb-5 ml-4`} key={item.id}>
                        <img className={styles.image} alt={item.name} src={item.image} />
                        <div className={styles.price}>
                            <p >{item.price}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BurgerIngredients;

