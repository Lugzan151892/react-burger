import React, {useEffect} from "react";
import styles from './DefaultBurgerIngredient.module.css';
import BurgerElement from "../BurgerElement/BurgerElement";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTab } from "../../services/actions/ingridients";

const DefaultBurgerIngredient = ({type, title, refType}) => {
    const dispatch = useDispatch();
    const loadedElements = useSelector(store => store.ingridients.defaultIngridients);

    const filtredElements = loadedElements.filter((item) => item.type === type);
    
    const options = {
        root: document.querySelector('#burgertabs'),
        rootMargin: '0px 0px -600px 0px',
        threshold:  0.1
    }

    function callback(entries) {
        if(entries[0].isIntersecting && entries[0].time > 1000) {
            dispatch(setCurrentTab(type));
        }
    }

    const observer = new IntersectionObserver(callback, options);
    
    useEffect(()=>{    
        const target = document.querySelector(`#${type}`);
        observer.observe(target);
    }, []);

    return (
        <div id={`${type}-id`} className={styles.typesContainer}>
            <h2 ref={refType} id={type} className={`${styles.title} text text_type_main-medium mt-5 mb-2`}>{title}</h2> 
                {filtredElements.map(item => (                    
                    <BurgerElement element={item} key={item._id}/>                                                
                ))}    
        </div>
    )
}

DefaultBurgerIngredient.propTypes = {   
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    refType: PropTypes.oneOfType([
        PropTypes.func, 
        PropTypes.shape({current: PropTypes.instanceOf(Element)})
    ])
}; 

export default DefaultBurgerIngredient;


