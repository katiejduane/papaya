import axios from 'axios';

import * as actionTypes from './actionTypes';


// ======================================== SIGNUP ======================================== //

export const signUpStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signUpSuccess = (authData) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        authData: authData
    }
};

export const signUpFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    }
};

//you might end up splitting this into two files (login/reg) with their own methods!
export const signUp = (firstname, lastname, email, password) => {
    return dispatch => {
        // authenticate user
        dispatch(signUpStart())
        const authData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            // returnToken: true
            //the above line might be a sham i've made up
        }
        axios({
            method: 'POST',
            url: `${window.apiHost}/users/signup`,
            data: authData
        })
        .then(response => {
            // console.log(response)
            dispatch(signUpSuccess(response.data))
        })
        .catch(err => {
            console.log(err);
            dispatch(signUpFail(err))
        })
    }   
}


// ======================================== SIGNIN ======================================== //
export const signInStart = () => {
    return {
        type: actionTypes.SIGNIN_START
    };
};

export const signInSuccess = (authData) => {
    return {
        type: actionTypes.SIGNIN_SUCCESS,
        authData: authData
    }
};

export const signInFail = (error) => {
    return {
        type: actionTypes.SIGNIN_FAIL,
        error: error
    }
};

export const signIn = (email, password) => {
    return dispatch => {
        // authenticate user
        dispatch(signInStart())
        const authData = {
            email: email,
            password: password,
            // returnToken: true
            //the above line might be a sham i've made up
        }
        console.log(authData)
        axios({
            method: 'POST',
            url: `${window.apiHost}/users/signin`,
            data: authData
        })
            .then(response => {
                console.log(response)
                dispatch(signInSuccess(response.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(signInFail(err))
            })
    }
}


// ======================================== SIGNOUT ======================================== //