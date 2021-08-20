// Fetch is the name of the JavaScript method for calling data from a server.
// useINSER_NAME_HERE is the convention of React for custom hooks.
// useFetch means a custom hook for fetching data from the server
// This file is just using data to sort items by name, price, etc. -1

import { useState, useEffect } from "react";
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

const useFetch = (sortBy) => {
  const localData = localStorage.getItem("list");
  const storedItems = localData ? JSON.parse(localData) : [];
  const [itemList, setItemList] = useState(storedItems);
  const sortList = (list) => {
    sortBy === "name" ? sortByName(list) : sortedByPrice(list);
  };
  useEffect(() => {
    localData !== null &&
      setItemList(() => {
        const newList = JSON.parse(localData);
        sortList(newList);
        return newList;
      });
  }, [localData, sortBy]);
  return [...itemList];
};
export default useFetch;
