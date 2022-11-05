import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "./App.module.css";
import { getIngredients } from '../../utils/burger-api.js';

const API_URL = 'https://norma.nomoreparties.space/api';

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
        <BurgerIngredients defaultElements={loadedElements} data={loadedElements}/>
        <BurgerConstructor data={loadedElements} />
      </main>
    </>
  );
}

export default App;