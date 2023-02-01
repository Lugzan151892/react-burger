import AppHeader from '../AppHeader/AppHeader';
import { useEffect } from "react";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {LoginPage, HomePage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, 
        ProfilePage, ProtectedRoute, OrderList, IngridientPage, OrderPage } from '../../pages';
import styles from "./App.module.css";
import { getDefaultIngridients } from '../../services/actions/ingridients';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const modalVisisble = useSelector(store => store.ingridients.ingridientModalVisible);
  const isCurrentOrder = useSelector(store => store.ingridients.currentOrderInModal);
  const orderModalVisible = useSelector(store => store.ingridients.orderDetailsModalVisible);
  const dispatch = useDispatch();

  useEffect(() => {    
    dispatch(getDefaultIngridients('ingredients'));
  }, [])

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
          {isCurrentOrder ?            
            <ProtectedRoute forAuthUser={true} path="/profile/orders/:id"> 
              <OrderPage/>
            </ProtectedRoute> :
            <ProtectedRoute forAuthUser={true} path="/profile"> 
              <ProfilePage/>
            </ProtectedRoute>
          }
          {orderModalVisible ?
            null :
            <ProtectedRoute forAuthUser={true} exact path="/feed/:id"> 
              <OrderPage/>
            </ProtectedRoute>
          }
          <ProtectedRoute forAuthUser={true} path="/feed"> 
            <OrderList/>
          </ProtectedRoute>
          {modalVisisble ?
            null :
            <ProtectedRoute forAuthUser={true} exact path="/ingridients/:id"> 
              <IngridientPage/>
            </ProtectedRoute>
          }          
            <HomePage/>
        </Switch>
      </main>    
    </Router>
  );
}

export default App;

