import './App.css';
import logo from './assets/images/logo.png'
import ShoppingList from './components/ShoppingList';
import ItemForm from './components/AddItem/ItemForm';
import ReactDOM from "react-dom";
import { useState, useReducer } from 'react';
import ListDisplay from './components/shoppingStatus/ListDisplay';
import useFetch from './customHooks/useFetch';
import { ListContext } from './ListContext';
import FormDisplayReducer from './FormDisplayReducer';


function App() {
  const [sortBy, setSortBy] = useState("name");
  const [isAddFormDisplay, dispatch] = useReducer(FormDisplayReducer,false);
  const [acquiredList, setAcquiredList] = useState(true);

  const list = useFetch(sortBy);
  const sortByHandler = (sortByString) => {

    setSortBy(sortByString);
  };

  const showList =()=>{
    setAcquiredList(prevState=>{
      return !prevState
    })

  }
  const updateShopping = (itemToUpdate) => {
    const storedList = [...list]
  
    const newList = storedList.map((item)=>
      item.id === itemToUpdate.id?{...item,acquired: !item.acquired}:item
    );
    localStorage.setItem('list', JSON.stringify(newList));
    setSortBy((curState)=>{
      return{...curState}
    });
  
  };
  return (
    <ListContext.Provider value={{list, updateShopping}}>
    <div className="App">
      <img className="logo" src={logo} alt="eika"/>
      <h1>Shopping List</h1>
      <ShoppingList acquired={acquiredList} onSort={sortByHandler} sortName={sortBy}/>
      
     { isAddFormDisplay===true? ReactDOM.createPortal(
      <ItemForm dispatch={dispatch}/>, document.getElementById('add-form-root')
     ):''}
      <button onClick={()=>dispatch({type:"show"})} className="btn">Add</button>

      {list.length>0?<ListDisplay acquiredStatus={acquiredList} onShowList={showList}/>:""}
    </div>
    </ListContext.Provider>
  );
}

export default App;
