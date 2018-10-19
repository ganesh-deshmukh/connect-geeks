import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const middleware = [thunk];

// createStore(reducer, preloaded-old-state, enhancer/middle-ware)
const store = createStore(() => [], {}, applyMiddleware(...middleware));

export default store;
