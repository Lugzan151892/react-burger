import { useState, FC, ChangeEvent, SyntheticEvent } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { getTokenForPassword } from '../services/actions/user';
import styles from './Pages.module.css';
import { useDispatch } from '../services/types/hooks';

const ForgotPasswordPage: FC = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [emailValue, setEmailValue] = useState<string>('');

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
    }

    function redirectToNextPage(): void {
        history.replace({ pathname: '/reset-password' });
    }

    const resetPasswordHandler = (e: SyntheticEvent): void => {
        e.preventDefault();
        dispatch(getTokenForPassword('password-reset', emailValue, redirectToNextPage))
    }

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium">Восстановление пароля</h2>  
            <form className={styles.form} onSubmit={resetPasswordHandler}>                        
                <EmailInput
                    onChange={onChangeEmail}
                    value={emailValue}                
                    placeholder='E-mail'
                    name={'email'}
                    extraClass="mb-6 mt-6"
                    required
                />                
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                    Восстановить
                </Button>
            </form>
            <p className="text text_type_main-small mb-4">Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></p>
        </div>
    )
}

export default ForgotPasswordPage;
