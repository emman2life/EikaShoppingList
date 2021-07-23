import './App.css';
import logo from './assets/images/logo.png'
import ShoppingList from './components/ShoppingList';

function App() {
  return (
    <div className="App">
      <img className="logo" src={logo} alt="eika"/>
      <h1>Shopping List</h1>
      <ShoppingList/>

      <button className="btn">Add</button>
    </div>
  );
}

export default App;
