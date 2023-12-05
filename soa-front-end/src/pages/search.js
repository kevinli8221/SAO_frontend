import {React, useState, useEffect} from "react";
import { Link } from 'react-router-dom';


const Search = ({serviceInfo}) => {
    const [searchText, setSearchText] = useState('');

    const filterServices = (text) => {
        return Object.keys(serviceInfo).filter(serviceName =>
            serviceName.toLowerCase().includes(text.toLowerCase())
        );
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredServices = filterServices(searchText);

    useEffect(() => {
		console.log("here")
		// performSerivce();
		}, []);

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-blue-600">
                Search page
            </h1>
            <div>
                <label>Search Services: </label>
                <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Enter service name"
                />
            </div>
            

            {searchText && filteredServices.length > 0 && (
            <div>
                <h1 >Matching Services:</h1>
                <ul>
                {filteredServices.map((serviceName) => (
                    <Link className="text-blue-600" to={`/${serviceName}`}>{serviceName}</Link>
                ))}
                </ul>
            </div>
            )}
        </div>
    );
};

export default Search;