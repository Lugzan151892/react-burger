import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginPage, HomePage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, ProfilePage } from '../../pages';
import styles from "./App.module.css";

function App() {

  return ( 
    <Router>
      <AppHeader />
      <main className={styles.app}>
        <Switch>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route> 
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>    
          <Route path="/profile" exact={true}>
            <ProfilePage />
          </Route>        
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;

