import { useRef, FC } from "react";
import { useDispatch } from "../../services/types/hooks";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './SelectedElement.module.css';
import { useDrag, useDrop } from "react-dnd";
import { deleteItemInBurger, moveItemInBurger } from "../../services/actions/ingridients";
import { TElement } from "../../services/types/data";


type TSelectedElement = {
    element: TElement;
    type: string;
}

type TIngridient = 'bottom' | 'top' | undefined;

const SelectedElement: FC<TSelectedElement> = ({element, type}) => {
    const dispatch = useDispatch();
    const checkDraggable = element.type !== 'bun';

    function checkName(type: string | undefined, element: TElement){
        switch (type) {
            case 'bottom':
                return `${element.name} низ`;
            case 'top': 
                return `${element.name} верх`;
            default:
                return element.name;
        }
    }

    const getBunType = (): TIngridient  => {
        if(type === 'bottom' || type === 'top') {
            return type
        } else {
            return undefined;
        }
    }

    const [, dragRef] = useDrag({
        type: "constructorIngridient",
        item: {...element},
    });

    function onDropHandler(item: TElement): void{        
        dispatch(moveItemInBurger(item, element));
    }

    const [,dropTarget] = useDrop({
        accept: "constructorIngridient",
        drop(item) {
            onDropHandler(item);
        },
        hover: ((item: TElement) => {      
            dispatch(moveItemInBurger(item, element));
            item.uniqueId = element.uniqueId;
        })
    });
    
    const ref = useRef<HTMLInputElement>(null); 
    const dragDropRef: any = dragRef(dropTarget(ref));

    function deleteItem(): void {
        dispatch(deleteItemInBurger(element.uniqueId));
    }

    return (
        checkDraggable ? 
        <div className={styles.element} ref={dragDropRef} draggable>
            <div className='mr-2'>
                <DragIcon type="primary" />
            </div>            
            <ConstructorElement
                handleClose={deleteItem}
                type={getBunType()}
                isLocked={element.type === 'bun'}
                text={checkName(type, element)}               
                price={element.price}
                thumbnail={element.image}
            />
        </div> :
        <div className={styles.element} draggable>
            <ConstructorElement
                handleClose={deleteItem}
                type={getBunType()}
                isLocked={element.type === 'bun'}
                text={checkName(type, element)}               
                price={element.price}
                thumbnail={element.image}
            />
        </div>        
    );
};

export default SelectedElement;

