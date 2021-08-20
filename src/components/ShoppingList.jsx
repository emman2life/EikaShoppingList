import Item from "./Item";
import "./ShoppingList.css";
import { useContext } from "react";
import { ListContext } from "../ListContext";

const ShoppingList = (props) => {
  const { list, updateShopping, deleteItem } = useContext(ListContext);

  const updateList = (itemToUpdate) => {
    updateShopping(itemToUpdate);
  };

  const filteredList = props.acquired
    ? list.filter((item) => item.acquired === false)
    : list.filter((item) => item.acquired === true);


  const items = filteredList.map((item) => (
    <Item
      key={item.id}
      onDelete = {()=>deleteItem(item.id)}
      name={item.name.toUpperCase()}
      price={item.price}
      acquired={item.acquired}
      imageId={item.imgUlr}
      onAcquired={() => updateList(item)}
    />
  ));
  const emptyMessage = props.acquired ? (
    <p className="center-align-text">No new item in the list to be completed</p>
  ) : (
    <p className="center-align-text">No completed item in the list</p>
  );
  return (
    <div className="item-list">
      <>
        <h3 className="center-align-text">
          {props.acquired
            ? "Showing uncompleted list"
            : "Showing completed list"}
        </h3>
        {items.length > 0 ? items : emptyMessage}
      </>
    </div>
  );
};
export default ShoppingList;
