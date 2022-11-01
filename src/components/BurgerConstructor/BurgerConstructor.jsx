import React from "react";
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css'
import SelectedElement from "../SelectedElement/SelectedElement";
import PropTypes from 'prop-types';

const BurgerConstructor = ({data, remove, openIngridientModal, openOrderModal}) =>{

    const sortElements = (a, b) => a.id > b.id ? 1 : -1;

    const [elementList, setElementList] = React.useState([]);

    React.useEffect(() => {
        setElementList(data)
    }, [data]);

    // const [currentElement, setCurrentElement] = React.useState(null);

    // function dragStartHandler(e, card) {
    //     e.stopPropagation();
    //     setCurrentElement(card)
    // }
    
    // function dragOverHandler(e) {
    //     e.preventDefault();
    // }

    // function dropHandler(e, card) {
    //     e.preventDefault();
            
    //     setElementList(elementList.map(elem => {
    //         if(elem.id === card.id) {
    //             return {...elem, id: currentElement.id }
    //         }
    //         if(elem.id === currentElement.id) {
    //             return {...elem, id: card.id }
    //         }
    //         return elem;
    //     }))
    // }

    const price = 0;

    const summ = data.reduce((prev, current) => {
        return prev + current.price
    }, price);

    return (
        <section className={styles.burgerConstructor}>
            <div className={styles.burgerElements}>
                {data && elementList.sort(sortElements).map((element, number) => (
                <SelectedElement 
                    remove={remove} 
                    key={number} 
                    element={element}
                    openModal={openIngridientModal}
                    // dragStartHandler={dragStartHandler}
                    // dragOverHandler={dragOverHandler}
                    // dropHandler={dropHandler}
                    >
                </SelectedElement>)
                )}
            </div>
            <div className={`${styles.burgerOrder} mt-5`}>
                <div className={styles.priceContainer}>
                    <p className={`mr-2 mt-3 mb-3 text text_type_digits-medium`}>{summ}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType={'button'} onClick={openOrderModal} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
      )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
      })).isRequired,
    remove: PropTypes.func.isRequired,
    openIngridientModal: PropTypes.func.isRequired,
    openOrderModal: PropTypes.func.isRequired
}; 

export default BurgerConstructor;