import React, { useState, useEffect } from 'react';
import Dropdown from "../components/dropdown"
import Textfield from "../components/textfield"
import Button from "../components/button"
 
const RoiCalculator = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // URL of your Node.js backend endpoint
      const backendUrl = 'http://localhost:3001/data';
  
      fetch(backendUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
  
    }, []); // Empty dependency array ensures this effect runs only once
  
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