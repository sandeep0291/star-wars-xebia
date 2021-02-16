import React, {useState} from 'react';
import { searchUser } from '../../apis/';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Login.scss';

export const Login = function({onLoginSuccess}){
    let [userName, setUserName] = useState('');
    let [userPassword, setUserPassword] = useState('');
    let [isError, setIsError] = useState(false);
    let [errorMessage, setErrorMessage] = useState('');

    const handUserNameChange = (e) => {
        setIsError(false);
        setUserName(e.target.value);
    }

    const handUserPasswordChange = (e) => {
        setIsError(false);
        setUserPassword(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // send request via api's and check if user is allowed to login
        searchUser(userName)
        .then((result)=> {
            const isUserFound = result.results.find( (u) => u.name === userName && u.birth_year === userPassword )
            if(isUserFound ===  undefined){
                setErrorMessage('username and password didn\'t match');
                setIsError(true);
            } else {
                const userDetails = {
                    name: isUserFound.name,
                    height: isUserFound.height,
                    gender: isUserFound.gender,
                    mass: isUserFound.mass
                };
                onLoginSuccess(userDetails);
            }
        })
    }

    return(
        <main className="login-main-container">
            <header>STAR-WARS</header>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter your username' value={userName} onChange={handUserNameChange} />
                <input type="password" placeholder='Enter your password' value={userPassword} onChange={handUserPasswordChange} />
                <button type="submit" disabled={!userName.length || !userPassword.length}>CLICK TO LOGIN</button>
            </form>
            { isError ? <ErrorMessage message={errorMessage}/> : null }
        </main>
    );
}

export default Login;