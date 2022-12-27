import { useState } from 'react';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, Redirect } from 'react-router-dom';
import styles from './Pages.module.css'
import { resetPassword } from '../utils/user-api';
import { useSelector } from 'react-redux';

function ResetPasswordPage() {

    const history = useHistory();
    const isMailSend = useSelector(store => store.user.wasPasswordReset);
    const [passwordValue, setPasswordValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }
    const onChangeInput = e => {
        setInputValue(e.target.value)
    }

    const handleResetPassword = (e) => {
        e.preventDefault();
        resetPassword('password-reset/reset', passwordValue, inputValue)
            .then(() => {                                    
                alert('Пароль успешно изменен');
                history.replace({ pathname: '/login' });
            })
            .catch(err => console.log(err));
    }

    return (
        isMailSend ?
        <div className={styles.container}>
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>  
            <form className={styles.form} onSubmit={handleResetPassword}>                        
                <PasswordInput         
                    name={'password'}
                    extraClass="mt-6 mb-6"
                    value={passwordValue}
                    onChange={onChangePassword}
                    autoComplete='password'
                    placeholder='Введите новый пароль'
                    required
                />     
                <Input
                    type={'text'}
                    placeholder='Введите код из письма'
                    name={'token'}
                    value={inputValue}
                    onChange={onChangeInput}
                    autoComplete='token'
                    extraClass="mb-6"
                    required
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                    Сохранить
                </Button>
            </form>
            <p className="text text_type_main-small mb-4">Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
        </div>
        :
        <Redirect to='/forgot-password'/>
    )
}

export default ResetPasswordPage;
