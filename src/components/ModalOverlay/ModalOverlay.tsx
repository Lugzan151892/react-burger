import { FC } from 'react';
import styles from "./ModalOverlay.module.css";
import { TModalOverlay } from '../../services/types/data';

const ModalOverlay: FC<TModalOverlay> = ({closeModal}) => {
    return (
        <div onClick={closeModal} className={[styles.modalOverlay, styles.active].join(' ')}>
        </div>
    )
}

export default ModalOverlay;

