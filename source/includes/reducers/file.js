import { createActions, handleActions } from 'redux-actions';
import { MakeMerge } from "Include/reducers/helpers";

const defaultState = {
	loading: false,
	loaded: false,
	fileList: [null],
};

export const fetchFiles = (path = '/') => (dispatch, getState) => {
	dispatch(fetchStart());
	fetch('/api' + path)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			dispatch(fetchFinish(data.map((file)=>({
				id: `${file.name}_${file.type}`,
				name: file.name,
				isDir: file.type === 'directory',
			}))));
		});
};

export const {
	fetchStart,
	fetchFinish,
} = createActions({
	fetchStart: () => ({}),
	fetchFinish: (files) => (files),
}, { prefix: "media/files" });

const reducer = handleActions({
        [fetchStart]: (state, payload) => merge(state, { loading: true, loaded: false}),
        [fetchFinish]: (state, {payload: files}) => merge(state, { loading: false, loaded: true, fileList: files}),
}, defaultState);

const merge = MakeMerge((newState)=> {
	return newState;
});

export default reducer;
