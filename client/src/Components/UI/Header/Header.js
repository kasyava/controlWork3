import React from 'react';
import {NavLink} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";

import './Header.css';
import logo from '../../../accets/logo.png'

import {connect} from "react-redux";




const Header = (props) =>{

    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <NavLink  exact to='/'><img className='logo' src={logo} alt=""/></NavLink>

                <Nav className="mr-auto">
                    <NavLink exact className="buttonNav" activeClassName='buttonNavActiv' to="/">Home</NavLink>

                </Nav>
                {props.children}
            </Navbar>

        </div>
    )
};


//
// const mapStateToProps = (state) =>{
//     return {
//         isLoggedIn: state.isLoggedIn,
//     }
// };
// export default connect(mapStateToProps, null)(Header);
export default Header;