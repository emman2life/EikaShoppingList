import './App.css';
import logo from './assets/images/logo.png'
import ShoppingList from './components/ShoppingList';
import ItemForm from './components/AddItem/ItemForm';
import ReactDOM from "react-dom";
import { useState, useReducer } from 'react';
import ListToggledDisplayButton from './components/shoppingStatus/ListToggledDisplayButton';
import useFetch from './customHooks/useFetch';
import { ListContext } from './ListContext';
import FormDisplayReducer from './FormDisplayReducer';
import SortList from './components/sort/SortList';

import WelcomeScreen from './WelcomeScreen';


function App() {
  const [sortBy, setSortBy] = useState("name");
  const [isAddFormDisplay, dispatch] = useReducer(FormDisplayReducer,false);
  const [acquiredList, setAcquiredList] = useState(true);

  const list = useFetch(sortBy);

  const welcomeText = WelcomeScreen();

  function setShoppingList(newList) {
    localStorage.setItem('list', JSON.stringify(newList));
    sortWithCurrentSortState()
  }
  function sortWithCurrentSortState() {
    setSortBy((curState) => {
      return { ...curState };
    });
  }


  const toggleCompleteIncompleteList =()=>{
    setAcquiredList(prevState=>{
      return !prevState
    })

  }
  const updateShopping = (itemToUpdate) => {
    const storedList = [...list]
  
    const newList = storedList.map((item)=>
      item.id === itemToUpdate.id?{...item,acquired: !item.acquired}:item
    );
    setShoppingList(newList)
  
  };


  return (
    <ListContext.Provider value={{list, updateShopping, setShoppingList}}>
    <div className="App">
      <img className="logo" src={logo} alt="eika"/>
      <h1>Shopping List</h1>
      {list.length > 0 ? <>
      <SortList setSortBy={setSortBy} sort={sortBy} />
      <ShoppingList acquired={acquiredList} sortName={sortBy}/>
      </>: welcomeText}
     { isAddFormDisplay===true? ReactDOM.createPortal(
      <ItemForm dispatch={dispatch}/>, document.getElementById('add-form-root')
     ):''}
     

      
      <button onClick={()=>dispatch({type:"show"})} className="btn">Add Item</button>

      {list.length>0?<ListToggledDisplayButton 
      acquiredStatus={acquiredList}
       onShowList={toggleCompleteIncompleteList}/>:""}
     
    </div>
    </ListContext.Provider>
  );

 
}

export default App;


