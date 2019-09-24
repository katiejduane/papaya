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

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
    console.log(serializedState);
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
