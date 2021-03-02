import { createActions, handleActions } from 'redux-actions';
import { MakeMerge } from "Include/reducers/helpers";

const defaultState = {
	loading: false,
	loaded: false,
	fileList: [null],
	opened: null,
};

export const fetchFiles = (path = '/') => (dispatch, getState) => {
	dispatch(fetchStart());
	fetch('/api' + path)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			dispatch(fetchFinish(data.map((file)=>({
				id: `${path}_${file.name}_${file.type}`,
				name: file.name,
				isDir: file.type === 'directory',
				fullPath: `${path}/${file.name}`.replace(/\/{2,}/, '/'),
			}))));
		});
};

export const {
	clearList,
	fetchStart,
	fetchFinish,
	openFile,
} = createActions({
	clearList: () => ({}),
	fetchStart: () => ({}),
	fetchFinish: (files) => (files),
	openFile: (file) => (file),
}, { prefix: "media/files" });

const reducer = handleActions({
	[openFile]: (state, {payload: file}) => merge(state, {opened: file}),
	[clearList]: (state, payload) => merge(state, defaultState),
        [fetchStart]: (state, payload) => merge(state, { loading: true, loaded: false}),
        [fetchFinish]: (state, {payload: files}) => merge(state, { loading: false, loaded: true, fileList: files}),
}, defaultState);

const merge = MakeMerge((newState)=> {
	return newState;
});

export default reducer;
