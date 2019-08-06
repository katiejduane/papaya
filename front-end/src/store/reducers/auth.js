import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { signOutSuccess } from "../actions/auth";

const initialState = {
  token: null,
  firstname: null,
  userId: null,
  error: null,
  loading: false,
  authorized: false,
  registered: false,
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

const checkToken = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const tokenSuccess = (state, action) => {
  if (action.token) {
    localStorage.setItem("token", action.token);
  } else {
    localStorage.removeItem("token");
  }
  return updateObject(state, {
    token: action.token,
    userId: action.user.id,
    authorized: true,
    loading: false
  });
};

const tokenFail = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    firstname: null,
    authorized: false,
    loading: false
  });
};

const checkAuthTimeOut = (state, action) => {};

const signOut = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    authorized: false,
    msg: action.msg
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
    case actionTypes.CHECK_TOKEN:
      return checkToken(state, action);
    case actionTypes.TOKEN_SUCCESS:
      return tokenSuccess(state, action);
    case actionTypes.TOKEN_FAIL:
      return tokenFail(state, action);
    case actionTypes.SIGNOUT:
      return signOut(state, action);
    case actionTypes.SIGNOUT_SUCCESS:
      return signOutSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
