import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index"; // it will work, even-if you don't give path as index.js
const middleware = [thunk];

const initialState = {};

// createStore(reducer, preloaded-initial-state, enhancer/middle-ware)
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
