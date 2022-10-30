import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './UpgradedTab.module.css';
import PropTypes from 'prop-types';

const UpgradedTab = ({type, title, current, setCurrent, setTab}) => {
    return (
        <div className={styles.anchor} onClick={() => setTab(type)}>
            <Tab value={type} active={current === type} onClick={setCurrent}>
                {title}
            </Tab>
        </div>
    )
}

UpgradedTab.propTypes = {
    type: PropTypes.string,    
    title: PropTypes.string,
    current: PropTypes.string,    
    setCurrent: PropTypes.func,
    setTab: PropTypes.func
}

export default UpgradedTab;