// import axios from "axios";
// not sure if i want to use axios instance here or not...?
import axios from "../../axiosInstance";

import * as actionTypes from "./actionTypes";
import { clearProjectTypes } from "./types";
// ======================================== SIGNUP ======================================== //

export const signUpStart = () => {
  return {
    type: actionTypes.SIGNUP_START,
  };
};

export const signUpSuccess = (authData) => {
  console.log(authData);
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    authData: authData,
  };
};

export const signUpFail = (error) => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error: error,
  };
};

export const signUp = (firstname, lastname, email, password) => {
  return (dispatch) => {
    dispatch(signUpStart());
    const authData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };
    axios({
      method: "POST",
      url: `${window.apiHost}/users/signup`,
      data: authData,
    })
      .then((response) => {
        // console.log(response);
        dispatch(signUpSuccess(response.data));
      })
      .catch((err) => {
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
    type: actionTypes.SIGNIN_START,
  };
};

export const signInSuccess = (token, userId, firstname) => {
  return {
    type: actionTypes.SIGNIN_SUCCESS,
    token: token,
    userId: userId,
    firstname: firstname,
  };
};

export const signInFail = (error) => {
  return {
    type: actionTypes.SIGNIN_FAIL,
    error: error,
  };
};

export const signIn = (email, password) => {
  return (dispatch) => {
    dispatch(signInStart());
    const authData = {
      email: email,
      password: password,
    };
    axios({
      method: "POST",
      url: `${window.apiHost}/users/signin`,
      data: authData,
    })
      .then((response) => {
        console.log("auth res!!!!!!!", response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        console.log("date", expirationDate);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("firstName", response.data.user.firstname);
        localStorage.setItem("expiresIn", expirationDate);
        dispatch(
          signInSuccess(
            response.data.token,
            response.data.user.id,
            response.data.user.firstname
          )
        );
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
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
    type: actionTypes.SIGNOUT,
  };
};

export const signOutSuccess = () => {
  return {
    type: actionTypes.SIGNOUT_SUCCESS,
    msg: "Signed Out",
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch(signOutStart());
    axios({
      method: "POST",
      url: `${window.apiHost}/users/signout`,
    })
      .then((response) => {
        console.log(response);
        localStorage.clear();
        dispatch(signOutSuccess());
        dispatch(clearProjectTypes());
      })
      .catch((err) => console.log(err));
  };
};

// ==================================== CHECK AUTH STATUS =================================== //

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(signOut());
    }, expirationTime * 1000);
  };
};

export const checkExpiration = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    dispatch(checkExpiration());
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(signOut());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(signOut());
      } else {
        const userId = localStorage.getItem("userId");
        const firstName = localStorage.getItem("firstName");
        dispatch(signInSuccess(token, userId, firstName));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

// export const checkToken = () => {};
// i would eventually like to figure out a better option. right now the backend checks the
// status of the jwt and send a 403 to the frontend if it's malformed/expired. the axios
// interceptors redirect to the splash page if they get a 403, but they have no knowledge
// of FE auth state, so... how to fix, make the interceptors some sort of HOC? use jwt.decode
// in interceptor? even so i may not be able to force logout as there's no
