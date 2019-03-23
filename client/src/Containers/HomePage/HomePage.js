import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {fetchProducts} from "../../store/actions";


class HomePage extends Component{


    componentDidMount() {
        this.props.fetchProducts();
    }


    render() {
        const imgUrl = 'http://localhost:8000/uploads/';
        return (
            <Fragment>

                <div style={{padding: 10 + 'px'}}>
                    {!this.props.products ? <div>Loading</div> :
                        this.props.products.map((item, index) =>{
                            return (
                                <div key={index}>
                                    <img height='200px' src={imgUrl + item.image} alt=""/>
                                    <p>Title: {item.name}</p>
                                    <p>Price: {item.price} som</p>
                                </div>
                            )
                        })
                    }
                </div>
            </Fragment>
        );
    }




}

const mapStateToProps = (state) =>{
    return {
        products: state.products
    }
};


const mapDispatchToProps = (dispatch) =>{

    return{

         fetchProducts: () => dispatch(fetchProducts())
    }

};



export default connect(mapStateToProps, mapDispatchToProps)(HomePage);