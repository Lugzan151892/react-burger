import React from "react";
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css'
import SelectedElement from "../SelectedElement/SelectedElement";
import PropTypes from 'prop-types';

const BurgerConstructor = ({data, remove}) =>{

    const sectionRef = React.useRef();

    const sortElements = (a, b) => {
        if (a.id > b.id) {
            return 1
        } else {
            return -1
        }
    };
    const [elementList, setElementList] = React.useState([]);

    React.useEffect(() => {
        setElementList(data)
    }, [data])

    const [currentElement, setCurrentElement] = React.useState(null);

    function dragStartHandler(e, card) {
        e.stopPropagation();
        setCurrentElement(card)
    }
    
    function dragOverHandler(e) {
        e.preventDefault();
    }

    function dropHandler(e, card) {
        e.preventDefault();
        console.log(e.target);
        console.log(e.currentTarget);
        
        setElementList(elementList.map(elem => {
            if(elem.id === card.id) {
                return {...elem, id: currentElement.id }
            }
            if(elem.id === currentElement.id) {
                return {...elem, id: card.id }
            }
            return elem;
        }))
    }

    const price = 0;

    let summ = data.reduce((prev, current) => {
        return prev + current.price
    }, price);

    return (
        <section ref={sectionRef} className={styles.burgerConstructor}>
            <div className={styles.burgerElements}>
                {data && elementList.sort(sortElements).map((element, number) => (
                <SelectedElement 
                    remove={remove} 
                    key={number} 
                    element={element}
                    dragStartHandler={dragStartHandler}
                    dragOverHandler={dragOverHandler}
                    dropHandler={dropHandler}
                    >
                </SelectedElement>)
                )}
            </div>
            <div className={`${styles.burgerOrder} mt-5`}>
                <div className={styles.priceContainer}>
                    <p className={`mr-2 mt-3 mb-3 text text_type_digits-medium`}>{summ}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType={'button'} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
      )
}

BurgerConstructor.propTypes = {
    data: PropTypes.array,
    remove: PropTypes.func
}; 

export default BurgerConstructor;