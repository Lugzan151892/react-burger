import { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import styles from './BurgerIngredients.module.css'
import DefaultBurgerIngredient from "../DefaultBurgerIngredient/DefaultBurgerIngredient";
import UpgradedTab from "../UpgradedTab/UpgradedTab";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { getDefaultIngridients, closeIngridientModal, setCurrentTab } from "../../services/actions/ingridients";

enum tabs {
    BUN = 'bun',
    SAUCE = 'sauce',
    MAIN = 'main'
}

const BurgerIngredients: FC = () => {

    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getDefaultIngridients('ingredients'));
        dispatch(setCurrentTab('bun'));
    }, []);

    const visible = useSelector(store => store.ingridients.ingridientModalVisible);
    const elementInModal = useSelector(store => store.ingridients.currentIngridient);

    function closeModal(): void {
        dispatch(closeIngridientModal());
        history.replace({ pathname: `/` });
    }

    const bunRef = useRef<HTMLInputElement>(null);
    const sauceRef = useRef<HTMLInputElement>(null);
    const mainRef = useRef<HTMLInputElement>(null);

    const setTab = (type: string): void => {
        dispatch(setCurrentTab(type));
        type === 'bun' && bunRef.current && bunRef.current.scrollIntoView({behavior: "smooth"});
        type === 'sauce' && sauceRef.current && sauceRef.current.scrollIntoView({behavior: "smooth"});
        type === 'main' && mainRef.current && mainRef.current.scrollIntoView({behavior: "smooth"});
    };

    return (    
        <section className={styles.createSection}>
            <Route 
                path={`${path}/ingredients/:id`} 
                children={() => {
                    return (
                        visible && elementInModal &&
                        <Modal closeModal={closeModal}>
                            <IngredientDetails/>
                        </Modal>
                    )
                }}
            />            
            <h2 className={`${styles.title} text text_type_main-large mb-5`}>
                Соберите бургер
            </h2>
            <div className={styles.tabsContainer}>
                <UpgradedTab setTab={setTab} type={tabs.BUN} title={'Булки'} />                    
                <UpgradedTab setTab={setTab} type={tabs.SAUCE} title={'Соусы'} />                    
                <UpgradedTab setTab={setTab} type={tabs.MAIN} title={'Начинки'} />                    
            </div>
            <div id={'burgertabs'} className={styles.container}>    
                <DefaultBurgerIngredient refType={bunRef} type={tabs.BUN} title={'Булки'} />
                <DefaultBurgerIngredient refType={sauceRef} type={tabs.SAUCE} title={'Соусы'} />
                <DefaultBurgerIngredient refType={mainRef} type={tabs.MAIN} title={'Начинки'} />
            </div>            
        </section>
    );
}

export default BurgerIngredients;



