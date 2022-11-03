import React from 'react';
import styles from "./ModalOverlay.module.css";
import PropTypes from 'prop-types'

function ModalOverlay({visible, closeModal}) {
    return (
        <div onClick={closeModal} className={visible ? [styles.modalOverlay, styles.active].join(' ') : styles.modalOverlay}>        
               
        </div>
    )
}

ModalOverlay.propTypes = {    
    closeModal: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};

export default ModalOverlay;