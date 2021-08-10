import { useEffect, useState } from 'react';
import './ItemForm.css'
import ImageDropZone from '../dragdrop/ImageDropZone';
import TextField from '@material-ui/core/TextField';



const item = {
    name: '',
    price: '',
    id: 0,
    imgUlr:'',
    acquired:false
}
const ItemForm = (props)=>{

    const [imageId, setImageId]= useState(item.imgUlr);
    const [itemInput, setItemInput] = useState(item);
    const [validInput, setValidInput] = useState(false);
    const [errors, setErrors] = useState(false);
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
   
       const itemEntered = {...itemInput,id:Math.random().toString(), imgUlr:imageId}
        setStoredList((prevState)=>{
            const newList = [...prevState, itemEntered];
            localStorage.setItem('list', JSON.stringify(newList));
            return  newList;
        })
      
        
        props.dispatch({type: "close"});
        setValidInput(false);
        setItemInput('');
       
    
    }
    async function uploadToCloud(url, formData) {
        const response = await fetch(url, {
            method: "post",
            body: formData
        });
        const data = await response.json();
        setImageId(data.public_id);
        return data;
    }


        return <div className="form-container">
      <button className="closeAdd" onClick={()=>props.dispatch({type: "close"})}>X</button>
      <form onSubmit={submitHandler}>
            <div className="new-item-wrapper">
              
            <div className="new-item-container">
                <div className="new-item-content">
                   
                    {/* <input 
                    className="form-input"
                    type="text" 
                    placeholder="name"
                    id="name" 
                    value={itemInput.name}
                    onChange={changeHandler}/> */}
                    
                    <TextField 
                    required
                    variant="filled"
                    color = "primary"
                    type = "text"
                     id="name"
                     label="Name"
                    value={itemInput.name}
                    onChange={changeHandler} />

                </div>
                <div className="new-item-content">
                    <TextField
                    required
                    variant="filled"
                    color = "primary"
                    id="price" 
                    type="number"
                    label="price"
                    min="0.01" 
                    step="0.01"
                    value={itemInput.price} 
                    onChange={changeHandler}
                    />
                    {/* <input
                    className="form-input"
                    id="price" 
                    type="number" 
                    min="0.01" step="0.01"
                    placeholder="price"
                    value={itemInput.price} 
                    onChange={changeHandler}/> */}
                </div>
              <ImageDropZone onImageDrop={uploadToCloud}/>
                <div className="add-item-button-container">
                    <button disabled={!validInput} type="submit" className="add-item btn">Add</button>
                 </div>
                 </div>
           
            </div>
        </form>
        </div>
    };
    export default ItemForm;