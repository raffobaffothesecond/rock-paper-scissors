import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./Reducers";


const middlewares = [thunk];

export default createStore(rootReducer,{},applyMiddleware(...middlewares));
