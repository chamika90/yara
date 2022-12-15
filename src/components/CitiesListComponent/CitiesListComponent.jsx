import React, {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import {getCitiesListEndpoint} from '../../helpers/utils';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import './citiesListComponent.scss';

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
                {isLoading && <div className="loader-container"> <LoadingSpinner /> </div>}
                {error && <ErrorComponent message={'Something went wrong. Please try again later'} />}
            </div>
}

export default CitiesListContainer;