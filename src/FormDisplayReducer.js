export default function FormDisplayReducer(list,action){
    switch(action.type){
        case "close": 
        return false;
        case "show": 
       return true;
       case "sort":
          const {sortByString} = action;
        return sortByString;
       default:
        return new Error("Unhandled action "+action.type);
    }
}