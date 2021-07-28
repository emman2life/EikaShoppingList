import './App.css';
import logo from './assets/images/logo.png'
import ShoppingList from './components/ShoppingList';
import ItemForm from './components/AddItem/ItemForm';
import ReactDOM from "react-dom";
import { useState } from 'react';
import ListDisplay from './components/shoppingStatus/ListDisplay';
import useFetch from './useFetch';

function App() {
  const [sortBy, setSortBy] = useState("name");
  const [isAddFormDisplay, setIsAddFormDisplay] = useState(false);
  const [isAcquired, setIsAcquired] = useState(true);

  const list = useFetch(sortBy);
  const sortByHandler = (sortByString) => {

    setSortBy(sortByString);
  };

  const showForm = ()=>{
    setIsAddFormDisplay(true);
  
  }
  const closeForm = ()=>{
    setIsAddFormDisplay(false);
  }
  const showList =()=>{
    setIsAcquired(prevState=>{
      return !prevState
    })

  }

  return (
    <div className="App">
      <img className="logo" src={logo} alt="eika"/>
      <h1>Shopping List</h1>
      <ShoppingList acquired={isAcquired} onSort={sortByHandler} sortName={sortBy}/>
      
     { isAddFormDisplay===true? ReactDOM.createPortal(
      <ItemForm onCloseForm={closeForm}/>, document.getElementById('add-form-root')
     ):''}
      <button onClick={showForm} className="btn">Add</button>
      {list.length>0?<ListDisplay acquiredStatus={isAcquired} onShowList={showList}/>:""}
    </div>
  );
}

export default App;
