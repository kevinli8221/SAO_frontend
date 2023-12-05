import React, {useState, useEffect} from "react";
import SearchDropdown from "../components/searchDropdown";
import DateRangePicker from '../components/datePicker';
import Textfield from "../components/textfield";
import Button from "../components/button";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";

const useStockDisplayer = (serviceInfo) => {

    const [loadingData, setLoadingData] = useState(false);
    const [loadingResult, setLoadingResult] = useState(false);
    const [error, setError] = useState(false);

	const [selects,setSelects] = useState([]);
	const [stock,setStock] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [returned, setReturned] = useState([]);

	//console.log(serviceinfo)
    const displayerInfo = serviceInfo.serviceInfo.datadisplayer
	//console.log(serviceInfo)

	const getSelectionOptions = () => {
		setLoadingData(true)
		setError(false)
		const params = {
			// your parameters here
			containerName: displayerInfo.Name,
			containerPort: displayerInfo.Port,
			endpoint: displayerInfo.Endpoints.selection
		};
		axios.get('http://localhost:3001/get-selection', { params })
			.then(response => {
				const result = response.data
				setSelects(result)
				setLoadingData(false)
			})
			.catch(error => {
				console.error('Error fetching data:', error);
				setLoadingData(false)
				setError(true)
			});
	}

	//API request performing service with user inputs and getting the results
	const performService = () => {
		setLoadingResult(true)
		setError(false)
		const params = {
			// your parameters here
			containerName: displayerInfo.Name,
			containerPort: displayerInfo.Port,
			endpoint: displayerInfo.Endpoints.service,			
			params: `stock_symbol=${stock.symbol}&start_date=${startDate.$y}-${startDate.$M + 1}-${startDate.$D}&end_date=${endDate.$y}-${endDate.$M + 1}-${endDate.$D}`
		};
		axios.get('http://localhost:3001/get-service', { params })
			.then(response => {
				const result = response.data
				setReturned(result)
				setLoadingResult(false)
			})
			.catch(error => {
				console.error('Error fetching data:', error);
				setLoadingResult(false)
				setError(true)
			});
	}

    //useeffect for getting stuff services 
    
	const handleSelectedItems = (items) => {
		setStock(items.symbol);
	};

	const handleDateChange = (start, end) => {
		// Handle the date change here
		// console.log('Start Date:', start, 'End Date:', end);
		// You can set these dates to state or pass them to other functions as needed
		setStartDate(start);
		setEndDate(end);
	  };

	useEffect(() => {
		console.log(displayerInfo)
		getSelectionOptions();
		//performService();
	}, []);
  
	const sendService = (event) => {
		event.preventDefault()
		
		if (stock && startDate && endDate) {
			performService();
		}
	}

     // Empty dependency array ensures this effect runs only once
  
    // if (loadingData) return <div>Loading data...</div>;
    // if (error) return <div>Error fetching data</div>;

    return (
        <div>
			<h1 style={{padding: '20px'}}>
				Stock Ranker Page
			</h1>
			{error && <div>An error has occurred.</div>}
			{loadingData && <div>Loading data...</div>}
			{selects &&
				<form onSubmit={sendService}>
					<SearchDropdown data={selects} onItemsSelected={handleSelectedItems}/>
					<DateRangePicker onDateChange={handleDateChange} />
					<button type="submit">
						submit
					</button>
				</form>				
			}
			{loadingResult && <div>Awaiting result...</div>}
			{returned && 
				<LineChart 
					width = {500}
					height = {300}
					series={[{ dataKey: "Closing Price", }]}
					xAxis={[{ scaleType: "point", dataKey: "Trade Date" }]}
					dataset = {returned}>

				</LineChart>}
        </div>
    );
};

export default useStockDisplayer;
