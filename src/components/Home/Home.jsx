import React from 'react';
import SearchPlanets from './SearchPlanets/SearchPlanets';
import './Home.scss'

export const Home = function(){
    const logout = ()=>{
        localStorage.setItem('isLogged', false);
        localStorage.setItem('userDetails', null);
        window.location.reload();
    }

    const {name, gender, height, mass} = JSON.parse(localStorage.getItem('userDetails'));

    return(
        <div className="home-container">
            <SearchPlanets/>
            <div className="user-details">
                <span className="logout" onClick={logout}>Logout</span>
                <span>Welcome, <b>{name}</b></span>
                <span>Gender: {gender}</span>
                <span>Height: {height}</span>
                <span>Mass: {mass}</span>
            </div>
        </div>
    );
};

export default Home;