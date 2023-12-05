import React, { useState, useEffect } from 'react';
import SearchDropdown from '../components/searchDropdown';
import DateRangePicker from '../components/datePicker';
import LoadingText from '../components/loadingText';
import { Button } from '@mui/material';
import './stockRanker.css'
import axios from 'axios';


const StockRanker = (serviceInfo) => {
	const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
	const [stockList, setStockList] = useState(null);
	const [selectedStock, setSelectedStock] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

    const info = serviceInfo.serviceInfo.ranker
	const port = info.Port
	const name = info.Name
	const endpointSel = info.Endpoints.selection 
	const endpointSer = info.Endpoints.service

    const getSelections = () => { 
         // URL of your Node.js backend endpoint
        const backendUrl = 'http://localhost:3001/data';
        const params = {
            containerName: name,
            containerPort: port,
            endpoint: endpointSel
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

	//API request performing service with user inputs and getting the results
	const performSerivce = () => {
		setLoading(true)
		const params = {
			// your parameters here
			containerName: name,
			containerPort: port,
			endpoint: endpointSer,
			params: `stock_symbol=${selectedStock.symbol}&start_date=${startDate.$y}-${startDate.$M + 1}-${startDate.$D}&end_date=${endDate.$y}-${endDate.$M + 1}-${endDate.$D}`
		};
		axios.get('http://localhost:3001/get-service', { params })
			.then(response => {
				const result = response.data
				setLoading(false);
				setData(result);
			})
			.catch(error => {
			console.error('Error fetching data:', error);
				setError(true)
			});
	}

	const handleData = (data) => {
		console.log(data.length > 0)
		if (data.length <= 0) return null;

		const [selectedStockIndex, stocks] = data;
		const myStock = stocks[selectedStockIndex];

		const rankedStocks = stocks.map((stock, index) => {
			const rankMessage = `${stock[1][0]} is number ${index + 1}`;
			return <li key={index}>{rankMessage}</li>;
		});
		return (
			<div className='text-padding'>
				<ul>{rankedStocks}</ul>
				{myStock && <div>{`Your Selected Stock, ${myStock[1][0]} stock is number ${selectedStockIndex + 1}`}</div>}
			</div>
		);
	}

	const handleSelectedItems = (item) => {
		setSelectedStock(item);
	};

	const handleDateChange = (start, end) => {
		// Handle the date change here
		setStartDate(start)
		setEndDate(end)
	  };

	const submitForm = (event) => {
		event.preventDefault();
		if(selectedStock != null && startDate !=null && endDate != null){
			performSerivce();
		}
	}

    useEffect(() => {
        getSelections();
    },[])

    if (error) return <div>Error fetching data: {error.message}</div>;
	return (
		<div>
			<h1 className="text-padding">
				Stock Ranker Page
			</h1>
			<form onSubmit={submitForm}>
				<div className="text-padding">
					<SearchDropdown data={stockList} onItemSelected={handleSelectedItems} disabled={loading}/>
				</div>
				<div className="text-padding" >
					<DateRangePicker onDateChange={handleDateChange} disabled={loading}/>
				</div>
				<div className="text-padding">
				<Button type='submit' className='custom-button' disabled={loading}>
					Submit
				</Button>
				</div>
			</form>
			{loading ? (
				<div className="text-padding"><LoadingText/></div>
				) : data && (
					handleData(data)
				)
			}
		</div>
	);
};

export default StockRanker;
