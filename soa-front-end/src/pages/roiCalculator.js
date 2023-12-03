import { React, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";


function roiCalculator() {
	
	const doi = [[200, 300, 523, 123, 534, 308], [213, 25, 120, 320, 102, 503]];
	const [data, setData] = useState([0,0,0,0,0,0]);
	
	const handleStockChange = () => {
		var drop = document.getElementById("stock");
		var graph = document.getElementById("graph");
		
		setData(doi[drop.selectedIndex]);
	}
	
    return (
        <div id="body">
            <h1>
                Roi Calculator Page
            </h1>
			
			<LineChart name="graph" id="graph"
				width = {500}
				height = {300}
				series={[
					{ data: data },
				]}
				xAxis={[{ scaleType: "point", data: [1,2,3,4,5,6] }]}
			>
			</LineChart>
			
			<select name="stock" id="stock" onchange={handleStockChange}>
				<option value="DTA1">Data 1</option>
				<option value="DTA2">Data 2</option>
			</select>
        </div>
    );
};
 
export default roiCalculator;