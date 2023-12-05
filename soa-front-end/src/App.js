//dependencies
import { React, useState, useEffect } from "react";
import axios from 'axios';

//components
import './App.css';
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/home";
import Search from "./pages/search";
import RoiCalculator from "./pages/roiCalculator";
import StockDisplayer from "./pages/stockDisplayer";
import StockRanker from "./pages/stockRanker";
import Login from "./pages/login";

function App() {
	const [hasLogin, setHasLogin] = useState(false);
	const [isPremium, setIsPremium] = useState(false);
	const [activeServices, setActiveServices] = useState({});

	console.log("HERE")
	const updateLoginStatus = (loggedIn, premium) => {
		setHasLogin(loggedIn);
		setIsPremium(premium);
	}
	const getServiceList = () => {
		axios.get('http://localhost:3001/get-available-services')
			.then(response => {
				const result = response.data
				setActiveServices(result)
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	}

	//API request performing service with user inputs and getting the results
	const performSerivce = () => {
		const params = {
			// your parameters here
			containerName: 'pastyields',
			containerPort: '4000',
			endpoint: 'pastyields',
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


	useEffect(() => {
		getServiceList();
		// performSerivce();
		}, []);


	//use effect for handling login
	useEffect(() => {
		setHasLogin(localStorage.getItem("login"));
		setIsPremium(localStorage.getItem("premium"));
	}, []);
	
	if (hasLogin) {	
		return (
			<div>
				<Router>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<Home serviceInfo={activeServices}/>} />
					<Route path="/search" element={<Search />} />
					<Route path="/pastyield" element={<RoiCalculator serviceInfo={activeServices}/>}/>
					<Route path="/datadisplayer" element={<StockDisplayer serviceInfo={activeServices}/>} />
					<Route path="/ranker" element={<StockRanker />} /> 
				</Routes>
				</Router>
			<button onClick={getServiceList}>Refresh</button>
			</div>
		);
	}  else {
		return(
			<Login />
		);
	}
}

export default App;