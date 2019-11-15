import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  firstname: null,
  userId: null,
  error: null,
  loading: false,
  authorized: false,
  registered: null,
  expiresIn: null,
  msg: ""
};

const signUpStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const signUpSuccess = (state, action) => {
  console.log("action", action);
  return updateObject(state, {
    msg: "signup success",
    loading: false,
    registered: true
  });
};

const signUpFail = (state, action) => {
  return updateObject(state, {
    msg: "signup error",
    error: action.error,
    loading: false
  });
};

const signInStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const signInSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    expiresIn: action.expiresIn,
    userId: action.userId,
    firstname: action.firstname,
    error: null,
    loading: false,
    authorized: true
  });
};

const signInFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const checkAuthTimeOut = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    authorized: false,
    loading: false
  });
};

const signOutStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const signOutSuccess = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    firstname: null,
    msg: action.msg,
    authorized: false,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_START:
      return signUpStart(state, action);
    case actionTypes.SIGNUP_SUCCESS:
      return signUpSuccess(state, action);
    case actionTypes.SIGNUP_FAIL:
      return signUpFail(state, action);
    case actionTypes.SIGNIN_START:
      return signInStart(state, action);
    case actionTypes.SIGNIN_SUCCESS:
      return signInSuccess(state, action);
    case actionTypes.SIGNIN_FAIL:
      return signInFail(state, action);
    case actionTypes.CHECK_AUTH_TIMEOUT:
      return checkAuthTimeOut(state, action);
    case actionTypes.SIGNOUT:
      return signOutStart(state, action);
    case actionTypes.SIGNOUT_SUCCESS:
      return signOutSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
