import logo from './logo.svg';
import './App.css';
import React from "react";
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


function App() {
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
}

export default App;
