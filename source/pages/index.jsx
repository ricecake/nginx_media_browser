import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

export const App = (props) => {
	console.log(props);
	return (
		<div>Hello world!</div>
	);
};

const stateToProps = (x) => (x);
const dispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(stateToProps, dispatchToProps)(App);
