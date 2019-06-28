import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authorized: false,
    message: '',
    authRedirectPath: '/'
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
        loading: false,
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
        case actionTypes.SIGNIN_START: return signInStart(state, action);
        case actionTypes.SIGNIN_SUCCESS: return signInSuccess(state, action);
        case actionTypes.SIGNIN_FAIL: return signInFail(state, action);
        case actionTypes.SIGNOUT: return signOut(state, action);
        // case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;

