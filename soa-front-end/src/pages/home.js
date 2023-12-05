import React from "react";
import { Link } from 'react-router-dom';
import './stockRanker.css'

const Home = ({serviceInfo}) => {
    return (
        <div>
            <h1 className="title-text">
                Home Page 
            </h1>
            <h1 className="title-subtext">List all services here</h1>
            <ul>
                {
                    Object.keys(serviceInfo).map((serviceName, index) => {
                        return <div key={index}>
                                    <li>
                                        <Link className="colour-link" to={`/${serviceInfo[serviceName].Name}`}>{serviceInfo[serviceName].Name}</Link>
                                        <p className="text-padding">Description: {serviceInfo[serviceName].Description}</p>
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