import './App.scss';
import { useState } from 'react';
import CitiesListContainer from './components/CitiesListComponent/CitiesListComponent';
import MapComponent from './components/MapComponent/MapComponent';
import GraphComponent from './components/GraphComponent/GraphComponent';

function App() {

  const [selectedCity, setSelectedCity] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
 
  const handleCitySelection = (city) => {
    setSelectedCity(city);
  }

  const handleLocationSelection = (location) => {
    setSelectedLocation(location);
  }

  return (
    <div className="app">
      <CitiesListContainer onSelectCity={(city) => handleCitySelection(city)}/>
       <MapComponent city={selectedCity} country={'DE'} onLocationSelect={(location) => handleLocationSelection(location)}/> 
      {selectedLocation && <GraphComponent locationInfo={selectedLocation}/>}
    </div>
  );
}

export default App;
