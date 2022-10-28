import React from "react";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './SelectedElement.module.css'
import PropTypes from 'prop-types';

const SelectedElement = ({element, remove, dragStartHandler, dragOverHandler, dropHandler}) => {

    return (
        <div 
            className={styles.element}
            draggable={element.type !== 'bun' ? true : false}
            onDragStart={(e) => dragStartHandler(e, element)}
            onDragOver={(e) => dragOverHandler(e, element)}
            onDrop={(e) => dropHandler(e, element)}

        >
            {element.type === 'bun' ? null :
            (<div className='mr-2'>
                <DragIcon type="primary" />
            </div>)
            }            
            <ConstructorElement
                type={element.type}
                isLocked={element.type === 'bun' && true}
                text={element.name}
                price={element.price}
                thumbnail={element.image}
                handleClose={() => remove(element)}
            />
        </div>
    );
};

SelectedElement.propTypes = {
    element: PropTypes.object,    
    remove: PropTypes.func,
    dragStartHandler: PropTypes.func,
    dragOverHandler: PropTypes.func,
    dropHandler: PropTypes.func,
}

export default SelectedElement;