import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './UpgradedTab.module.css'

const UpgradedTab = ({type, title, current, setCurrent}) => {
    return (
        <a className={styles.anchor} href={`#${type}`}>
            <Tab value={type} active={current === type} onClick={setCurrent}>
                {title}
            </Tab>
        </a>
    )
}

export default UpgradedTab;