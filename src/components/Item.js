import './Item.css';
import {Image} from 'cloudinary-react';


const Item = (props)=>{

    
return( 
<div className="item">
    <div className="item-bag">
    <div className="item-checkbox-section">
        <input className="checkbox" type="checkbox" checked={props.acquired} onChange={props.onAcquired}/>
        </div>
    <div className="item-image">
          <Image 
                      cloudName="dxaezmu9i" 
                      publicId={props.imageId===''? "shoppinglist/v7tsqpukfwhbjjoyg8im": props.imageId} 
                      width="50" 
                      crop="scale"/>
    </div>
    <p>{props.name}</p>
    <p className="item-price">{props.price}<span>:-</span></p>
    </div>
</div>)
}

export default Item;