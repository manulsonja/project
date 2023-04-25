import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { configureStore } from "@reduxjs/toolkit";


const initialState = {};

const store = configureStore(
    {
            "reducer": rootReducer,
            "initialState":initialState,
            "devTools": true,
            "middleware": [thunk],
        }
);

export default store;


