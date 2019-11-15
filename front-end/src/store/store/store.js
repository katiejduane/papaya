import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import typeReducer from "../reducers/types";

const rootReducer = combineReducers({
  auth: authReducer,
  type: typeReducer
});

const middleware = applyMiddleware(thunk);

const theStore = middleware(createStore);

// SOMETHING IS WRONG WITH THIS... IT PERSISTS IN LOCAL STORAGE BASICALLY FOREVER UNLESS MANUALLY CLEARED
// WHICH IS NOT GOOD! THE AUTH STUFF IS SET TO NULL BECAUSE THE SIGNOUT ACTION DOES THAT, BUT THE TYPE
// DATA STAYS. FIX!!! i think the issue may be with how loadFromLocalStorage creates 'persistedState'
// which is in the store??? idk... ALSO... if token 'dies' and isnt explicitly signed out, i think
// this also causes issues because of how this file works, other parts of auth are intact...

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
    // console.log(serializedState);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
  }
};

export const saveToLocalStorage = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
};

const persistedState = loadFromLocalStorage();
// console.log(persistedState);

export const store = theStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
