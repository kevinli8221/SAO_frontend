import React, { useState, useEffect } from 'react';
import Dropdown from "../components/dropdown"
import Textfield from "../components/textfield"
import Button from "../components/button"
import axios from 'axios';
 
const RoiCalculator = (serviceInfo) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const roiInfo = serviceInfo.serviceInfo.pastyield
    console.log(serviceInfo)

    const getSelections = () => {
        const roiIP = roiInfo.roiIP
        const roiPort = roiInfo.Port
        const roiName = roiInfo.Name
        const roiEndpoint = roiInfo.Endpoints.selection    
         // URL of your Node.js backend endpoint
        const backendUrl = 'http://localhost:3001/data';
            const params = {
                // your parameters here
                containerName: roiName,
                containerPort: roiPort,
                endpoint: roiEndpoint
            };

        axios.get('http://localhost:3001/getselection', { params })
            .then(response => {
                const result = response.data
                console.log(result)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
        });
    }
  
     // Empty dependency array ensures this effect runs only once
  
    if (loading) return <div>Loading data...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    return (
        <div>
            <Dropdown />
            <Textfield /> 
            <Textfield />
            <Button />

            <h1>Test Data:</h1>
            <ul>
                {data.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
                ))}
            </ul>
        </div>
        
    );
};

export default RoiCalculator;