import { createActions, handleActions } from 'redux-actions';
import { MakeMerge } from "Include/reducers/helpers";

const defaultState = {
};

export const {
} = createActions({
}, { prefix: "media/files" });

const reducer = handleActions({
}, defaultState);

const merge = MakeMerge((newState)=> {
	return newState;
});

export default reducer;
