import { NavLink, useRouteMatch, Route, useHistory } from 'react-router-dom';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Pages.module.css';
import OrderListElement from '../components/OrderListElement/OrderListElement';
import Modal from "../components/Modal/Modal";
import OrderModal from '../components/OrderModal/OrderModal';
import { useDispatch, useSelector } from '../services/types/hooks';
import { useEffect, useState, SyntheticEvent, FC, ChangeEvent } from 'react';
import { logout, changeUserData } from '../services/actions/user';
import { getCookie, deleteCookie, checkIsChanged } from '../utils/data';
import { wsConnectionStart, wsConnectionClosed } from '../services/actions/wsActions';
import { closeOrderDetailsModal } from '../services/actions/ingridients';
import { TOrderElement } from '../services/types/data';

const ProfilePage: FC = () => {
    const { email, name } = useSelector(store => store.user.user);
    const accessToken = useSelector(store => store.user.accessToken);
    const dispatch = useDispatch();
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [emailValue, setEmailValue] = useState<string>(email);
    const [nameValue, setNameValue] = useState<string>(name);
    const [passwordValue, setPasswordValue] = useState<string>('');
    const defaultData = [email, name, ''];
    const compareData = [emailValue, nameValue, passwordValue];
    const ordersList = useSelector(store => store.orders.allOrders);
    const orderModalVisible = useSelector(store => store.ingridients.orderDetailsModalVisible);
    const history = useHistory();
    const { path } = useRouteMatch();

    const matchOrderList = useRouteMatch({
        path: "/profile/orders",
        strict: true,
        sensitive: true
    });

    const onSaveHandle = (e: SyntheticEvent): void => {
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

    useEffect(() => {    
        if(accessToken) {
            dispatch(wsConnectionStart(`wss://norma.nomoreparties.space/orders?token=${accessToken.split('Bearer ')[1]}`));
        }
        return () => { dispatch(wsConnectionClosed()) };
    }, [])

    const onResetHandle = (): void => {
        setEmailValue(email);
        setNameValue(name);
        setPasswordValue('');
    }
    
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmailValue(e.target.value)
    }

    const onChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
        setNameValue(e.target.value);
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPasswordValue(e.target.value);
    }

    const handleLogoutClick = (): void => {        
        dispatch(logout('auth/logout', getCookie('token')));
        deleteCookie('token');
    }

    function closeModal(): void {
        dispatch(closeOrderDetailsModal());
        history.replace({ pathname: `/profile/orders` });
    }

    return (
        <>   
        <Route 
            path={`${path}/orders/:id`} 
            children={() => {
                return (
                    orderModalVisible &&
                    <Modal closeModal={closeModal}>
                        <OrderModal />
                    </Modal>
                )
            }}
        />                          
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
                                        ordersList.reverse().map((el: TOrderElement, index: number)=>(
                                            <OrderListElement item={el} isProfile={true} key={index}/>
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
    </>
    )
}

export default ProfilePage;
