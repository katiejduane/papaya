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

export const checkAuthTimeOut = expirationTime => {
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
    dispatch(signInStart());
    const authData = {
      email: email,
      password: password
    };
    axios({
      method: "POST",
      url: `${window.apiHost}/users/signin`,
      data: authData,
      headers
    })
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expirationTime", response.data.expiresIn);
        localStorage.setItem("userId", response.data.user.id);
        dispatch(signInSuccess(response.data.token, response.data.user.id));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
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
        dispatch(checkAuthTimeOut(response.data.expiresIn));
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

// ================================ Checking Various Auth States ===============================

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(signOut());
    } else {
      const expireTime = localStorage.getItem("expirationTime");
      if (expireTime <= 0) {
        dispatch(signOut());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(signInSuccess(token, userId));
        dispatch(checkAuthTimeOut(expireTime));
      }
    }
  };
};
// ======================================== SIGNOUT ======================================== //

export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.SIGNOUT
  };
};
