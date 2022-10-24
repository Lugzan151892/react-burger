import React from "react";
import { Tab, CurrencyIcon, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../utils/data';
import styles from './BurgerIngredients.module.css'
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

// To do list:
// 1. !(Выполнено) Реализовать работу табов.
// 2. !(Выполнено) Подумать над скролом.
// 3. !(Выполнено) Лишние элементы должны скрываться.
// 4. Реализовать счетчики при выборе компонента.

const BurgerElement = (props) => {
    const [amount, setAmount] = React.useState(0);
    
    return (
        <div className={`${styles.burgerElement} mt-2 mb-5 ml-4`} onClick={()=>{props.addItem();
        setAmount(1)}} key={props.element.index}>
            <img className={styles.image} alt={props.element.name} src={props.element.image} />
            <p>{amount}</p>
            <div className={styles.priceContainer}>
                <p className={`mr-2 mt-2 mb-2 text text_type_digits-default ${styles.price}`}>{props.element.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.name} text text_type_main-default pb-3`}>{props.element.name}</p>
        </div>
    );
};

function BurgerIngredients() { 
    const [current, setCurrent] = React.useState('bun');
    const [arr, setArr] = React.useState([]);

    function addItem (item) {
        if (arr.includes(item)) {
            return console.log('Already chosen');
        }
        setArr([
            ...arr,
            item
        ])
    }

    function removeItem(id) {
        let index;
        console.log(id)
        arr.forEach(element => {
            if(element.id === id) {
                index = arr.indexOf(element);
            } console.log('Dannogo elementa net')
        })
        console.log(index)
        setArr([...arr.slice(0, index), ...arr.slice(index + 1)]);
    }

    return (
        <>
            <section className={styles.createSection}>
                <h2 className={`${styles.title} text text_type_main-large mb-5`}>Соберите бургер</h2>
                <div style={{ display: 'flex' }}>
                    <a className={styles.anchor} href="#bun">
                    <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    </a>
                    <a className={styles.anchor} href="#sauce">
                    <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    </a>
                    <a className={styles.anchor} href="#main">
                    <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                    </a>
                </div>
                <div className={styles.container}>            
                    <div id={'bun'} className={styles.typesContainer}>
                        <h2 className={`${styles.title} text text_type_main-medium mt-5 mb-2`}>Булки</h2>                    
                        {data.map((item, index) => (
                            item.type === 'bun' && (    
                            <BurgerElement element={item} removeItem={() => removeItem(item)} addItem={() => addItem(item)}></BurgerElement>                            
                            )                        
                        ))}
                    </div>
                    <div id={'sauce'} className={styles.typesContainer}>
                        <h2 className={`${styles.title} text text_type_main-medium mt-5 mb-2`}>Соусы</h2>                    
                        {data.map(item => (
                            item.type === 'sauce' &&
                            <BurgerElement element={item} addItem={() => addItem(item)}></BurgerElement>                                          
                        ))}
                    </div>
                    <div id={'main'} className={styles.typesContainer}>
                        <h2 className={`${styles.title} text text_type_main-medium mt-5 mb-2`}>Начинки</h2>                    
                        {data.map(item => (
                            item.type === 'main' &&
                            <BurgerElement element={item} addItem={() => addItem(item)}></BurgerElement>                       
                        ))}
                    </div>
                </div>
            </section>
            <section style={{ margin: "40px 0 0 40px" }}>
                <BurgerConstructor remove={removeItem} data={arr}></BurgerConstructor>
            </section>
        </>
    );
}

export default BurgerIngredients;

