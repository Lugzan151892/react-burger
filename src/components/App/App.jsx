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
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/forgot-password" component={ForgotPasswordPage}/>
          <Route exact path="/reset-password" component={ResetPasswordPage}/>   
          <Route exact path="/profile" component={ProfilePage}/>   
          <Route exact path="/" component={HomePage}/>          
        </Switch>
      </main>    
    </Router>
  );
}

export default App;

