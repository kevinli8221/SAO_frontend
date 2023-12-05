import React, { useState, useEffect } from 'react';
import SingleSearchDropdown from '../components/singleSearchDropdown';
import Textfield from "../components/textfield"
import Button from "../components/button"
import axios from 'axios';


const RoiCalculator = (serviceinfo) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState(null);
	const [stockList, setStockList] = useState(null);
	const [selectedStocks, setSelectedStocks] = useState(null);
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);

	// console.log(serviceinfo.serviceInfo.pastyields)

	const roiInfo = serviceinfo.serviceInfo.pastyields

    //API request to return selection options for inputs of a specific service
	const getSelectionOptions = () => {
		const params = {
			// your parameters here
			containerName: roiInfo.Name,
			containerPort: roiInfo.Port,
			endpoint: roiInfo.Endpoints.selection,
		};
		axios.get('http://localhost:3001/get-selection', { params })
			.then(response => {
				const result = response.data
				setStockList(result)
                setOptions(result)
				setLoading(false);
				console.log("Selection result")
				console.log(result)
			})
			.catch(error => {
			console.error('Error fetching data:', error);
			});
	}

	//API request performing service with user inputs and getting the results
	const performSerivce = () => {
		const params = {
			// your parameters here
			containerName: roiInfo.Name,
			containerPort: roiInfo.Port,
			endpoint: roiInfo.Endpoints.service,
			params: 'stock_symbol=AAPL&start_date=2015-01-01&end_date=2015-12-25'
		};
		axios.get('http://localhost:3001/get-service', { params })
			.then(response => {
				const result = response.data
				console.log(result)
			})
			.catch(error => {
			console.error('Error fetching data:', error);
			});
	}


	const test = (event) => {
		event.preventDefault();
		console.log(selectedStocks);
		console.log(selectedStartDate);
		console.log(selectedEndDate);
		console.log(event.target);
	}

	const handleSelectedItems = (items) => {
		setSelectedStocks(items);
	};

	const handleSelectedStartDate = (startDate) => {
		setSelectedStartDate(startDate);
		console.log("Handle Start Date:", startDate);
	};

	const handleSelectedEndDate = (endDate) => {
		setSelectedEndDate(endDate);
		console.log("Handle End Date:", endDate);
	};


    //useeffect for getting stuff services 
    
	useEffect(() => {
        getSelectionOptions();
        console.log(roiInfo)
		}, []);
  
     // Empty dependency array ensures this effect runs only once
  
    if (loading) return <div>Loading data...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    return (
        <div>
            <form onSubmit={test}>
				<SingleSearchDropdown data={stockList} onItemsSelected={handleSelectedItems} />
				<Textfield onItemsSelected={handleSelectedStartDate}/> 
				<Textfield onItemsSelected={handleSelectedEndDate}/>
				<button type="submit">
					submit
				</button>
			</form>

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