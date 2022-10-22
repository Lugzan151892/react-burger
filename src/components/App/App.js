import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

function App() { 
  return (
    <>
      <AppHeader />
      <main style={{display: 'flex', justifyContent: 'center'}}>
        <BurgerIngredients />        
      </main>
    </>
  );
}

export default App;