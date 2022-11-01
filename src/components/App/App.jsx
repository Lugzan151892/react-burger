import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngridientDetails from '../IngredientDetails/IngredientDetails';
import styles from "./App.module.css";

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [loadedElements, setLoadedElements] = React.useState([]);
  React.useEffect(() => {
    return async function getBurgerElements() {
      const response = await fetch(apiUrl)
        .then((res)=> res.json())
        .then((res)=> res.data)
        .catch(err => console.log(err));
      setLoadedElements(response);
    }
  }, []);

  const [arr, setArr] = React.useState([]); 
  const [visible, setVisible] = React.useState(false);
  const [currentModal, setCurrentModal] = React.useState('order');
  const [elementInModal, setElementInModal] = React.useState(null);

  function openIngridientDetails(item) {
    setElementInModal(item);
    setVisible(true);
    setCurrentModal('ingridient');
  }

  function openOrderDetails() {
    setVisible(true);
    setCurrentModal('order');
  }

  function closeModal() {
    setVisible(false);
  }

  function addItem(item) {
    const bunInArr = arr.find((element) => element.type === 'bun');
      
    let date = new Date();
    
    if (bunInArr) { 
      item.type === 'bun' ?     
      alert('Вы можете выбрать только один тип булки'):
      setArr([
        ...arr,
        {
          ...item,
          'id' : date.getTime()
        }        
      ]);
    } else {
      item.type === 'bun' ?
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
      ]) :
      setArr([
        ...arr,
        {
          ...item,
          'id' : date.getTime()
        }        
      ]);
    }            
  }

  function removeItem (element) {
    setArr(arr.filter(arrItem => arrItem.id !== element.id))
  }

  return (
    <>
      <AppHeader />
      <ModalOverlay closeModal={closeModal} visible={visible}>
        {currentModal === 'order' ? 
          <OrderDetails closeModal={closeModal}/> :
          <IngridientDetails closeModal={closeModal} item={elementInModal}/>
        }        
      </ModalOverlay>
      <main className={styles.app}>        
        <BurgerIngredients defaultElements={loadedElements} addItem={addItem} data={arr}/>
        <BurgerConstructor openOrderModal={openOrderDetails} openIngridientModal={openIngridientDetails} remove={removeItem} data={arr} />
      </main>
    </>
  );
}

export default App;