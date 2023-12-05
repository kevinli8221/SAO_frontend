import React, { useState, useEffect } from 'react';
import SearchDropdown from '../components/searchDropdown';
import DateRangePicker from '../components/datePicker';
import axios from 'axios';


const StockRanker = (serviceInfo) => {
	const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
	const [stockList, setStockList] = useState(null);
	const [selectedStocks, setSelectedStocks] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

    const info = serviceInfo.serviceInfo.ranker
	const port = info.Port
	const name = info.Name
	const endpoint = info.Endpoints.selection   

    const getSelections = () => { 
         // URL of your Node.js backend endpoint
        const backendUrl = 'http://localhost:3001/data';
        const params = {
            containerName: name,
            containerPort: port,
            endpoint: endpoint
        };

        axios.get('http://localhost:3001/get-selection', { params })
        .then(response => {
            const result = response.data
			setStockList(result);
			setLoading(false);

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

	const test = (event) => {
		event.preventDefault();
		console.log(selectedStocks);
		console.log(event.target)
	}

	//API request performing service with user inputs and getting the results
	const performSerivce = () => {
		const params = {
			// your parameters here
			containerName: name,
			containerPort: port,
			endpoint: endpoint,
			params: 'stock_symbol=AAPL&start_date=2015-01-01&end_date=2015-12-25'
		};
		axios.get('http://localhost:3001/get-service', { params })
			.then(response => {
				const result = response.data
				setLoading(false);
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
		console.log('Start Date:', start, 'End Date:', end);
		// You can set these dates to state or pass them to other functions as needed
	  };
    useEffect(() => {
        getSelections();
    },[])

	if (loading) return <div>Loading data...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;
	return (
		<div>
			<h1 style={{padding: '20px'}}>
				Stock Ranker Page
			</h1>
			<form onSubmit={test}>
				<SearchDropdown data={stockList} onItemsSelected={handleSelectedItems} />
				<DateRangePicker onDateChange={handleDateChange} />
				<button type="submit">
					submit
				</button>
			</form>
		</div>
	);
};

export default StockRanker;
