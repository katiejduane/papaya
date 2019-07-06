import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: localStorage.getItem("token"),
  types: [],
  userId: null,
  error: null,
  loading: false,
  msg: ""
};

const typeStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const typeSuccess = (state, action) => {
  return updateObject(state, {
    types: action.types,
    userId: action.userId,
    error: null,
    loading: false
  });
};

const typeFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TYPE_START:
      return typeStart(state, action);
    case actionTypes.TYPE_SUCCESS:
      return typeSuccess(state, action);
    case actionTypes.TYPE_FAIL:
      return typeFail(state, action);
    default:
      return state;
  }
};

export default reducer;
