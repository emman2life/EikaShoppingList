import {useState, useEffect } from "react";
const sortByName = function (itemList) {
    itemList.sort((a, b) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
  };
  const sortedByPrice = (itemList) => {
    itemList.sort((x, y) => {
      return x.price - y.price;
    });
  };

const useFetch = (localData, sortBy)=>{
    const storedItems = localData ? JSON.parse(localData) : []
    const [itemList, setItemList] = useState(storedItems);
    const sortList = (list) => {
        sortBy === "name" ? sortByName(list) : sortedByPrice(list);
      }; 
    useEffect(() => {
        localData!==null &&
        setItemList(() => {
          const newList = JSON.parse(localData);
               sortList(newList);   
          return newList;
        });
      }, [localData,sortBy]);
      return [...itemList];
}
export default useFetch;