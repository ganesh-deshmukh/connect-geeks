import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index"; // it will work, even-if you don't give path as index.js
const middleware = [thunk];

const initialState = {};

// createStore(reducer, preloaded-initial-state, enhancer/middle-ware)
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
