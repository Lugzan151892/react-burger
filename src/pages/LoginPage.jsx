import { useState } from 'react';
import { EmailInput, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { userLogIn } from '../services/actions/user';
import styles from './Pages.module.css'
import { Link } from 'react-router-dom';

function LoginPage() {

    const dispatch = useDispatch();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const loginClickHandle = () => {
        dispatch(userLogIn('auth/login', emailValue, passwordValue));
    }

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium">Вход</h2> 
            <form className={styles.form} action="">         
                <EmailInput
                    onChange={onChangeEmail}
                    value={emailValue}                
                    placeholder='E-mail'
                    name={'email'}
                    extraClass="mb-6 mt-6"
                />
                <PasswordInput         
                    name={'password'}
                    extraClass="mb-6"
                    value={passwordValue}
                    onChange={onChangePassword}
                    autoComplete='password'
                />
                <Button onClick={loginClickHandle} htmlType="button" type="primary" size="medium" extraClass="mb-20">
                    Войти
                </Button>
            </form>  
            <p className="text text_type_main-small mb-4">Вы — новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link></p>
            <p className="text text_type_main-small">Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link></p>
        </div>
    )
}

export default LoginPage;
