import { FC } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from "../../services/types/hooks";
import styles from './UpgradedTab.module.css';
import PropTypes from 'prop-types';
import { TUpgradedTab } from "../../services/types/data";

const UpgradedTab: FC<TUpgradedTab> = ({type, title, setTab}) => {
    const current = useSelector(store => store.ingridients.currentTab);
    
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

