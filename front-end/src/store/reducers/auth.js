import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: localStorage.getItem("token"),
  userId: null,
  error: null,
  loading: false,
  authorized: false,
  msg: "",
  authRedirectPath: "/splash"
};

const signUpStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const signUpSuccess = (state, action) => {
  return updateObject(state, {
    msg: "signup success",
    error: null,
    loading: false,
    token: action.token
  });
};

const signUpFail = (state, action) => {
  return updateObject(state, {
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
  if (action.token) {
    localStorage.setItem("token", action.token);
  } else {
    localStorage.removeItem("token");
  }
  return updateObject(state, {
    token: action.token,
    userId: action.user.id,
    authorized: true
  });
};

const signOut = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

// const setAuthRedirectPath = (state, action) => {
//     return updateObject(state, { authRedirectPath: action.path })
// }

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
    case actionTypes.SIGNOUT:
      return signOut(state, action);
    // case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
