import './ListDisplay.css';

const ListDisplay = (props)=>{
    const completed ="View completed items";
    const unComplete = "View items";
    return <>  
    <button className="view-complete" onClick={props.onShowList}>
   {props.acquiredStatus? completed : unComplete}
  </button>
  </>
}

export default ListDisplay;