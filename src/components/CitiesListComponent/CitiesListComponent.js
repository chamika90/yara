import React, {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import './citiesListComponent.css';
import {getCitiesListEndpoint} from '../../helpers/utils';

const CitiesListContainer = ({onSelectCity}) => {
    const {data, isLoading, error, fetchData} = useFetch();
    const [citiesList, setCitiesList] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    
    useEffect(() => {
        fetchData(getCitiesListEndpoint());
    },[])

    useEffect(() => {
        if(data) {
            setCitiesList(data.results);
        }
    },[data]);

    const handleCitySelect = (city) => {
        onSelectCity(city)
        setSelectedCity(city.city);
    }

    return  <div className="cities-container">
                <div className="cities" >
                    {citiesList.map((city) => <button className={`city ${city.city === selectedCity ? 'city-selected' : ''}`} 
                    key={city.city} onClick={() => {handleCitySelect(city)}}>{city.city}</button>)}
                </div>
            </div>
}

export default CitiesListContainer;