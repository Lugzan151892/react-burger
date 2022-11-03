import React from "react";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './SelectedElement.module.css'
import PropTypes from 'prop-types';
const { elementPropTypes } = require('../../utils/data.js');

const SelectedElement = ({element}) => {

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
                type={element.type}
                isLocked={element.type === 'bun'}
                text={element.name}                
                price={element.price}
                thumbnail={element.image}
            />
        </div>
    );
};

SelectedElement.propTypes = {
    element: PropTypes.shape(elementPropTypes).isRequired,
}

export default SelectedElement;