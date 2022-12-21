import AppHeader from '../AppHeader/AppHeader';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { LoginPage, HomePage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, ProfilePage, ProtectedRoute, OrderList } from '../../pages';
import styles from "./App.module.css";

function App() {

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
          <ProtectedRoute forAuthUser={true} exact path="/"> 
            <HomePage/>
          </ProtectedRoute>                  
        </Switch>
      </main>    
    </Router>
  );
}

export default App;

