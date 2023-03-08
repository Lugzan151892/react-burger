import { FC, useEffect } from "react";
import styles from './IngredientDetails.module.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from "../../services/types/hooks";

const IngredientDetails: FC = () => {

    const item = useSelector(store => store.ingridients.currentIngridient);
    const history = useHistory();

    useEffect(() => {
        if(item) {
            history.replace({ pathname: `ingridients/${item._id}` });
        }
        // eslint-disable-next-line
    }, []);

    return (item &&
        <div className={styles.ingridient} onClick={(e) => e.stopPropagation()}>
            <div className={styles.title}>
                <h2 className='text text_type_main-large'>Детали ингредиента</h2>
            </div>
            <img src={item.image_large} alt={item.name} />
            <p className="text text_type_main-medium mt-4 mb-8">{item.name}</p>
            <div className={styles.stats}>
                <div className={`${styles.cell} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.calories}</p>
                </div>
                <div className={`${styles.cell} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.proteins}</p>
                </div>
                <div className={`${styles.cell} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.fat}</p>
                </div>
                <div className={styles.cell}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
};

export default IngredientDetails;

