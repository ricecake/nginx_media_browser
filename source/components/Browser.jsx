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
    setChonkyDefaults,
} from 'chonky';

import { ChonkyIconFA } from 'chonky-icon-fontawesome';

setChonkyDefaults({ iconComponent: ChonkyIconFA });

const pathToChain = (path = '/') => path.split('/').map((frag, index, array) => ({
	id: `${path}_${frag}_directory`,
	name: frag || "Root",
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
			onFileAction={(data) => handleAction(data, history, fetchFiles)}
	//		thumbnailGenerator={thumbnailGenerator}
		/>
	);
};

const stateToProps = ({file}) => ({file});
const dispatchToProps = (dispatch) => bindActionCreators({fetchFiles}, dispatch);

export default connect(stateToProps, dispatchToProps)(Browser);
