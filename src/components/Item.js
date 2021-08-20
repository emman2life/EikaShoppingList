import './Item.css';
import {Image} from 'cloudinary-react';
import Checkbox from "@material-ui/core/Checkbox";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const Item = (props)=>{

return( 
<div className="item">
    <div className="item-bag">
    <div className="item-checkbox-section">
        {/* <input className="checkbox" type="checkbox" checked={props.acquired} onChange={props.onAcquired}/> */}
        <Checkbox 
        checked={props.acquired}
        icon = {<CheckCircleOutlinedIcon style={{fill: "#0058AB"}}/>} 
        checkedIcon = {<CheckCircleIcon style={{fill: "#0058AB"}}/>} 
        
        onChange={props.onAcquired}
        inputProps={{'arial-label':'primary checkbox'}}/>
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
    <Checkbox 
        icon = {<DeleteForeverIcon style={{fill: "red"}}/>} 
        onChange={props.onDelete}
        />
    </div>
</div>)
}

export default Item;