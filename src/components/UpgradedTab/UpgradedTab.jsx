import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UpgradedTab.module.css';
import { SET_CURRENT_TAB } from "../../services/actions/ingridients";
import PropTypes from 'prop-types';

const UpgradedTab = ({type, title}) => {
    const current = useSelector(store => store.ingridients.currentTab);
    const dispatch = useDispatch();

    const setTab = () => {
        dispatch({type: SET_CURRENT_TAB, tab: type});
        const element = document.getElementById(type);
        if (element) element.scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className={styles.anchor} onClick={() => setTab(type)}>
            <Tab value={type} active={current === type} onClick={setTab}>
                {title}
            </Tab>
        </div>
    )
}

UpgradedTab.propTypes = {
    type: PropTypes.string.isRequired,    
    title: PropTypes.string.isRequired,
}

export default UpgradedTab;