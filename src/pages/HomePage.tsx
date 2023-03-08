import { DndProvider } from "react-dnd";
import { FC } from 'react';
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";

const HomePage: FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>             
            <BurgerIngredients />
            <BurgerConstructor />
        </DndProvider>
    )
}

export default HomePage;
