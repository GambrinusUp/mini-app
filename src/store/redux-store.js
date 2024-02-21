import { createStore, combineReducers, applyMiddleware } from "redux";
import ThunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import bookingReducer from "./bookingReducer";
import keysReducer from "./keysReducer";
import userReducer from "./userReducer";

let reducers = combineReducers({
    bookingReducer : bookingReducer,
    keysReducer: keysReducer,
    userReducer: userReducer
});

let store = createStore(reducers, composeWithDevTools(
    applyMiddleware(ThunkMiddleware)
));

export default store;