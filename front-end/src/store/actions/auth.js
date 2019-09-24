// import axios from "axios";
// not sure if i want to use axios instance here or not...?
import axios from "../../axiosInstance";

import * as actionTypes from "./actionTypes";

// ======================================== SIGNUP ======================================== //

export const signUpStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  };
};

export const signUpSuccess = authData => {
  console.log(authData);
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

export const signUp = (firstname, lastname, email, password) => {
  return dispatch => {
    dispatch(signUpStart());
    const authData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    };
    axios({
      method: "POST",
      url: `${window.apiHost}/users/signup`,
      data: authData
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

export const signInSuccess = (token, userId, firstname) => {
  return {
    type: actionTypes.SIGNIN_SUCCESS,
    token: token,
    userId: userId,
    firstname: firstname
  };
};

export const signInFail = error => {
  return {
    type: actionTypes.SIGNIN_FAIL,
    error: error
  };
};

export const signIn = (email, password) => {
  return dispatch => {
    dispatch(signInStart());
    const authData = {
      email: email,
      password: password
    };
    axios({
      method: "POST",
      url: `${window.apiHost}/users/signin`,
      data: authData
    })
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("firstName", response.data.user.firstname);
        dispatch(
          signInSuccess(
            response.data.token,
            response.data.user.id,
            response.data.user.firstname
          )
        );
      })
      .catch(err => {
        console.log(err);
        dispatch(signInFail("Email or password is invalid"));
        // the default error message is useless for users, so pass a string for now, but will need to
        // figure out how to render the actual error message i'm trying to send from the backend
      });
  };
};

// ======================================== SIGNOUT ======================================== //

export const signOutStart = () => {
  return {
    type: actionTypes.SIGNOUT
  };
};

export const signOutSuccess = () => {
  return {
    type: actionTypes.SIGNOUT_SUCCESS,
    msg: "Signed Out"
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch(signOutStart());
    axios({
      method: "POST",
      url: `${window.apiHost}/users/signout`
    })
      .then(response => {
        console.log(response);
        localStorage.clear();
        dispatch(signOutSuccess());
      })
      .catch(err => console.log(err));
  };
};
