import { useState, FC, ChangeEvent, SyntheticEvent } from 'react';
import { EmailInput, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../services/types/hooks';
import { userLogIn } from '../services/actions/user';
import styles from './Pages.module.css';
import { Link, useHistory } from 'react-router-dom';

const LoginPage: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmailValue(e.target.value);
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPasswordValue(e.target.value);
    }

    function redirectUser(): void {
        history.replace({ pathname: '/' });
    }

    const loginClickHandle = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(userLogIn('auth/login', emailValue, passwordValue, redirectUser));
    }

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium">Вход</h2> 
            <form className={styles.form} onSubmit={loginClickHandle}>         
                <EmailInput
                    onChange={onChangeEmail}
                    value={emailValue}                
                    placeholder='E-mail'
                    name={'email'}
                    extraClass="mb-6 mt-6"
                    required
                />
                <PasswordInput         
                    name={'password'}
                    extraClass="mb-6"
                    value={passwordValue}
                    onChange={onChangePassword}
                    autoComplete='password'
                    required
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                    Войти
                </Button>
            </form>  
            <p className="text text_type_main-small mb-4">Вы — новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link></p>
            <p className="text text_type_main-small">Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link></p>
        </div>
    )
}

export default LoginPage;
