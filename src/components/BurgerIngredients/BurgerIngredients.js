import React from "react";
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../utils/data';
import styles from './BurgerIngredients.module.css'

// To do list:
// 1. !(Выполнено) Реализовать работу табов.
// 2. !(Выполнено) Подумать над скролом.
// 3. !(Выполнено) Лишние элементы должны скрываться.
// 4. Реализовать счетчики при выборе компонента.

function BurgerIngredients() {

    const [current, setCurrent] = React.useState('one');
         

    return (
        <section className={styles.createSection}>
            <h2 className={`${styles.title} text text_type_main-large mb-5`}>Соберите бургер</h2>
            <div style={{ display: 'flex' }}>
                <a className={styles.anchor} href="#bun">
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                </a>
                <a className={styles.anchor} href="#sauce">
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                </a>
                <a className={styles.anchor} href="#main">
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
                </a>
            </div>
            <div className={styles.container}>            
                <div id={'bun'} className={styles.typesContainer}>
                    <h2 className={`${styles.title} text text_type_main-medium mt-5 mb-2`}>Булки</h2>                    
                    {data.map(item => (
                        item.type === 'bun' &&
                        <div className={`${styles.burgerElement} mt-2 mb-5 ml-4`} key={item.id}>
                            <img className={styles.image} alt={item.name} src={item.image} />
                            <div className={styles.priceContainer}>
                                <p className={`mr-2 mt-2 mb-2 text text_type_digits-default ${styles.price}`}>{item.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p className={`${styles.name} text text_type_main-default pb-3`}>{item.name}</p>
                        </div>
                    ))}
                </div>
                <div id={'sauce'} className={styles.typesContainer}>
                    <h2 className={`${styles.title} text text_type_main-medium mt-5 mb-2`}>Соусы</h2>                    
                    {data.map(item => (
                        item.type === 'sauce' &&
                        <div className={`${styles.burgerElement} mt-2 mb-5 ml-4`} key={item.id}>
                            <img className={styles.image} alt={item.name} src={item.image} />
                            <div className={styles.priceContainer}>
                                <p className={`mr-2 mt-2 mb-2 text text_type_digits-default ${styles.price}`}>{item.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p className={`${styles.name} text text_type_main-default pb-3`}>{item.name}</p>
                        </div>
                    ))}
                </div>
                <div id={'main'} className={styles.typesContainer}>
                    <h2 className={`${styles.title} text text_type_main-medium mt-5 mb-2`}>Начинки</h2>                    
                    {data.map(item => (
                        item.type === 'main' &&
                        <div className={`${styles.burgerElement} mt-2 mb-5 ml-4`} key={item.id}>
                            <img className={styles.image} alt={item.name} src={item.image} />
                            <div className={styles.priceContainer}>
                                <p className={`mr-2 mt-2 mb-2 text text_type_digits-default ${styles.price}`}>{item.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p className={`${styles.name} text text_type_main-default pb-3`}>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            
        </section>
    );
}

export default BurgerIngredients;

