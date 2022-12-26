import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import styles from './Pages.module.css'
import { createNewUser } from '../services/actions/user';

function RegisterPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const onChangeName = e => {
        setNameValue(e.target.value)
    }

    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const redirectUser = () => {
        history.replace({pathname: '/profile'});
    }

    const handleClick = (e) => {
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
