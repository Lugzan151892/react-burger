import {useEffect} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginPage, HomePage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, ProfilePage, ProtectedRoute } from '../../pages';
import styles from "./App.module.css";
import { getCookie } from '../../utils/data';
import { getNewAuthToken } from '../../utils/user-api';
import { fillUserData } from '../../services/actions/user';
import { useDispatch } from 'react-redux';

function App() {
  // const dispatch = useDispatch();

  // useEffect(()=> {      
  //   let token = getCookie('token');
  //   console.log(token ? token : false);
  //   if(token) {
  //     getNewAuthToken('auth/token', token)
  //     .then(res => {
  //       dispatch(fillUserData('auth/user', res.accessToken));
  //       console.log(res.accessToken)
  //     });
  //   } else {
  //     console.log('NETU COCKY')
  //   }
    
  // }, [])

  return ( 
    <Router>    
      <AppHeader />
      <main className={styles.app}>        
        <Switch>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/forgot-password" component={ForgotPasswordPage}/>
          <ProtectedRoute forAuthUser={true} exact path="/reset-password">
            <ResetPasswordPage/> 
          </ProtectedRoute>  
          <ProtectedRoute exact path="/profile"> 
            <ProfilePage/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/"> 
            <HomePage/>
          </ProtectedRoute>                  
        </Switch>
      </main>    
    </Router>
  );
}

export default App;

