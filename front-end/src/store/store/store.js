// import { createStore, applyMiddleware } from "redux";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import typeReducer from "../reducers/types";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  type: typeReducer
});

const middleware = applyMiddleware(thunk);
// const theStore = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );
const theStore = middleware(createStore);

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
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
console.log(persistedState);

export const store = theStore(rootReducer, persistedState);
