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

// i think i want to do this differently, i don't want to save all the application state in local storage
// instead just choose one thing to load/persist... come back to this later

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      console.log("no hay nada");
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

export const store = theStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
