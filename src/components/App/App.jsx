import AppHeader from '../AppHeader/AppHeader';
import { useEffect } from "react";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { LoginPage, HomePage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, ProfilePage, ProtectedRoute, OrderList, IngridientPage } from '../../pages';
import styles from "./App.module.css";
import { getDefaultIngridients } from '../../services/actions/ingridients';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const modalVisisble = useSelector(store => store.ingridients.ingridientModalVisible);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDefaultIngridients('ingredients'));
  }, [])

  return ( 
    <Router>    
      <AppHeader />
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
          <ProtectedRoute forAuthUser={true} exact path="/profile"> 
            <ProfilePage/>
          </ProtectedRoute>
          <ProtectedRoute forAuthUser={true} exact path="/order-list"> 
            <OrderList/>
          </ProtectedRoute>
          {modalVisisble ?
            null :
            <ProtectedRoute forAuthUser={true} exact path="/ingridients/:id"> 
              <IngridientPage/>
            </ProtectedRoute>
          }          
          <ProtectedRoute forAuthUser={true} path="/"> 
            <HomePage/>
          </ProtectedRoute>                  
        </Switch>
      </main>    
    </Router>
  );
}

export default App;

