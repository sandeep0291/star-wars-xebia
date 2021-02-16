import './App.scss';
import React, {useState} from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const isLoggedInStorage = localStorage.getItem('isLogged') === 'true' ? true : false;
  
  const handleOnLoginSuccess = (user)=>{
    localStorage.setItem('isLogged', true);
    localStorage.setItem('userDetails', JSON.stringify(user));
    setIsLogged(true);
  };

  return (
    <div className="App">
      {(isLogged || isLoggedInStorage) ? <Home/> : <Login onLoginSuccess={handleOnLoginSuccess} />}      
    </div>
  );
}

export default App;
