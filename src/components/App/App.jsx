import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "./App.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

  return (
    <>
      <AppHeader />     
      <DndProvider backend={HTML5Backend}> 
        <main className={styles.app}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider> 
    </>
  );
}

export default App;

