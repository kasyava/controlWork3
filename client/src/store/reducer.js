import {INCREMENT, DECREMENT, FETCH_LOGIN_SUCCESS, FETCH_REGISTER_SUCCESS, FETCH_LOGOUT_SUCCESS,SUBTRACT, FETCH_PRODUCTS_SUCCESS, FETCH_REQUEST, FETCH_ERROR, CHANGE_INPUT_HANDLE} from "./actions";

const initialState ={
    counter: 0,
    isLoading: false,
    isLoggedIn: false,
    username: '',
    token: '',
    displayname: '',
    phone: '',
    password: '',
    products: null
};

const reducer = (state = initialState, action) =>{

    switch (action.type) {
        case INCREMENT:
            return{...state, counter: state.counter + action.amount};

        case DECREMENT:
            return{...state, counter: state.counter - action.amount};
        case FETCH_PRODUCTS_SUCCESS:
            return {...state, products: action.products, isLoading: false};

        case FETCH_REQUEST:
            return {...state, isLoading: true};

        case FETCH_ERROR:
            alert(action.error.error);
            return {...state};

        case SUBTRACT:
            return{...state, counter: state.counter - action.amount};

        case CHANGE_INPUT_HANDLE:
            return{...state, [action.e.target.name]: action.e.target.value};

        case FETCH_LOGIN_SUCCESS:

            return {...state, token: action.data.token, displayname: action.data.displayname, isLoggedIn: true};

        case FETCH_LOGOUT_SUCCESS:
            return {...state, username: '', password: '', phone: '', token: '', displayname: '', isLoggedIn: false};

        case FETCH_REGISTER_SUCCESS:
            return {...state, token: action.data.token, displayname: action.data.displayname, isLoggedIn: true};


        default:
            return state;

    }

};


export default reducer;