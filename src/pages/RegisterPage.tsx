import { useState, FC, ChangeEvent, SyntheticEvent } from 'react';
import { useDispatch } from '../services/types/hooks';
import { Input, Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import styles from './Pages.module.css'
import { createNewUser } from '../services/actions/user';

const RegisterPage: FC = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [nameValue, setNameValue] = useState<string>('');
    const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');

    const onChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
        setNameValue(e.target.value)
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPasswordValue(e.target.value)
    }

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmailValue(e.target.value)
    }

    const redirectUser = (): void => {
        history.replace({pathname: '/profile'});
    }

    const handleClick = (e: SyntheticEvent): void => {
        e.preventDefault();
        const formData = {
            'email': emailValue,
            'name': nameValue,
            'password': passwordValue
        };
        dispatch(createNewUser('auth/register', formData, redirectUser));
    }

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium">Регистрация</h2>  
            <form className={styles.form} onSubmit={handleClick}>
                <Input
                    type={'text'}
                    onChange={onChangeName}
                    value={nameValue}
                    placeholder={'Имя'}
                    name={'name'}                               
                    size={'default'}
                    autoComplete='username'
                    extraClass="mb-6 mt-6"
                    required
                />          
                <EmailInput
                    onChange={onChangeEmail}
                    value={emailValue}                
                    placeholder='E-mail'
                    name={'email'}
                    extraClass="mb-6"
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
                    Зарегистрироваться
                </Button>
            </form>
            <p className="text text_type_main-small mb-4">Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link></p>
        </div>
    )
}

export default RegisterPage;
