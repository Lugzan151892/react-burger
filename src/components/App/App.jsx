import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "./App.module.css";

function App() { 

  const [arr, setArr] = React.useState([]);   

  function addItem(item) {
    const isBunInArr = (element) => element.type === 'bun';
    // const isBunInArr = arr.find(item => item.type === 'bun');
    let date = new Date();
    
    if (item.type === 'bun') {
      arr.some(isBunInArr) ? 
      alert('Вы можете выбрать только один тип булки') : 
      setArr([
        {
          ...item,
          'name' : item.name + ' верх',
          'id' : date.getMilliseconds(), 
        },
        ...arr,
        {
          ...item,
          'name' : item.name + ' низ',
          'id' : date.getTime() * 11
        }
      ])
    } else if (item.type !== 'bun') {
      setArr([
        ...arr,
        {
          ...item,
          'id' : date.getTime()
        }        
      ])
    }       
  }

  function removeItem (element) {
    setArr(arr.filter(arrItem => arrItem.id !== element.id))
  }

  return (
    <>
      <AppHeader />
      <main className={styles.app}>
        <BurgerIngredients addItem={addItem} data={arr}/>
        <BurgerConstructor remove={removeItem} data={arr}></BurgerConstructor>
      </main>
    </>
  );
}

export default App;