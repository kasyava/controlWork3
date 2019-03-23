import React, {Component} from 'react';

import './Counter.css';
import {connect} from "react-redux";
import {addCounter, decrementCounter, incrementCounter, subtractCounter, fetchCounter} from "../../store/actions";

class Counter extends Component{

    componentDidMount() {
        this.props.fetchCounter();
    }


    render(){
        return(
            this.props.isLoading ? <div>Loading</div> :
            <div className='Counter'>
                <h1>{this.props.counter}</h1>
                <button onClick={() => this.props.increaseCounter()}>Increase</button>
                <button onClick={() => this.props.decreaseCounter()}>Decrease</button>
                <button onClick={() => this.props.increaseCounter(5)}>Increase by 5</button>
                <button onClick={() => this.props.decreaseCounter(5)}>Decrease by 5</button>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        counter: state.counter,
        isLoading: state.isLoading
    }
};


const mapDispatchToProps = (dispatch) =>{

    return{
        increaseCounter: (amount) => dispatch(incrementCounter(amount)),
        decreaseCounter: (amount) => dispatch(decrementCounter(amount)),
        // addCounter: (amount) => dispatch(addCounter(amount)),
        // subtractCounter: (amount) => dispatch(subtractCounter(amount))
        fetchCounter: () => dispatch(fetchCounter())
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);