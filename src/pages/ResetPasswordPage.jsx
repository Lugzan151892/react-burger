import { useState } from 'react';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './Pages.module.css'
import { resetPassword } from '../utils/user-api';

function ResetPasswordPage() {
    
    const [passwordValue, setPasswordValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }
    const onChangeInput = e => {
        setInputValue(e.target.value)
    }

    const handleResetPassword = () => {
        resetPassword('password-reset/reset', passwordValue, inputValue)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>  
            <form className={styles.form} action="">                        
                <PasswordInput         
                    name={'password'}
                    extraClass="mt-6 mb-6"
                    value={passwordValue}
                    onChange={onChangePassword}
                    autoComplete='password'
                    placeholder='Введите новый пароль'
                />     
                <Input
                    type={'text'}
                    placeholder='Введите код из письма'
                    name={'token'}
                    value={inputValue}
                    onChange={onChangeInput}
                    autoComplete='token'
                    extraClass="mb-6"
                />
                <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={handleResetPassword}>
                    Сохранить
                </Button>
            </form>
            <p className="text text_type_main-small mb-4">Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
        </div>
    )
}

export default ResetPasswordPage;
