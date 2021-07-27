import {useState} from 'react';
import Item from './Item';
import './ShoppingList.css';
import useFetch from '../useFetch';
import SortList from './sort/SortList';



const welcomeText = <p className="welcome-text">Welcome to EIKA, thank for using this application. To add item to your shopping list, click the button “Add item” below.</p>
const ShoppingList = (props)=>{

const [sortBy, setSortBy] = useState("name");

const localData = localStorage.getItem("list");

// useEffect(()=>{

// },[]);
const list = useFetch(localData,sortBy);

const sortByHandler = (sortByString) => {
  setSortBy(sortByString);
};


const updateList = (itemToUpdate) => {
  const storedList = [...list]
  const newList = storedList.map((item)=>
    item.id === itemToUpdate.id?{...item,acquired: !item.acquired}:item
  );

  localStorage.setItem('list', JSON.stringify(newList));
};



const filteredList = props.acquired? list.filter((item)=>item.acquired===false):list.filter((item)=>item.acquired===true);


const items = filteredList.map((item)=>(
    <Item key={item.id} name={item.name} price={item.price} acquired={item.acquired} onAcquired={()=>updateList(item)} />
));

return <>
<SortList onSort={sortByHandler}/>
    {items.length>0? items: welcomeText}

</>


}
export default ShoppingList;