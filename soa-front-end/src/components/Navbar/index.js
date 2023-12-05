import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
 
//temp adding login here for testing purposes
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/search">
                        Search
                    </NavLink>
                    <NavLink to="/pastyield">
                        ROI Calculator
                    </NavLink>
                    <NavLink to="/dataDisplayer">
                        Stock Displayer
                    </NavLink>
                    <NavLink to="/ranker">
                        Stock Ranker
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;