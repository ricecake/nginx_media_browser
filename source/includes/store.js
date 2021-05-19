import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from 'redux-thunk';

import reducer from "Include/reducers";

const initialState = {};

const createStoreWithMiddleware = compose(
	applyMiddleware(ReduxThunk),
)(createStore);

const store = createStoreWithMiddleware(reducer, initialState);

export default store;
