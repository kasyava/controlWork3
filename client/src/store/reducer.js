import {INCREMENT, DECREMENT, ADD, SUBTRACT, FETCH_COUNTER_SUCCESS, FETCH_COUNTER_REQUEST} from "./actions";

const initialState ={
    counter: 0,
    isLoading: false
};

const reducer = (state = initialState, action) =>{

    switch (action.type) {
        case INCREMENT:
            return{...state, counter: state.counter + action.amount};

        case DECREMENT:
            return{...state, counter: state.counter - action.amount};
        case FETCH_COUNTER_SUCCESS:
            return {...state, counter: action.counter, isLoading: false};
        case FETCH_COUNTER_REQUEST:
            return {...state, isLoading: true};
        // case SUBTRACT:
        //     return{...state, counter: state.counter - action.amount};
        // case ADD:
        //     return{...state, counter: state.counter + action.amount};
        default:
            return state;

    }

};


export default reducer;