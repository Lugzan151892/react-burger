import { useSelector } from "react-redux"
import { useParams } from 'react-router-dom';
import styles from './Pages.module.css'

function IngridientPage () {

    const itemsList = useSelector(store => store.ingridients.defaultIngridients);
    const { id } = useParams();
    const [ item ] = itemsList.filter(el => el._id === id);

    return (
        <div className={styles.ingridient_container}>            
            <h2 className='text text_type_main-large'>Детали ингредиента</h2>            
            <img src={item.image_large} alt={item.name} />
            <p className="text text_type_main-medium mt-4 mb-8">{item.name}</p>
            <div className={styles.ingridient_stats}>
                <div className={`${styles.ingridient_cell} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.calories}</p>
                </div>
                <div className={`${styles.ingridient_cell} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.proteins}</p>
                </div>
                <div className={`${styles.ingridient_cell} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.fat}</p>
                </div>
                <div className={styles.ingridient_cell}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{item.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}

export default IngridientPage;
