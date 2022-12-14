import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import useFetch from "../../hooks/useFetch";
import { getCityInfoEndpoint } from '../../helpers/utils';
import { MAP_DATA } from '../../config/constants';
import  "./mapComponent.css";

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
        
    },[city,country]);

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
                color: "#2877b8",
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
                    projection: {scale: city ? 45 : 4},
                    center: centerLocation,
                    showrivers: true,
                    rivercolor: '#fff',
                    showlakes: true,
                    lakecolor: '#fff',
                    showland: true,
                    landcolor: '#EAEAAE',
                    countrycolor: '#d3d3d3',
                    subunitcolor: '#d3d3d3'
                },
                showlegend: false,
				margin: { r: 0, t: 0, b: 0, l: 0 },
				newselection: "immediate",
			}}
			onClick={(event) => { handleLocationSelection(event.points[0].text)} }
		/>
        </div>
      );
}

export default MapComponent;
