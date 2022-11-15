import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "./App.module.css";


function App() {

  return (
    <>
      <AppHeader />      
      <main className={styles.app}>
          <BurgerIngredients />
          <BurgerConstructor />
      </main>
    </>
  );
}

export default App;