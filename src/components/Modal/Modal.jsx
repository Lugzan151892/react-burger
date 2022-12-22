
import { useEffect } from 'react';
import ReactDOM from 'react-dom'
import styles from "./Modal.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import loading from '../../images/loading-gif.gif'

const modalRoot = document.getElementById('modal');

function Modal({children, closeModal}) {  

    const handleEscape = (e) => {
        if(e.key === 'Escape') {
            closeModal();
        }
    };

    const isLoading = useSelector(store => store.ingridients.orderNumberRequest);

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        }
    }, []);

    return ReactDOM.createPortal(
            (   
                <>                    
                    <div onKeyDown={(e) => handleEscape(e)} tabIndex='0' className={[styles.modal, styles.active].join(' ')}>
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
        );
};

Modal.propTypes = {
    children: PropTypes.node,
    closeModal: PropTypes.func.isRequired,
};

export default Modal;

