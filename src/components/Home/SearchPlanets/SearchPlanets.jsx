import React, {useState} from 'react';
import { searchPlanet } from '../../../apis/';
import './SearchPlanets.scss';

export const SearchPlanets = function(){
    const [planetList, setPlanetList] = useState([]);
    const [showPlanetList, setShowPlanetList] = useState(false);
    const loggedInUser = JSON.parse(localStorage.getItem('userDetails')).name;
    const [searchCount, setSearchCount] = useState(0);

    const getPlanetList = (val)=>{
        searchPlanet(val)
        .then(result => {
            setPlanetList(result.results);
        })
        .catch(error => console.log('error', error));
    }

    const startTimer = ()=>{
        setTimeout(()=>{
            setSearchCount(0);
        }, 60000);
    }

    const handleSearchChange = (e) => {
        // fetch planets details as per input
        let searchInput = e.target.value;

        if(searchInput === ''){
            setShowPlanetList(false);
            setPlanetList([]);
            return;
        }
        setShowPlanetList(true);

        if(loggedInUser !== "Luke Skywalker"){
            if(searchCount === 0) startTimer();
            console.log('search count', searchCount);
            if(searchCount < 16){
                setSearchCount(prev => prev + 1);
                getPlanetList(searchInput);
            } else if(searchCount === 16) {
                // show limit search message
                setPlanetList([]);
            }
            return;
        }

        getPlanetList(searchInput);
    }

    const getDynamicFontSize = (population)=>{
        return `${population.length * 2.5}px`;
    }

    return (
        <div className="planet-search-container" >
            <input type="text" placeholder="Search your planets" onChange={handleSearchChange} />
            { showPlanetList ? 
                <div className="planet-list">
                    <ul>
                        {planetList.map( ({name, population},i) => (
                            <li key={i}>
                                <span className="planet-details">{name}</span>
                                <span className="planet-details" style={{fontSize: getDynamicFontSize(population)}}>{population}</span>
                            </li>
                        ) )
                        }
                        {(planetList.length === 0 && searchCount < 16) ? <li className="no-records">No records found</li>: null}
                        {searchCount > 15 ? <li className="search-limit">You are allowed 15 search per minute!!</li>: null}
                    </ul>
                </div>
                : null
            }
        </div>
    )
    
}

export default SearchPlanets;