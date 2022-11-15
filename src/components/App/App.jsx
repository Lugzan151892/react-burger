import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "./App.module.css";
import { getIngredients, API_URL } from '../../utils/burger-api.js';
import { IngredientsContext } from '../../services/IngredientsContext';

function App() {

  const [loadedElements, setLoadedElements] = React.useState([]);
  React.useEffect(() => {
    getIngredients(`${API_URL}/ingredients`)
      .then(res => setLoadedElements(res.data))  
  }, []);

  return (
    <>
      <AppHeader />      
      <main className={styles.app}>
        <IngredientsContext.Provider value={{loadedElements, setLoadedElements}}>          
          <BurgerIngredients />
          <BurgerConstructor />
        </IngredientsContext.Provider>
      </main>
    </>
  );
}

export default App;