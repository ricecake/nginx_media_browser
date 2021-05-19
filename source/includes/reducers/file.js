import { createActions, handleActions } from 'redux-actions';
import { MakeMerge } from "Include/reducers/helpers";

const defaultState = () => ({
	loading: false,
	loaded: false,
	fileList: [],
	isOpen: location.hash !== '',
});

export const fetchFiles = (path = '/') => (dispatch, getState) => {
	dispatch(fetchStart());
	let reqPath = `/api/${path}/`.replace(/\/{2,}/g, '/');
	fetch(reqPath)
		.then(response => response.json())
		.then(data => {
			dispatch(fetchFinish(path, data.map((file)=>({
				id: `${path}_${file.name}_${file.type}`,
				name: file.name,
				isDir: file.type === 'directory',
				fullPath: `${path}/${file.name}`.replace(/\/{2,}/g, '/'),
			}))));
		});
};

export const {
	clearList,
	fetchStart,
	fetchFinish,
	openFile,
	closeFile,
} = createActions({
	clearList: () => ({}),
	fetchStart: () => ({}),
	fetchFinish: (path, files) => ({path, files}),
	openFile: () => ({}),
	closeFile: () => ({}),
}, { prefix: "media/files" });

const reducer = handleActions({
	[openFile]: (state, payload) => merge(state, { isOpen: true }),
	[closeFile]: (state, payload) => merge(state, { isOpen: false }),
	[clearList]: (state, payload) => merge(state, defaultState()),
        [fetchStart]: (state, payload) => merge(state, { loading: true, loaded: false}),
        [fetchFinish]: (state, {payload: {path, files}}) => merge(state, { loading: false, loaded: path, fileList: files}),
}, defaultState());

const merge = MakeMerge((newState)=> {
	return newState;
});

export default reducer;
