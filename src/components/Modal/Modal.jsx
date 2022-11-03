
import React from 'react';
import ReactDOM from 'react-dom'
import styles from "./Modal.module.css";
import PropTypes from 'prop-types';
import close from '../../images/close.png';

const modalRoot = document.getElementById('modal');

function Modal({children, closeModal, visible, openModalEscape}) {
        
    return ReactDOM.createPortal(
            (
                <div onKeyDown={(e) => openModalEscape(e)} tabIndex='0' className={visible ? [styles.modal, styles.active].join(' ') : styles.modal}>
                    <button onClick={closeModal} className={styles.button}><img alt={'Кнопка закрытия окна'} src={close}/></button>
                    {children}
                </div>
            ), 
            modalRoot
        );
};

Modal.propTypes = {
    children: PropTypes.node,
    closeModal: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
};

export default Modal;