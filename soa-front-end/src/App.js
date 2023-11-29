import logo from './logo.svg';
import './App.css';
import { React, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import Search from "./pages/search";
import RoiCalculator from "./pages/roiCalculator";
import StockDisplayer from "./pages/stockDisplayer";
import StockRanker from "./pages/stockRanker";
import Login from "./pages/login";

function App() {
	const [hasLogin, setHasLogin] = useState(false);
	const [isPremium, setIsPremium] = useState(false);
	
	const updateLoginStatus = (loggedIn, premium) => {
		setHasLogin(loggedIn);
		setIsPremium(premium);
	}
	
	useEffect(() => {
		setHasLogin(localStorage.getItem("login"));
		setIsPremium(localStorage.getItem("premium"));
	}, []);
	
	if (hasLogin) {	
		return (
			<Router>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/search" element={<Search />} />
					<Route path="/roiCalculator" element={<RoiCalculator />} />
					<Route path="/stockDisplayer" element={<StockDisplayer />} />
					<Route path="/stockRanker" element={<StockRanker />} />
				</Routes>
			</Router>
		);
	}  else {
		return(
			<Login />
		);
	}
}

export default App;