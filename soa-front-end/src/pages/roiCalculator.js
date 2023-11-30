import React from "react";
import Dropdown from "../components/dropdown"
import Textfield from "../components/textfield"
import Button from "../components/button"
 
const roiCalculator = () => {
    return (
        <div>
            <Dropdown />
            <Textfield /> 
            <Textfield />
            <Button />
        </div>
    );
};
 
export default roiCalculator;