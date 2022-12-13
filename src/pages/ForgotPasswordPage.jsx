import { useState } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { restorePassword } from '../utils/user-api';
import styles from './Pages.module.css'

function ForgotPasswordPage() {

    const [emailValue, setEmailValue] = useState('');   

    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const resetPasswordHandler = () => {
        restorePassword('password-reset', emailValue)
        .then(res => {
            if(res && res.success) {
                console.log(res);
            }
        })
        .catch(err => console.log(err.status));
    }

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>  
            <form className={styles.form} action="">                        
                <EmailInput
                    onChange={onChangeEmail}
                    value={emailValue}                
                    placeholder='E-mail'
                    name={'email'}
                    extraClass="mb-6 mt-6"
                />                
                <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={resetPasswordHandler}>
                    Восстановить
                </Button>
            </form>
            <p className="text text_type_main-small mb-4">Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
        </div>
    )
}

export default ForgotPasswordPage;
