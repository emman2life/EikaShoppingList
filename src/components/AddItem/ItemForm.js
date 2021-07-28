import { useEffect, useState } from 'react';
import './ItemForm.css'


const item = {
    name: '',
    price: '',
    id: 0,
    imgUlr:'',
    acquired:false
}
const ItemForm = (props)=>{
    const [itemInput, setItemInput] = useState(item);
    const [validInput, setValidInput] = useState(false);
    const [, setStoredList] = useState(()=>{
    try{
    return JSON.parse(localStorage.getItem("list")) ?? []
    }
    catch{
        console.log("Stored list could not parse into JSON");
        return [];
    }
});
    const changeHandler = (event)=>{
        setItemInput((prevItem)=>{
           return {...prevItem,
            [event.target.id]: event.target.value}
        })
    }

    useEffect(()=>{
        if(itemInput.name.trim()>0 || itemInput.price.trim()>0){
            setValidInput(true);
        }else{
            setValidInput(false);
        }
    
        if(+itemInput.price<0)return;
    },[itemInput])

  

    const submitHandler = event =>{
        event.preventDefault();
   
       const itemEntered = {...itemInput,id:Math.random().toString()}
        setStoredList((prevState)=>{
            const newList = [...prevState, itemEntered];
            localStorage.setItem('list', JSON.stringify(newList));
            return  newList;
        })
      
        
        props.onCloseForm();
        setValidInput(false);
        setItemInput('');
       
    
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
                    value={itemInput.name}
                    onChange={changeHandler}/>
                </div>
                <div className="new-item-content">
                    <label htmlFor="price">Price</label>
                    <input
                    id="price" 
                    type="number" 
                    min="0.01" step="0.01"
                    value={itemInput.price} 
                    onChange={changeHandler}/>
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