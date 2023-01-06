import { NavLink, useRouteMatch, Route } from 'react-router-dom';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Pages.module.css';
import OrderListElement from '../components/OrderListElement/OrderListElement';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { logout, changeUserData } from '../services/actions/user';
import { getCookie, deleteCookie, checkIsChanged } from '../utils/data';
import testObjects from '../utils/testData';

function ProfilePage() {
    const { email, name } = useSelector(store => store.user.user);
    const accessToken = useSelector(store => store.user.accessToken);
    const dispatch = useDispatch();
    const [isChanged, setIsChanged] = useState(false);
    const [emailValue, setEmailValue] = useState(email);
    const [nameValue, setNameValue] = useState(name);
    const [passwordValue, setPasswordValue] = useState('');
    const defaultData = [email, name, ''];
    const compareData = [emailValue, nameValue, passwordValue];

    const { path } = useRouteMatch();

    const matchOrderList = useRouteMatch({
        path: "/profile/orders",
        strict: true,
        sensitive: true
    });

    const onSaveHandle = (e) => {
        e.preventDefault();
        dispatch(changeUserData('auth/user', accessToken, {
            'name': nameValue,
            'email': emailValue,
            'password': passwordValue
        }));
        setIsChanged(false);
    }

    useEffect(() => {
        setIsChanged(checkIsChanged(defaultData, compareData));
    }, [emailValue, nameValue, passwordValue]);

    const onResetHandle = () => {
        setEmailValue(email);
        setNameValue(name);
        setPasswordValue('');
    }
    
    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const onChangeName = e => {
        setNameValue(e.target.value);
    }

    const onChangePassword = e => {
        setPasswordValue(e.target.value);
    }

    const handleLogoutClick = () => {        
        dispatch(logout('auth/logout', getCookie('token')));
        deleteCookie('token');
    }

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
                            to='/profile/orders'               
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
                {matchOrderList ?
                    <Route 
                        path={`${path}/profile/orders`}
                        children={() => {
                            return (                            
                                <div className={styles.order_list}>
                                    {
                                        testObjects.map((el, index)=>(
                                            <OrderListElement status={true} item={el} key={index}/>
                                        ))
                                    }   
                                </div>
                            )
                        }}
                    /> : 
                    <Route
                    path={`${path}/`}
                    children={()=>{
                        return(
                            <form className={styles.form} onSubmit={onSaveHandle}>
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
                                    onChange={onChangePassword}
                                    autoComplete='password'
                                    icon='EditIcon'
                                />
                                {
                                    isChanged ?
                                    <div className={styles.buttons}>
                                        <Button htmlType='submit'>Сохранить</Button>
                                        <Button htmlType='reset' onClick={onResetHandle}>Отменить</Button>                           
                                    </div> :
                                    null
                                }                   
                            </form> 
                        )
                    }}
                />
                }
            </div>            
        </div>
    )
}

export default ProfilePage;
