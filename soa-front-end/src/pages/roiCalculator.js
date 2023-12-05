import React, { useState, useEffect } from 'react';
import SingleSearchDropdown from '../components/singleSearchDropdown';
import DateRangePicker from '../components/datePicker';
import Button from "../components/button"
import axios from 'axios';


const RoiCalculator = (serviceinfo) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState(null);
	const [stockList, setStockList] = useState(null);
	const [selectedStocks, setSelectedStocks] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	// console.log(serviceinfo.serviceInfo.pastyields)

	const roiInfo = serviceinfo.serviceInfo.pastyields
	const port = roiInfo.Port
	const name = roiInfo.Name
	const endpoint = roiInfo.Endpoints.selection   
	const service = roiInfo.Endpoints.service

    //API request to return selection options for inputs of a specific service
	const getSelectionOptions = () => {
		const params = {
			// your parameters here
			containerName: name,
			containerPort: port,
			endpoint: endpoint,
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
			containerName: name,
			containerPort: port,
			endpoint: service,
			params: `stock_symbol={AAPL}&start_date=2015-01-01&end_date=2015-12-25`
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


	const handleSelectedItems = (items) => {
		setSelectedStocks(items);
	};

	const handleDateChange = (start, end) => {
		// Handle the date change here
		setStartDate(start);
		setEndDate(end);
		console.log('Start Date:', start, 'End Date:', end);
		// You can set these dates to state or pass them to other functions as needed
	  };

	const test = (event) => {
		event.preventDefault();
		console.log(selectedStocks);
		console.log(startDate);
		console.log(endDate);
		performSerivce()
		console.log(event.target);
	}


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
				<DateRangePicker onDateChange={handleDateChange} />
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