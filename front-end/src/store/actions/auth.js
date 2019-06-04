import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

//you might end up splitting this into two files (login/reg) with their own methods!
export const auth = (firstname, lastname, email, password, method) => {
    return dispatch => {
        // authenticate user
        dispatch(authStart())
        const authData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            returnToken: true
            //the above line might be a sham i've made up
        }
        axios.post(`${window.apiHost}users/signup`, authData)
            .then(response => {
                console.log(response)
                dispatch(authSuccess(response.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err))
            })
    }   
}