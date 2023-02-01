import AppHeader from '../AppHeader/AppHeader';
import { useEffect } from "react";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {LoginPage, HomePage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, 
        ProfilePage, ProtectedRoute, OrderList, IngredientPage, OrderPage } from '../../pages';
import styles from "./App.module.css";
import { getDefaultIngridients } from '../../services/actions/ingridients';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/wsActions';

function App() {
  const wsUrl = 'wss://norma.nomoreparties.space/orders';
  const modalVisisble = useSelector(store => store.ingridients.ingridientModalVisible);
  const orderModalVisible = useSelector(store => store.ingridients.orderDetailsModalVisible);
  const dispatch = useDispatch();
  const isUserAuth = useSelector(store => store.user.userIsAuth);
  const accessToken = useSelector(store => store.user.accessToken);
  const wsConnected = useSelector(store => store.orders.wsConnected);

  useEffect(() => {   
    if(isUserAuth) {
      if(wsConnected) {
        dispatch({type: WS_CONNECTION_CLOSED})
      }
      dispatch({ type: WS_CONNECTION_START, payload: `${wsUrl}?token=${accessToken.split('Bearer ')[1]}`});
    } else {
      if(wsConnected) {
        dispatch({type: WS_CONNECTION_CLOSED})
      }
      dispatch({ type: WS_CONNECTION_START, payload: `${wsUrl}/all` });
    }
    dispatch(getDefaultIngridients('ingredients'));
  }, [isUserAuth]);

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
            <ProtectedRoute forAuthUser={true} exact path="/feed/:id"> 
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

