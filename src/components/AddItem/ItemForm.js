import { useEffect, useState } from 'react';
import './ItemForm.css'

const ItemForm = (props)=>{
    const [inputName, setInputName] = useState('');
    const [inputPrice, setInputPrice] = useState('');
    const [validInput, setValidInput] = useState(false);
    const [storedList, setStoredList] = useState(()=>{
    try{
    return JSON.parse(localStorage.getItem("list")) ?? []
    }
    catch{
        console.log("Stored list could not parse into JSON");
        return [];
    }
});
    
    
    const nameChangeHandler = (event)=>{
     
            setInputName(event.target.value);
        }
    
    const priceChangeHandler = (event) =>{
        setInputPrice(event.target.value);
    }
    // useEffect(()=>{
    //     localStorage.setItem('list', JSON.stringify(storedList))
    // },[storedList]);


    useEffect(()=>{
        if(inputName.trim()>0 || inputPrice.trim()>0){
            setValidInput(true);
        }else{
            setValidInput(false);
        }
    
        if(+inputPrice<0)return;
    },[inputPrice, inputName])

  

    const submitHandler = event =>{
        event.preventDefault();
        const itemEntered = {
            name: inputName,
            price: inputPrice,
            id: Math.random().toString(),
            imgUlr:'',
            acquired:false
        }
       
      
        // const localList = storedList!==null ? JSON.parse(storedList) : [];
        setStoredList((prevState)=>{
            const newList = [...prevState, itemEntered];
            localStorage.setItem('list', JSON.stringify(newList));
            return  newList;
        })
      
        
        props.onCloseForm();
        setValidInput(false);
        setInputName('');
        setInputPrice('');
    
    }


        return <div className="form-container">
      <button className="closeAdd" onClick={props.onCloseForm}>X</button>
      <form onSubmit={submitHandler}>
            <div className="new-item-wrapper">
              
            <div className="new-item-container">
                <div className="new-item-content">
                    <label htmlFor="name">Name</label>
                    <input type="text" 
                    id="name" 
                    value={inputName}
                    onChange={nameChangeHandler}/>
                </div>
                <div className="new-item-content">
                    <label htmlFor="price">Price</label>
                    <input
                    id="price" 
                    type="number" 
                    min="0.01" step="0.01"
                    value={inputPrice} 
                    onChange={priceChangeHandler}/>
                </div>
              
                <div className="add-item-button-container">
                    <button disabled={!validInput} type="submit" className="add-item btn">Add</button>
                 </div>
                 </div>
           
            </div>
        </form>
        </div>
    };
    export default ItemForm;