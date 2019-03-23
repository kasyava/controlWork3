import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {fetchProducts,deleteProduct, myProductClick, myClickBack} from "../../store/actions";

import "./HomePage.css"
import axios from "../../axios-config";


class HomePage extends Component{

    state = {

        category: '',
        categories: [],
        currentCategory: '',
        currentTarget:''
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

    clickBack = (e, history) => {

        this.setState({currentTarget: ''});
        history.push('/');
    };

    productClick = (e) =>{
        console.log(e.currentTarget.id);
        this.setState({currentTarget: e.currentTarget.id});
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

                            if(this.props.currentTarget !==''){
                                if((this.props.currentTarget==item._id))

                                return(
                                    <div key={index} id={item._id} >
                                        <img src={imgUrl + item.image} alt=""/>
                                        <p>Title: {item.name}</p>
                                        <p>Category: {item.category.title}</p>
                                        <p>Price: {item.price} som</p>
                                        <p>Description: {item.description}</p>
                                        <p>User: {item.userId.displayname}</p>
                                        <p>User phone: {item.userId.phone}</p>
                                        <button onClick={(e) => this.props.myClickBack(e, this.props.history)}>Back</button>
                                        {item.userId.username===this.props.username ? <button onClick={(e) => this.props.deleteProduct(e, item._id, this.props.history, this.props.token)}>Delete</button> : null}

                                    </div>
                                )
                            }
                            else{
                            if(this.state.currentCategory!==''){
                                if(this.state.currentCategory == item.category._id){
                                    {/*<div key={index} id={item._id} onClick={(e) => this.productClick(e)} className='product'>*/}
                                    return (

                                        <div key={index} id={item._id} onClick={(e) => this.props.myProductClick(e)} className='product'>
                                            <img src={imgUrl + item.image} alt=""/>
                                            <p>Title: {item.name}</p>
                                            <p>Price: {item.price} som</p>
                                            <p>Description: {item.description}</p>

                                        </div>

                                    );
                                }
                            }
                            else{
                                {/*<div key={index} id={item._id} onClick={(e) => this.productClick(e)} className='product'>*/}
                                return (

                                    <div key={index} id={item._id} onClick={(e) => this.props.myProductClick(e)} className='product'>
                                        <img src={imgUrl + item.image} alt=""/>
                                        <p>Title: {item.name}</p>
                                        <p>Price: {item.price} som</p>
                                        <p>Description: {item.description}</p>

                                    </div>



                                );
                            }}
                        })
                    }
                </div>
            </Fragment>
        );
    }

}

const mapStateToProps = (state) =>{
    return {
        products: state.products,
        username: state.username,
        token: state.token,
        currentTarget: state.currentTarget
    }
};


const mapDispatchToProps = (dispatch) =>{

    return{

         fetchProducts: () => dispatch(fetchProducts()),
        deleteProduct: (e, itemId, history, token) => dispatch(deleteProduct(e, itemId, history, token)),
        myProductClick: (e) => dispatch(myProductClick(e)),
        myClickBack: (e, history) => dispatch(myClickBack(e, history)),


    }

};



export default connect(mapStateToProps, mapDispatchToProps)(HomePage);