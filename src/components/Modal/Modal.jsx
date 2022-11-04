
import React from 'react';
import ReactDOM from 'react-dom'
import styles from "./Modal.module.css";
import PropTypes from 'prop-types';
import close from '../../images/close.png';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const modalRoot = document.getElementById('modal');

function Modal({children, closeModal}) {  

    const openModalEscape = (e) => {
        if(e.key === 'Escape') {
            closeModal();
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', openModalEscape);
        return () => {
            document.removeEventListener('keydown', openModalEscape);
        }
    }, []);

    return ReactDOM.createPortal(
            (   
                <>                    
                    <div onKeyDown={(e) => openModalEscape(e)} tabIndex='0' className={[styles.modal, styles.active].join(' ')}>
                        <ModalOverlay closeModal={closeModal}/>
                        <div className={styles.container}>
                            <button onClick={closeModal} className={styles.button}><img alt={'Кнопка закрытия окна'} src={close}/></button>
                            {children}
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