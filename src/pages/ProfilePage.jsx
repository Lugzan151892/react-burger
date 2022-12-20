import { NavLink } from 'react-router-dom';
import { Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { logout, updateAuthToken } from '../services/actions/user';
import { getCookie, deleteCookie } from '../utils/data';

function ProfilePage() {
    const {email, name} = useSelector(store => store.user.user);
    const dispatch = useDispatch();

    const [emailValue, setEmailValue] = useState(email);
    const [nameValue, setNameValue] = useState(name);
    const [passwordValue, setPasswordValue] = useState('Введите новый пароль');

    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const onChangeName = e => {
        setNameValue(e.target.value)
    }

    const handleLogoutClick = () => {        
        dispatch(logout('auth/logout', getCookie('token')));
        dispatch(updateAuthToken('auth/token', getCookie('token')));
        deleteCookie('token');
    }

    useEffect(()=> {
        console.log(email, name)
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={'mr-15 ' + styles.nav}>
                    <nav className='mb-20'>
                        <NavLink         
                            to='/profile'  
                            exact             
                            className={'text text_type_main-medium text_color_inactive ' + styles.navLink}      
                            activeClassName={styles.navLink_active}                      
                        > 
                            Профиль
                        </NavLink>
                        <NavLink         
                            to='/'               
                            exact
                            className={'text text_type_main-medium text_color_inactive ' + styles.navLink}     
                            activeClassName={styles.navLink_active}                       
                        > 
                            История заказов
                        </NavLink>
                        <NavLink         
                            to='/login'  
                            exact             
                            className={'text text_type_main-medium text_color_inactive ' + styles.navLink}
                            onClick={handleLogoutClick}                       
                        > 
                            Выход
                        </NavLink>                        
                    </nav>
                    <p className={'text text_type_main-default text_color_inactive ' + styles.text}>В этом разделе вы можете изменить свои персональные данные</p> 
                </div>           
                <form className={styles.form} action="">
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'} 
                        value={nameValue}
                        onChange={onChangeName}
                        autoComplete='username'
                        extraClass="mb-6"
                        icon='EditIcon'
                    />          
                    <EmailInput                        
                        value={emailValue}
                        onChange={onChangeEmail}
                        placeholder={'Логин'}
                        name={'login'}
                        autoComplete='login'
                        extraClass="mb-6"
                        icon='EditIcon'
                    /> 
                    <PasswordInput         
                        name={'password'}
                        extraClass="mb-6"
                        value={passwordValue}
                        onChange={setPasswordValue}
                        autoComplete='password'
                        icon='EditIcon'
                    />                    
                </form>                
            </div>            
        </div>
    )
}

export default ProfilePage;
