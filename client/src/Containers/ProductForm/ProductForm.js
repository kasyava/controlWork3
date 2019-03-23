import React, {Component, Fragment} from 'react';
import axios from '../../axios-config';

import {Col, Form, Button} from "react-bootstrap";
import {fetchLogout, sendProductForm} from "../../store/actions";
import {connect} from "react-redux";


class ProductForm extends Component {

    state = {
        name: '',
        description: '',
        category: '',
        price: 0,
        image: '',
        categories: [],
        token: '',
        isLoggedIn: false


    };

    componentDidMount() {
        axios.get('categories').then(response=>{
            this.setState({categories: response.data, token: this.props.token, isLoggedIn: this.props.isLoggedIn})
        })
    }

    user = this.props.isLoggedIn;

    textHandler = event =>{
        this.setState({[event.target.name]: event.target.value});
    };

    fileHandler = event =>{
        console.log(event.target.files);
        this.setState({[event.target.name]: event.target.files[0]})
    };

    // submitForm = (e) =>{
    //     e.preventDefault();
    //     const formData = new FormData();
    //     Object.keys(this.state).forEach(item =>{
    //         formData.append(item, this.state[item]);
    //     });
    //
    //     if(this.user !== null) {
    //         const headers = {"Token": this.props.token};
    //         axios.post('products',formData,{headers})
    //             .then(()=>{
    //                 window.location = '/';
    //             })
    //             .catch((responce) => alert('Error: ' + responce));
    //     }
    //
    // };


    render() {

        return (
            <Fragment>

                {this.user === null ? null :
                    <div className='justify-content-center'>
                        <Form as={Col}>
                            <Form.Group controlId="productName">
                                <Form.Label>Product name</Form.Label>
                                <Form.Control name='name' onChange={(e) => this.textHandler(e)} value={this.state.name} type="text" placeholder="Enter product name"/>
                            </Form.Group>

                            <Form.Group controlId="productDescription">
                                <Form.Label>Product description</Form.Label>
                                <Form.Control name='description' onChange={(e) => this.textHandler(e)} value={this.state.description} type="text" placeholder="Enter product description"/>
                            </Form.Group>

                            <Form.Group controlId="productPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control name='price' onChange={(e) => this.textHandler(e)} value={this.state.price} type="number" placeholder="100"/>
                            </Form.Group>


                            <Form.Group controlId="productCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control  name="category" onChange={(e)=>this.textHandler(e)} value={this.state.category} as="select">
                                    <optgroup>
                                        <option>Choose category</option>
                                        {this.state.categories.map(category=>{
                                            return(
                                                <option key={category._id} value={category._id}>{category.title}</option>
                                            )
                                        })}
                                    </optgroup>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="productImage">
                                <Form.Label>Select image file</Form.Label>
                                <Form.Control name='image'  onChange={(e) => this.fileHandler(e)}  type="file"/>
                            </Form.Group>

                            <Button onClick={(e) => this.props.sendProductForm(e, this.state, this.props.history)} >Create item</Button>


                        </Form>
                    </div>
                }
            </Fragment>

        );
    }
}



const mapStateToProps = (state) =>{
    return {
        isLoggedIn: state.isLoggedIn,
        token: state.token
    }
};


const mapDispatchToProps = (dispatch) =>{

    return{
        sendProductForm: (e, state, history) => dispatch(sendProductForm(e, state, history)),
        fetchLogout: (e, token) => dispatch(fetchLogout(e, token))
    }

};


export default  connect(mapStateToProps, mapDispatchToProps)(ProductForm);