import axios from '../axios-config';


export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACK';


export const FETCH_REQUEST = 'FETCH_REQUEST';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_REGISTER_SUCCESS = 'FETCH_REGISTER_SUCCESS';
export const FETCH_LOGOUT_SUCCESS = 'FETCH_LOGOUT_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

export const CHANGE_INPUT_HANDLE = 'CHANGE_INPUT_HANDLE';



export const fetchRequest = () => ({type: FETCH_REQUEST});

export const fetchProductsSuccess = (products) => {
    return {type: FETCH_PRODUCTS_SUCCESS, products};
};
export const fetchAddProductsSuccess = (products) => {
    return {type: FETCH_PRODUCTS_SUCCESS, products};
};

export const fetchLoginSuccess = (data) => {
    return {type: FETCH_LOGIN_SUCCESS, data};
};
export const fetchRegisterSuccess = (data) => {
    return {type: FETCH_REGISTER_SUCCESS, data};
};

export const fetchLogoutSuccess = () => {
    return {type: FETCH_LOGOUT_SUCCESS};
};

export const fetchError = (error) => {
    return {type: FETCH_ERROR, error};
};


export const fetchProducts = () => {
    return (dispatch) => {
        dispatch(fetchRequest());
        axios.get('products')
            .then(responce =>{
                dispatch(fetchProductsSuccess(responce.data))
            }, error =>{
                dispatch(fetchError(error));
            })
    }
};

export const sendLoginForm = (e, username, password, history) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);
    return (dispatch) => {
        dispatch(fetchRequest());
        axios.post('users/sessions', formData)
            .then(responce =>{
                dispatch(fetchLoginSuccess(responce.data))
                history.push('/');
            }, error =>{
                dispatch(fetchError(error.response.data));
            })
    }
};
export const sendRegisterForm = (e, username, password, displayname, phone,  history) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);
    formData.set('displayname', displayname);
    formData.set('phone', phone);
    return (dispatch) => {
        dispatch(fetchRequest());
        axios.post('users', formData)
            .then(responce =>{
                dispatch(fetchRegisterSuccess(responce.data));
                history.push('/');
            }, error =>{

                dispatch(fetchError(error.response.data));
            })
    }
};


export const sendProductForm = (e, state, history) =>{
    e.preventDefault();
    const formData = new FormData();
    Object.keys(state).forEach(item =>{
        formData.append(item, state[item]);
    });

    if(state.isLoggedIn !== false) {
        const headers = {"Token": state.token};
        return (dispatch) => {
            axios.post('products',formData,{headers})
                .then((response)=>{
                    //dispatch(fetchAddProductsSuccess(response.data));
                    history.push('/');
                }, error =>{
                    dispatch(fetchError(error.response.data));
                })
        }
    }

};


export const fetchLogout = (token) =>{

    return (dispatch) => {
        dispatch(fetchRequest());

        axios.delete('users/sessions', {headers: {Token: token} })
            .then(responce =>{
                dispatch(fetchLogoutSuccess(responce.data))
            }, error =>{
                dispatch(fetchError(error));
            })
    }

};


export const changeInputHandle = (e) => {
    return{type: CHANGE_INPUT_HANDLE, e}
};

