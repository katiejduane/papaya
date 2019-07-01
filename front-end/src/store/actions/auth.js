import axios from "axios";

import * as actionTypes from "./actionTypes";

// ======================================== SIGNUP ======================================== //

export const signUpStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  };
};

export const signUpSuccess = authData => {
  localStorage.setItem("token", authData.token);
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    authData: authData
  };
};

export const signUpFail = error => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error: error
  };
};

//you might end up splitting this into two files (login/reg) with their own methods!
export const signUp = (firstname, lastname, email, password) => {
  const headers = {
    "Content-type": "application/json"
  };
  return dispatch => {
    // authenticate user
    dispatch(signUpStart());
    const authData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
      // returnToken: true
      //the above line might be a sham i've made up
    };
    axios({
      method: "POST",
      url: `${window.apiHost}/users/signup`,
      data: authData,
      headers
    })
      .then(response => {
        console.log(response);
        dispatch(signUpSuccess(response.data));
      })
      .catch(err => {
        console.log("error", err);
        dispatch(
          signUpFail("That email appears to already be in our database!")
        );
        // the default error message is useless for users, so pass a string for now, but will need to
        // figure out how to render the actual error message i'm trying to send from the backend
      });
  };
};

// ======================================== SIGNIN ======================================== //
export const signInStart = () => {
  return {
    type: actionTypes.SIGNIN_START
  };
};

export const signInSuccess = (token, userId) => {
  localStorage.setItem("token", token);
  return {
    type: actionTypes.SIGNIN_SUCCESS,
    token: token,
    userId: userId
  };
};

export const signInFail = error => {
  return {
    type: actionTypes.SIGNIN_FAIL,
    error: error
  };
};

export const signOut = () => {
  return {
    type: actionTypes.SIGNOUT
  };
};

export const checkAuthTimeOut = expirationTime => {
  console.log(expirationTime);
  return dispatch => {
    setTimeout(() => {
      dispatch(signOut());
    }, expirationTime * 1000);
  };
};

export const signIn = (email, password) => {
  const headers = {
    "Content-type": "application/json"
  };
  return dispatch => {
    // authenticate user
    dispatch(signInStart());
    const authData = {
      email: email,
      password: password,
      returnToken: true
      //the above line might be a sham i've made up
    };
    axios({
      method: "POST",
      url: `${window.apiHost}/users/signin`,
      data: authData,
      headers
    })
      .then(response => {
        console.log(response);
        dispatch(signInSuccess(response.data.token, response.data.user.id));
        // dispatch(checkToken())
        // dispatch(checkAuthTimeOut(response.data.expiresIn))
      })
      .catch(err => {
        console.log(err);
        dispatch(signInFail("Email or password is invalid"));
        // the default error message is useless for users, so pass a string for now, but will need to
        // figure out how to render the actual error message i'm trying to send from the backend
      });
  };
};

// ===================================== CHECK TOKEN ====================================== //

export const checkToken = () => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-type": "application/json"
  };
  if (token) {
    headers["Authorization"] = token;
  }
  return dispatch => {
    axios({
      method: "GET",
      url: `${window.apiHost}/users/checkToken`,
      token: token,
      headers
    })
      .then(response => {
        console.log(response);
        dispatch(tokenSuccess(response.data.token, response.data.user.id));
        // dispatch(checkAuthTimeOut(response.data.expiresIn))
      })
      .catch(err => {
        console.log(err);
        dispatch(tokenFail(err));
        // the default error message is useless for users, so pass a string for now, but will need to
        // figure out how to render the actual error message i'm trying to send from the backend
      });
  };
};

export const tokenSuccess = (token, userId) => {
  console.log(token, userId);
  return {
    type: actionTypes.TOKEN_SUCCESS,
    token: token,
    userId: userId
  };
};

export const tokenFail = error => {
  return {
    type: actionTypes.TOKEN_FAIL,
    error: error
  };
};

// ======================================== SIGNOUT ======================================== //
