import {FC, LegacyRef, useEffect} from "react";
import styles from './DefaultBurgerIngredient.module.css';
import BurgerElement from "../BurgerElement/BurgerElement";
import { useSelector, useDispatch } from "../../services/types/hooks";
import { setCurrentTab } from "../../services/actions/ingridients";
import { TIngridient, TDefaultBurgerIngredient, TIntersectionOptions } from "../../services/types/data";

const DefaultBurgerIngredient: FC<TDefaultBurgerIngredient> = ({ type, title, refType }) => {
    const dispatch = useDispatch();
    const loadedElements = useSelector(store => store.ingridients.defaultIngridients);

    const filtredElements: Array<TIngridient> = loadedElements.filter((item: TIngridient) => item.type === type);
    
    const options: TIntersectionOptions = {
        root: document.querySelector('#burgertabs'),
        rootMargin: '0px 0px -600px 0px',
        threshold:  0.1
    }

    function callback(entries: IntersectionObserverEntry[]): void {
        if(entries[0].isIntersecting && entries[0].time > 1000) {
            dispatch(setCurrentTab(type));
        }
    }

    const observer: IntersectionObserver = new IntersectionObserver(callback, options);
    
    useEffect(()=>{    
        const target = document.querySelector(`#${type}`) as HTMLElement;
        observer.observe(target);
    }, []);

    return (
        <div id={`${type}-id`} className={styles.typesContainer}>
            <h2 ref={refType} id={type} className={`${styles.title} text text_type_main-medium mt-5 mb-2`}>{title}</h2> 
                {filtredElements.map((item: TIngridient) => (                    
                    <BurgerElement element={item} key={item._id}/>                                                
                ))}    
        </div>
    )
}

export default DefaultBurgerIngredient;

