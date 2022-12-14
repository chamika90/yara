import React, {useEffect, useState} from "react";
import Plot from 'react-plotly.js';

const GraphComponent = ({locationInfo}) => {
    const [parameterList, setParameterList] = useState([]);
    const [valueList, setValueList] = useState([]);
    const [unitList, setUnitList] = useState([]);
    
    useEffect(() => {
        if(locationInfo) {
            const parameters = [];
            const values = [];
            const units = [];
    
            locationInfo?.measurements.forEach((mesurement) => {
                parameters.push(mesurement.parameter);
                values.push(mesurement.value);
                units.push(mesurement.unit);
            });

            setParameterList(parameters);
            setValueList(values);
            setUnitList(units);
        }
       
    },[locationInfo])

    
    return  <div>
               {locationInfo &&  <Plot
                className="graph"
                data={[
                    {
                        x: parameterList,
                        y: valueList,
                        type: "bar",
                        text: unitList,
                    },
                ]}
                layout={{
                    title: ` ${locationInfo.city} / ${
                        locationInfo.location
                    } enviroment mesurements data`,
                }}
            />}
    </div>
}

export default GraphComponent;