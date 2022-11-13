import React from "react";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './SelectedElement.module.css'
import PropTypes from 'prop-types';
const { elementPropTypes } = require('../../utils/data.js');

const SelectedElement = ({element, type}) => {

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

    return (
        <div 
            className={styles.element}
            draggable={element.type !== 'bun'}
        >
            {element.type === 'bun' ? null :
            (<div className='mr-2'>
                <DragIcon type="primary" />
            </div>)
            }
            <ConstructorElement
                type={type}
                isLocked={element.type === 'bun'}
                text={checkName(type, element)}               
                price={element.price}
                thumbnail={element.image}
            />
        </div>
    );
};

SelectedElement.propTypes = {
    element: PropTypes.shape(elementPropTypes).isRequired,
    type: PropTypes.string
}

export default SelectedElement;