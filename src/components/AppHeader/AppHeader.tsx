import styles from './AppHeader.module.css';
import { NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

const AppHeader: FC = () => {

    interface MatchParams {
        path: string;
    }
    const history = useHistory();
    const matchOrder = useRouteMatch<MatchParams>({
        path: "/feed",
    });    

    const matchProfile = useRouteMatch<MatchParams>({
        path: "/profile" || "/profile/orders",
    });

    const matchMain = useRouteMatch<MatchParams>({
        path: "/",
    });

    return (
        <header className={styles.header} >
            <nav className={styles.nav}>
                <div className={styles.logo}
                    onClick={() => {                        
                        history.replace({ pathname: `/` })
                    }}
                >
                    <Logo/>
                </div>
                <ul className={styles.menu}>
                    <li className={styles.list}>
                        <NavLink
                            to='/'
                            exact
                            className={`text text_type_main-default text_color_inactive ${styles.link}`}
                            activeClassName={styles.link_active}
                        >
                            <BurgerIcon type={matchMain && matchMain.isExact ? "primary" : "secondary"} />
                            <p className='ml-1'>Конструктор</p>
                        </NavLink>                        
                    </li>
                    <li className={`${styles.list} ml-4`}>
                        <NavLink
                                to='/feed'
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

