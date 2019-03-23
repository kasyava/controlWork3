import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {fetchProducts} from "../../store/actions";

import "./HomePage.css"
import axios from "../../axios-config";


class HomePage extends Component{

    state = {

        category: '',
        categories: [],
        currentCategory: ''
    };


    componentDidMount() {
        this.props.fetchProducts();
        axios.get('categories').then(response=>{
            this.setState({categories: response.data})
        })
    }

    selectHandle = (e) => {
        console.log(e.target.value);
        this.setState({currentCategory: e.target.value})
    };


    render() {
        const imgUrl = 'http://localhost:8000/uploads/';
        return (
            <Fragment>
                <div>
                    <select name="category" id="category" onChange={(e)=>this.selectHandle(e)}>

                        <optgroup>
                            <option value=''>All products</option>
                            {this.state.categories.map(category=>{
                                return(
                                    <option key={category._id} value={category._id}>{category.title}</option>
                                )
                            })}
                        </optgroup>
                    </select>
                </div>
                <div className='product-wrapper' style={{padding: 10 + 'px'}}>
                    {!this.props.products ? <div>Loading</div> :
                        this.props.products.map((item, index) =>{
                            console.log(item);
                            if(this.state.currentCategory!==''){
                                if(this.state.currentCategory == item.category._id){
                                    return (

                                        <div key={index} id={item._id}  className='product'>
                                            <img src={imgUrl + item.image} alt=""/>
                                            <p>Title: {item.name}</p>
                                            <p>Price: {item.price} som</p>
                                            <p>Description: {item.description}</p>
                                        </div>

                                    );
                                }
                            }
                            else{
                                return (

                                    <div key={index} id={item._id}  className='product'>
                                        <img src={imgUrl + item.image} alt=""/>
                                        <p>Title: {item.name}</p>
                                        <p>Price: {item.price} som</p>
                                        <p>Description: {item.description}</p>
                                    </div>

                                );
                            }
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