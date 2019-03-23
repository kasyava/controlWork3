import React from 'react';
import {Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";

import {connect} from "react-redux";

import {fetchLogout} from "../../../store/actions";

const Toolbar = (props) =>{
    return(

        props.isLoggedIn ?
            <div>
                <span>Hello, {props.displayname}!</span>
                <NavLink className="buttonNav" activeClassName='buttonNavActiv' to='/addProduct'>Add Product</NavLink>
                <NavLink className="buttonNav"  to="/" onClick={(e) => props.fetchLogout(e, props.token)}>Logout</NavLink>
            </div>
            :
        <Nav className='justify-content-end'>
            <NavLink exact className="buttonNav" activeClassName='buttonNavActiv' to="/register">Register</NavLink>
            <NavLink exact className="buttonNav" activeClassName='buttonNavActiv' to="/login">Login</NavLink>
        </Nav>


    )
};

const mapStateToProps = (state) =>{
    return {
        isLoggedIn: state.isLoggedIn,
        displayname: state.displayname
    }
};


const mapDispatchToProps = (dispatch) =>{

    return{

       fetchLogout: (e, token) => dispatch(fetchLogout(e, token))
    }

};



export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);