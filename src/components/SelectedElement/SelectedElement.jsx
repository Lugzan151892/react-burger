import React from "react";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './SelectedElement.module.css'

const SelectedElement = ({element, remove}) => {
    return (
        <div className={styles.element}>
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

export default SelectedElement;