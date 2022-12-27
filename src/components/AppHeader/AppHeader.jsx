import styles from './AppHeader.module.css'
import { NavLink, useRouteMatch } from 'react-router-dom';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {

    const matchOrder = useRouteMatch({
        path: "/order-list",
    });

    const matchProfile = useRouteMatch({
        path: "/profile" || "/profile/orders",
    });

    const matchMain = useRouteMatch({
        path: "/",
    });

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
                            <BurgerIcon type={matchMain.isExact ? "primary" : "secondary"} />
                            <p className='ml-1'>Конструктор</p>
                        </NavLink>                        
                    </li>
                    <li className={`${styles.list} ml-4`}>
                        <NavLink
                                to='/order-list'
                                exact
                                className={`text text_type_main-default ml-2 text_color_inactive ${styles.link}`}
                                activeClassName={styles.link_active}
                        >
                            <ListIcon type={matchOrder ? "primary" : "secondary"} />
                            <p className='ml-1'>Лента заказов</p>                            
                        </NavLink>                        
                    </li>
                </ul>
                <ul className={styles.user}>                
                    <li className={styles.list}>
                        <NavLink
                                to='/profile'                                
                                className={`text text_type_main-default text_color_inactive ml-2 ${styles.link}`}
                                activeClassName={styles.link_active}
                        >
                            <ProfileIcon type={matchProfile ? "primary" : "secondary"} />
                            <p className='ml-1'>Личный кабинет</p>                            
                        </NavLink>
                    </li>
                </ul>            
            </nav>
        </header>
    );
}

export default AppHeader;

