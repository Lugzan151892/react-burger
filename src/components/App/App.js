import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function App() { 
  return (
    <>
      <AppHeader />
      <main style={{display: 'flex', justifyContent: 'center'}}>
        <BurgerIngredients />
        {/* <BurgerConstructor />    */}
      </main>
    </>
  );
}

export default App;