import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

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
                    <NavLink to="/datadisplayer" activeStyle>
                        Stock Displayer
                    </NavLink>
                    <NavLink to="/stockRanker" activeStyle>
                        Stock Ranker
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;