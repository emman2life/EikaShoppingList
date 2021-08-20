import './SortList.css';
import styles from '../../style.module.css'

function SortList(props){
    const sortHandler = (event) =>{
        props.setSortBy(event.target.value)
        // props.onSort(event.target.value);
    }
    return(
    <div className="sort-wrapper">
        <div className="sort-title">Sort by:</div>
        <button className={`sort-button ${ props.sort ==='name'? styles.sortButtonActive: null}`} value="name" onClick={sortHandler}>Name</button>
        <button className={`sort-button ${ props.sort ==='price'? styles.sortButtonActive: null}`} value="price" onClick={sortHandler}>Price</button>
    </div>
    )
    
    }
    export default SortList;