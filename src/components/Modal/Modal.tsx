
import React, { FC, useEffect, KeyboardEvent } from 'react';
import ReactDOM from 'react-dom'
import styles from "./Modal.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/types/hooks';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import loading from '../../images/loading-gif.gif';
import { TModal } from '../../services/types/data';

const modalRoot: HTMLElement | null = document.getElementById('modal');

const Modal: FC<TModal> = ({children, closeModal}) => {  

    const handleEscape: any = (e: KeyboardEvent) => {
        if(e.key === 'Escape') {
            closeModal();
        }
    };

    const isLoading: boolean = useSelector(store => store.ingridients.orderNumberRequest);

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        }
    }, []);

    return modalRoot ? ReactDOM.createPortal(
            (   
                <>                    
                    <div onKeyDown={(e: KeyboardEvent): void => { handleEscape(e) }} tabIndex={0} className={[styles.modal, styles.active].join(' ')}>
                        <ModalOverlay closeModal={closeModal}/>
                        <div className={styles.container}>                        
                            {isLoading ?
                            <>
                                <img src={loading} alt="loading" />
                            </>  : 
                            <>
                                <button onClick={closeModal} className={styles.button}><CloseIcon type="primary" /></button>
                                {children}
                            </>
                            }                                                    
                        </div>
                    </div>
                </>
            ), 
            modalRoot
        ) : null;
};

export default Modal;

