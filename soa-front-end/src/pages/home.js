import React from "react";
import { Link } from 'react-router-dom';

const Home = ({serviceInfo}) => {
    return (
        <div>
            <h1>
                Home Page 
            </h1>
            <h1>List all services here</h1>
            <ul>
                {
                    Object.keys(serviceInfo).map((serviceName, index) => {
                        return <div key={index}>
                                    <li>
                                        <Link to={`/${serviceInfo[serviceName].Name}`}>{serviceInfo[serviceName].Name}</Link>
                                        <p>Name: {serviceInfo[serviceName].Name}</p>
                                        <p>Description: {serviceInfo[serviceName].Description}</p>
                                        <p>IP: {serviceInfo[serviceName].IP}</p>
                                        <p>Port: {serviceInfo[serviceName].Port}</p>
                                    </li>
                                    <br /> {/* If you need a line break between items */}
                                </div>
                    })
                }
            </ul>
        </div>
    );
};

export default Home;