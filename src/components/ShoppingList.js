import { useState } from 'react';
import Item from './Item';
import './ShoppingList.css'


const welcomeText = <p className="welcome-text">Welcome to EIKA, thank for using this application. To add item to your shopping list, click the button “Add item” below.</p>
const ShoppingList = ()=>{
    const [itemList, setItemList] = useState([]);

const items = itemList.map(()=>{
    <Item  />
});
return <>
    {itemList.length>0? items: welcomeText}
</>


}
export default ShoppingList;