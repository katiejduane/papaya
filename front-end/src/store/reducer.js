// import * as actionTypes from './actions';

const initialState = {
    loggedIn : false
}

const reducer = (state = initialState, action) => {
    console.log(state, initialState, action)
}

export default reducer;