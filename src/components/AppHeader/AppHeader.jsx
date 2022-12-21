import styles from './AppHeader.module.css'
import { NavLink } from 'react-router-dom';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (
        <header className={styles.header} >
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <ul className={styles.menu}>
                    <li className={styles.list}>
                        <NavLink
                            to='/'
                            exact
                            className={`text text_type_main-default text_color_inactive ml-2 ${styles.link}`}
                            activeClassName={styles.link_active}
                        >
                            <BurgerIcon type="primary" />
                            <p className='ml-1'>Конструктор</p>
                        </NavLink>                        
                    </li>
                    <li className={styles.list}>
                        <NavLink
                                to='/order-list'
                                exact
                                className={`text text_type_main-default ml-2 text_color_inactive ${styles.link}`}
                                activeClassName={styles.link_active}
                        >
                            <ListIcon type="secondary" />
                            <p className='ml-1'>Лента заказов</p>                            
                        </NavLink>                        
                    </li>
                </ul>
                <ul className={styles.user}>                
                    <li className={styles.list}>
                        <NavLink
                                to='/profile'
                                exact
                                className={`text text_type_main-default text_color_inactive ml-2 ${styles.link}`}
                                activeClassName={styles.link_active}
                        >
                            <ProfileIcon type="secondary" />
                            <p className='ml-1'>Личный кабинет</p>                            
                        </NavLink>
                    </li>
                </ul>            
            </nav>
        </header>
    );
}

export default AppHeader;

