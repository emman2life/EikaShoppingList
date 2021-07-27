import './SortList.css'

function SortList(props){
    const sortHandler = (event) =>{
        props.onSort(event.target.value);
    }
    return(
    <div className="sort-wrapper">
        <div className="sort-title">Sort by:</div>
        <button className="sort-button" value="name" onClick={sortHandler}>Name</button>
        <button className="sort-button" value="price" onClick={sortHandler}>Price</button>
    </div>
    )
    
    }
    export default SortList;