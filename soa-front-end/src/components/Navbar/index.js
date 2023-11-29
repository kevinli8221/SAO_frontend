import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
 
//temp adding login here for testing purposes
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/search" activeStyle>
                        Search
                    </NavLink>
                    <NavLink to="/roiCalculator" activeStyle>
                        ROI Calculator
                    </NavLink>
                    <NavLink to="/stockDisplayer" activeStyle>
                        Stock Displayer
                    </NavLink>
                    <NavLink to="/stockRanker" activeStyle>
                        Stock Ranker
                    </NavLink>
					<NavLink to="/login" activeStyle>
						Login (TEMP)
					</NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;