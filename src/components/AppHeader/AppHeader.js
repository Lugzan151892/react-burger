import styles from './AppHeader.module.css'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';


// To do list:
// 1. Поправить стили в шапке.


function AppHeader() {
    return (
        <header className={styles.header} >
            <nav className={styles.navigation}>
                <a href="#" className={styles.link}><BurgerIcon type="primary" /><p className='text text_type_main-default ml-2'>Конструктор</p></a>
                <a href="#" className={styles.link}><ListIcon type="primary" /><p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p></a>
                <Logo />                
                <a href="#" className={styles.link}><ProfileIcon type="primary" /><p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p></a>
            </nav>
        </header>
    );
}

export default AppHeader;