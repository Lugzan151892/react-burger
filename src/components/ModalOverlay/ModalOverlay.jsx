import React from 'react';
import styles from "./ModalOverlay.module.css";
import PropTypes from 'prop-types'

function ModalOverlay({children, visible, closeModal}) {
    return (
        <div onClick={closeModal} className={visible ? [styles.modalOverlay, styles.active].join(' ') : styles.modalOverlay}>        
            {children}      
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.node,
    closeModal: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};

export default ModalOverlay;