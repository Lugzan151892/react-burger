import React, { useRef } from "react";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './SelectedElement.module.css';
import { useDrag, useDrop } from "react-dnd";
import { deleteItemInBurger, moveItemInBurger } from "../../services/actions/ingridients";
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const { elementPropTypes } = require('../../utils/data.js');

const SelectedElement = ({element, type}) => {

    const dispatch = useDispatch();
    const checkDraggable = element.type !== 'bun';

    function checkName(type, element){
        switch (type) {
            case 'bottom':
                return `${element.name} низ`;
            case 'top': 
                return `${element.name} верх`;
            default:
                return element.name;
        }
    }

    const [, dragRef] = useDrag({
        type: "constructorIngridient",
        item: {...element},
    });

    function onDropHandler(item){        
        dispatch(moveItemInBurger(item, element));
    }

    const [,dropTarget] = useDrop({
        accept: "constructorIngridient",
        drop(item) {
            onDropHandler(item);
        },
        hover: ((item) => {           
            dispatch(moveItemInBurger(item, element));
            item.uniqueId = element.uniqueId;
        })
    });

    const ref = useRef(null);
    const dragDropRef = dragRef(dropTarget(ref));

    function deleteItem() {
        dispatch(deleteItemInBurger(element.uniqueId));
    }

    return (
        checkDraggable ? 
        <div className={styles.element} ref={dragDropRef}>
            <div className='mr-2'>
                <DragIcon type="primary" />
            </div>            
            <ConstructorElement
            handleClose={deleteItem}
            type={type}
            isLocked={element.type === 'bun'}
            text={checkName(type, element)}               
            price={element.price}
            thumbnail={element.image}
            draggable
            />
        </div> :
        <div className={styles.element}>
            <ConstructorElement
                handleClose={deleteItem}
                type={type}
                isLocked={element.type === 'bun'}
                text={checkName(type, element)}               
                price={element.price}
                thumbnail={element.image}
                draggable
            />
        </div>        
    );
};

SelectedElement.propTypes = {
    element: PropTypes.shape(elementPropTypes).isRequired,
    type: PropTypes.string
}

export default SelectedElement;

