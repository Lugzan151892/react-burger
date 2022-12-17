import { NavLink } from 'react-router-dom';
import { Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Pages.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function ProfilePage() {

    const {email, name} = useSelector(store => store.user.user);

    const [emailValue, setEmailValue] = useState(email);
    const [nameValue, setNameValue] = useState(name);

    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const onChangeName = e => {
        setNameValue(e.target.value)
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
                            to='/login'               
                            className={'text text_type_main-medium ' + styles.navLink}                            
                        > 
                            Профиль
                        </NavLink>
                        <NavLink         
                            to='/login'               
                            className={'text text_type_main-medium ' + styles.navLink}                            
                        > 
                            История заказов
                        </NavLink>
                        <NavLink         
                            to='/login'               
                            className={'text text_type_main-medium ' + styles.navLink}                            
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
                        size={'default'}
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
                        // value={passwordValue}
                        // onChange={onChangePassword}
                        autoComplete='password'
                        icon='EditIcon'
                    />                    
                </form>                
            </div>            
        </div>
    )
}

export default ProfilePage;
