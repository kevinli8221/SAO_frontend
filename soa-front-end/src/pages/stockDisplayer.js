import React, {useState, useEffect} from "react";
import Dropdown from "../components/dropdown";
import Textfield from "../components/textfield";
import Button from "../components/button";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";

const useStockDisplayer = (serviceinfo) => {

	const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

	const [selects,setSelects] = useState([]);
	const [stock,setStock] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	//const [query, setQuery] = useState("");
	const [returned, setReturned] = useState([]);

	//console.log(serviceinfo)
    const roiInfo = serviceinfo.serviceInfo.pastyields
	console.log(serviceinfo)

	const getSelectionOptions = () => {
		const params = {
			// your parameters here
			containerName: 'datadisplayer',
			containerPort: '4001',
			endpoint: 'displaySelection'
		};
		axios.get('http://localhost:3001/get-selection', { params })
			.then(response => {
				const result = response.data
				setSelects(result)
				console.log(result)
			})
			.catch(error => {
			console.error('Error fetching data:', error);
			});
	}

	//API request performing service with user inputs and getting the results
	const performService = () => {
		const params = {
			// your parameters here
			containerName: 'datadisplayer',
			containerPort: '4001',
			endpoint: 'displayData',
			params: 'stock_symbol=AAPL&start_date=2015-01-01&end_date=2015-12-25'
		};
		axios.get('http://localhost:3001/get-service', { params })
			.then(response => {
				const result = response.data
				setReturned(result)
				console.log(result)
			})
			.catch(error => {
			console.error('Error fetching data:', error);
			});
	}

    //useeffect for getting stuff services 
    
	useEffect(() => {
		//getSelectionOptions();
		performService();
	}, []);
  
     // Empty dependency array ensures this effect runs only once
  
    //if (loading) return <div>Loading data...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    return (
        <div>
            <Dropdown />
            <Textfield /> 
            <Textfield />
            <Button onSubmit={performService}>Submit</Button>

            <h1>Test Data:</h1>
            <ul>
                {data.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
                ))}
            </ul>

			{selects ? 
				<div>
					<LineChart 
						width = {500}
						height = {300}
						series={[{ dataKey: "Closing Price", }]}
						xAxis={[{ scaleType: "point", dataKey: "Trade Date" }]}
						dataset = {returned}>

					</LineChart>
				</div> :
				<div>
					Error loading data.
				</div>
			}
        </div>
    );
};

export default useStockDisplayer;
