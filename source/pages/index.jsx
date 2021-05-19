import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'


import Browser from "Component/Browser";

export const App = (props) => {
	return (
		<div>
			<Browser {...props}/>
		</div>
	);
};

const stateToProps = (state) => (state);
const dispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(stateToProps, dispatchToProps)(App);
