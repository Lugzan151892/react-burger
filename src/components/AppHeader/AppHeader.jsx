import styles from './AppHeader.module.css'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (
        <header className={styles.header} >
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <ul className={styles.menu}>
                    <li className={styles.list}><a href="#" className={styles.link}><BurgerIcon type="primary" /><p className='text text_type_main-default ml-2'>Конструктор</p></a></li>
                    <li className={styles.list}><a href="#" className={styles.link}><ListIcon type="secondary" /><p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p></a></li>
                </ul>
                <ul className={styles.user}>                
                    <li className={styles.list}><a href="#" className={styles.link}><ProfileIcon type="secondary" /><p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p></a></li>
                </ul>            
            </nav>
        </header>
    );
}

export default AppHeader;