import React, { useState, useEffect } from 'react';
import SingleSearchDropdown from '../components/singleSearchDropdown';
import DateRangePicker from '../components/datePicker';
import axios from 'axios';


const RoiCalculator = (serviceinfo) => {

    const [roi, setRoi] = useState([]);
    const [loading, setLoading] = useState(true);
	const [loadingRoi, setLoadingRoi] = useState(true);
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
		setLoading(true);
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
			})
			.catch(error => {
				setLoading(false)
				console.error('Error fetching data:', error);
			});
	}

	//API request performing service with user inputs and getting the results
	const performService = () => {
		setLoadingRoi(true)
		const params = {
			// your parameters here
			containerName: name,
			containerPort: port,
			endpoint: service,
			params: `stock_symbol=${selectedStocks.symbol}&start_date=${startDate.$y}-${startDate.$M+1}-${startDate.$D}&end_date=${endDate.$y}-${endDate.$M+1}-${endDate.$D}`
		};
		axios.get('http://localhost:3001/get-service', { params })
			.then(response => {
				const result = response.data
				setRoi(result.yield_percent);
				setLoadingRoi(false)
			})
			.catch(error => {
				setLoadingRoi(false)
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
		// You can set these dates to state or pass them to other functions as needed
	  };

	const submitService = (event) => {
		event.preventDefault();
		if(endDate && startDate && selectedStocks){
			performService()
		}
		// console.log(event.target);
	}


    //useeffect for getting stuff services 
    
	useEffect(() => {
        getSelectionOptions();
		}, []);
  
     // Empty dependency array ensures this effect runs only once
  
    if (loading) return <div>Loading data...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    return (
        <div>
            <form onSubmit={submitService}>
				<SingleSearchDropdown data={stockList} onItemsSelected={handleSelectedItems} />
				<DateRangePicker onDateChange={handleDateChange} />
				<button type="submit">
					submit
				</button>
			</form>

            <h1>ROI Result: {loadingRoi && <div>Awaiting result...</div>} {roi && 
			<div>

				{roi}
			</div>}</h1>
	

        </div>
        
    );
};

export default RoiCalculator;