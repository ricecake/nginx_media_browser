import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { fetchFiles } from "Include/reducers/file";

import {
    ChonkyActions,
    ChonkyFileActionData,
    FileArray,
    FileBrowserProps,
    FileData,
    FileHelper,
    FullFileBrowser,
} from 'chonky';

const pathToChain = (path = '/') => path.split('/').map((frag, index, array) => ({
	id: `${path}_${frag}_directory`,
	name: frag,
	isDir: true,
	fullPath: index === 0? '/' : array.slice(0, index+1).join('/'),
}));

const handleAction = (data, history, fetchFiles) => {
	switch (data.id) {
	case ChonkyActions.OpenFiles.id:
		console.log(data);
		if (data.payload.targetFile.isDir) {
			let path = data.payload.targetFile.fullPath;
			fetchFiles(path);
			history.push(path);
		}
		break;
	}
};

export const Browser = ({file, location, history, fetchFiles}) => {
	if (!(file.loading || file.loaded)) {
		fetchFiles(location.pathname);
	}
	return (
		<FullFileBrowser
			files={file.fileList}
			folderChain={pathToChain(location.pathname)}
	//		fileActions={fileActions}
			onFileAction={(data) => handleAction(data, history, fetchFiles)}
	//		thumbnailGenerator={thumbnailGenerator}
//			{...props}
		/>
	);
};

const stateToProps = ({file}) => ({file});
const dispatchToProps = (dispatch) => bindActionCreators({fetchFiles}, dispatch);

export default connect(stateToProps, dispatchToProps)(Browser);
