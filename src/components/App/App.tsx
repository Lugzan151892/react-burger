import AppHeader from '../AppHeader/AppHeader';
import { useEffect, FC } from "react";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {LoginPage, HomePage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, 
        ProfilePage, ProtectedRoute, OrderList, IngredientPage, OrderPage } from '../../pages';
import styles from "./App.module.css";
import { getDefaultIngridients } from '../../services/actions/ingridients';
import { useDispatch, useSelector } from '../../services/types/hooks';

const App: FC = () => {
  const modalVisisble = useSelector(store => store.ingridients.ingridientModalVisible);
  const orderModalVisible = useSelector(store => store.ingridients.orderDetailsModalVisible);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDefaultIngridients('ingredients'));
  }, []);

  return ( 
    <Router>    
      <AppHeader/>
      <main className={styles.app}>        
        <Switch>
          <ProtectedRoute forAuthUser={false} exact path="/login">
            <LoginPage/>
          </ProtectedRoute>
          <ProtectedRoute forAuthUser={false} exact path="/register">
            <RegisterPage/>
          </ProtectedRoute>
          <ProtectedRoute forAuthUser={false} exact path="/forgot-password">
            <ForgotPasswordPage/>
          </ProtectedRoute>
          <ProtectedRoute forAuthUser={false} exact path="/reset-password">
            <ResetPasswordPage/> 
          </ProtectedRoute> 
          {orderModalVisible ? 
            null :           
            <ProtectedRoute forAuthUser={true} path="/profile/orders/:id"> 
              <OrderPage/>
            </ProtectedRoute>
          }
          <ProtectedRoute forAuthUser={true} path="/profile"> 
            <ProfilePage/>
          </ProtectedRoute>
          <ProtectedRoute forAuthUser={true} path="/profile/orders"> 
            <ProfilePage/>
          </ProtectedRoute>          
          {orderModalVisible ?
            null :
            <ProtectedRoute forAuthUser={false} exact path="/feed/:id"> 
              <OrderPage/>
            </ProtectedRoute>
          }
          <ProtectedRoute forAuthUser={false} path="/feed"> 
            <OrderList/>
          </ProtectedRoute>
          {modalVisisble ?
            null :
            <ProtectedRoute forAuthUser={false} exact path="/ingridients/:id"> 
              <IngredientPage/>
            </ProtectedRoute>
          }          
            <HomePage/>
        </Switch>
      </main>    
    </Router>
  );
}

export default App;
