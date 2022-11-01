import React from "react";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './SelectedElement.module.css'
import PropTypes from 'prop-types';

const SelectedElement = ({element, remove, openModal}) => {

    return (
        <div 
            className={styles.element}
            draggable={element.type !== 'bun'}
            onClick={()=> openModal(element)}
            // onDragStart={(e) => dragStartHandler(e, element)}
            // onDragOver={(e) => dragOverHandler(e, element)}
            // onDrop={(e) => dropHandler(e, element)}
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
                openModal={() => openModal(element)}
                price={element.price}
                thumbnail={element.image}
                // handleClose={() => remove(element)}
            />
        </div>
    );
};

SelectedElement.propTypes = {
    element: PropTypes.shape({
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
      }).isRequired,    
    remove: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
}

export default SelectedElement;