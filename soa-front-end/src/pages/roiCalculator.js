import { React, useState, useRef } from "react";
import { LineChart } from "@mui/x-charts/LineChart";


function useRoiCalculator() {
	
	const doi = [[
		{date: 1, value: 34},
		{date: 2, value: 340},
		{date: 3, value: 343},
		{date: 4, value: 324},
		{date: 5, value: 314},
		{date: 6, value: 354}
	],[
		{date: 1, value: 34},
		{date: 2, value: 540},
		{date: 3, value: 2},
		{date: 4, value: 31},
		{date: 5, value: 100},
		{date: 6, value: 60}
	]];
	const [data, setData] = useState(doi[0]);
	
	const handleStockChange = () => {
		setData(doi[stockRef.current.selectedIndex]);
	}
	
	const stockRef = useRef(null);
	
    return (
        <div id="body">
            <h1>
                Roi Calculator Page
            </h1>
			
			<LineChart
				width = {500}
				height = {300}
				series={[{
					dataKey: "value",
				}]}
				xAxis={[{ scaleType: "point", dataKey: "date" }]}
				
				dataset = {data}
			>
			</LineChart>
			
			<select ref={stockRef} onChange={handleStockChange}>
				<option value="DTA1">Data 1</option>
				<option value="DTA2">Data 2</option>
			</select>
			
        </div>
    );
};
 
export default useRoiCalculator;