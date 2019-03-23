import axios from '../axios-counter';


export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACK';


export const FETCH_COUNTER_REQUEST = 'FETCH_COUNTER_REQUEST';
export const FETCH_COUNTER_SUCCESS = 'FETCH_COUNTER_SUCCESS';
export const FETCH_COUNTER_ERROR = 'FETCH_COUNTER_ERROR';


export const fetchCounterRequest = () => ({type: FETCH_COUNTER_REQUEST});

export const fetchCounterSuccess = (counter) => {
    return {type: FETCH_COUNTER_SUCCESS, counter};
};

export const fetchCounterError = (error) => {
    return {type: FETCH_COUNTER_ERROR, error};
};


export const fetchCounter = () => {
    return (dispatch) => {
        dispatch(fetchCounterRequest());
        axios.get('counter.json')
            .then(responce =>{
                dispatch(fetchCounterSuccess(responce.data))
            }, error =>{
                dispatch(fetchCounterError(error));
            })
    }
};



export const incrementCounter = (amount =1) =>{
    return {type: INCREMENT, amount};
};

export const decrementCounter = (amount =1) =>{
    return {type: DECREMENT, amount};
};
//
// export const addCounter = (amount) =>{
//     return {type: ADD, amount};
// };
//
// export const subtractCounter = (amount) =>{
//     return {type: SUBTRACT, amount};
// };