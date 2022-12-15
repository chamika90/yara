import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import useFetch from "../../hooks/useFetch";
import { getCityInfoEndpoint } from '../../helpers/utils';
import { MAP_DATA } from '../../config/constants';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import  "./mapComponent.scss";

const MapComponent = ({city, country, onLocationSelect}) => {
    const {data, isLoading, error, fetchData} = useFetch();
    const [mapInfo, setMapInfo] = useState(MAP_DATA);
    const [cityInfo, setCityInfo] = useState([]);
    const [centerLocation, setCenterLocation] = useState({
        lat: 52.5200 ,
        lon:  13.4050,
    });

    useEffect(() => {
        if(city) {
            setCityInfo([]);
            fetchData(getCityInfoEndpoint(country, city.city));
        }
        
    },[city, country]);

    useEffect(() => {
        if(data) {
            constructMapData(data.results);
            setCityInfo(data.results);
            if(data.results.length > 0) {
                const center = {
                    lat: data.results[0].coordinates.latitude,
                    lon: data.results[0].coordinates.longitude
                }
                setCenterLocation(center);
            }
        }
    },[data]);

    const constructMapData = (cityInfo) => {

        let mapData = [{
            type: 'scattergeo',
            text: [],
            lon: [],
            lat: [],
            marker: {
                size: 10,
                color: '#2591EB',
            },
            name: city.city,
        }]
        let locationArray = [];
        let latitudeArray = [];
        let longitudeArray = [];
        cityInfo.forEach(element => {
            locationArray.push(element.location);
            latitudeArray.push(element.coordinates.latitude);
            longitudeArray.push(element.coordinates.longitude);
        });
        mapData[0].text = locationArray;
        mapData[0].lon = longitudeArray;
        mapData[0].lat = latitudeArray;

        setMapInfo(mapData);
    }

    const handleLocationSelection = (locationInfo) => {
        cityInfo.every((cityLocation ) => {
            if(locationInfo === cityLocation.location) {
                onLocationSelect(cityLocation);
                return false;
            }
            return true;
        })
    }
    
    return (
        <div className='map'>
         <Plot
			data={mapInfo}
			layout={{
				clickmode: "event+select",
				dragmode: "zoom",
                geo: {
                    scope: 'europe',
                    projection: {scale: city ? 20 : 4},
                    center: centerLocation,
                    showland: true,
                    landcolor: '#7B2EEC5',
                    countrycolor: '#dB2EEC5',
                    bgcolor: '#B2D3EE',
                },
                showlegend: false,
				margin: { r: 0, t: 0, b: 0, l: 0 },
				newselection: "immediate",
			}}
			onClick={(event) => { handleLocationSelection(event.points[0].text)}}
		/>
        {isLoading && <div className='loader-container'><LoadingSpinner /></div>}
        {error && <ErrorComponent message={'Something went wrong. Please try again later'} />}
        </div>
      );
}

export default MapComponent;
