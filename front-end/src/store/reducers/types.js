import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  types: [],
  userId: null,
  error: null,
  loading: false
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

const noTypesYet = (state, action) => {
  return updateObject(state, {
    types: action.types,
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

const clearProjectTypes = (state, action) => {
  return updateObject(state, {
    types: [],
    userId: null,
    error: null,
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
    case actionTypes.TYPES_CLEAR:
      return clearProjectTypes(state, action);
    case actionTypes.TYPES_NONE:
      return noTypesYet(state, action);
    default:
      return state;
  }
};

export default reducer;
