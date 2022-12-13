import { NavLink } from 'react-router-dom';
import { Input, PasswordInput,  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Pages.module.css';

function ProfilePage() {
    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={'mr-15 ' + styles.nav}>
                    <nav className='mb-20'>
                        <NavLink         
                            to='/login'               
                            className={'text text_type_main-medium ' + styles.navLink}                            
                        > 
                            Профиль
                        </NavLink>
                        <NavLink         
                            to='/login'               
                            className={'text text_type_main-medium ' + styles.navLink}                            
                        > 
                            История заказов
                        </NavLink>
                        <NavLink         
                            to='/login'               
                            className={'text text_type_main-medium ' + styles.navLink}                            
                        > 
                            Выход
                        </NavLink>                        
                    </nav>
                    <p className={'text text_type_main-default text_color_inactive ' + styles.text}>В этом разделе вы можете изменить свои персональные данные</p> 
                </div>           
                <form className={styles.form} action="">
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'}                               
                        size={'default'}
                        autoComplete='username'
                        extraClass="mb-6"
                        icon='EditIcon'
                    />          
                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        name={'login'}                               
                        size={'default'}
                        autoComplete='login'
                        extraClass="mb-6"
                        icon='EditIcon'
                    /> 
                    <PasswordInput         
                        name={'password'}
                        extraClass="mb-6"
                        // value={passwordValue}
                        // onChange={onChangePassword}
                        autoComplete='password'
                        icon='EditIcon'
                    />                    
                </form>                
            </div>            
        </div>
    )
}

export default ProfilePage;
