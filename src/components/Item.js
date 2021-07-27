import './Item.css'

const Item = (props)=>{

    
return( 
<div className="item">
    <div className="item-checkbox-section">
        <input type="checkbox" checked={props.acquired} onChange={props.onAcquired}/>
        </div>
    <p>{props.name}</p>
    <p className="item-price">{props.price}<span>:-</span></p>
</div>)
}

export default Item;