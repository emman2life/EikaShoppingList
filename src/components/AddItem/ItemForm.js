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
const validationMsg = {
    name: 'Invalid name',
    price: 'Only numbers are allowed'
}
const ItemForm = (props)=>{

    const [imageId, setImageId]= useState(item.imgUlr);
    const [errorMsg, setErrorMsg] = useState('');
    const [itemInput, setItemInput] = useState(item);
    const [validInput, setValidInput] = useState(false);
    const [errors, setErrors] = useState({});
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
        if(event.target.id==='price'){
           
            validtion(new RegExp(/^\d+(,\d{3})*(\.\d{1,2})?$/).test(event.target.value),  {[event.target.id]:validationMsg.price}, event.target.id)
        }
        else if(event.target.id==='name'){
            validtion(new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).test(event.target.value), {[event.target.id]:validationMsg.name}, event.target.id)
        }
        setItemInput((prevItem)=>{
           return {...prevItem,
            [event.target.id]: event.target.value}
        })

    }
    const validtion = (reg, msg, inputName)=>{
        if(!reg){
          setErrors({[inputName]:true});

            setErrorMsg(msg)
        }
        else{
            setErrors({[inputName]:false});
            setErrorMsg('')
        }
      };
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
                    
                    <TextField 
                        error={errors?.name}
                        helperText={errorMsg?.name}
                    required
                    variant="filled"
                    color = "primary"
                    type = "text"
                     id="name"
                     label="Name"
                    value={itemInput.name}
                    onChange={changeHandler}
                     />

                </div>
                <div className="new-item-content">
                    <TextField
                    error={errors?.price}
                    helperText={errorMsg?.price}
                    required
                    variant="filled"
                    color = "primary"
                    id="price" 
                    label="price"
                    min="0.01" 
                    step="0.01"
                    value={itemInput.price} 
                    onChange={changeHandler}
                    />
            
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