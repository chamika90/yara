import React, {useEffect, useState} from "react";
import Plot from 'react-plotly.js';
import { formatDate } from "../../helpers/utils";
import "./graphComponent.scss";

const GraphComponent = ({locationInfo}) => {
    const [parameterList, setParameterList] = useState([]);
    const [valueList, setValueList] = useState([]);
    const [unitList, setUnitList] = useState([]);
    const [lastUpdatedDate, setLastUpdatedDate] = useState();
    
    useEffect(() => {
        if(locationInfo) {
            const parameters = [];
            const values = [];
            const units = [];
            const lastUpdatedDate = locationInfo.measurements.length > 0 ? locationInfo.measurements[0].lastUpdated: '';
            const formatedDate = formatDate(lastUpdatedDate);
            setLastUpdatedDate(formatedDate);
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

    
    return  <div className="container">
                <div>
                    {` ${locationInfo.city} / ${
                                locationInfo.location
                            } enviroment mesurements data collected on ${lastUpdatedDate}`}
                </div>
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
                />}
            </div>
}

export default GraphComponent;