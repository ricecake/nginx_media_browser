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

export const Browser = ({file, location, fetchFiles}) => {
	if (!(file.loading || file.loaded)) {
		fetchFiles(location.pathname);
	}
	return (
		<FullFileBrowser
			files={file.fileList}
	//		folderChain={folderChain}
	//		fileActions={fileActions}
	//		onFileAction={handleFileAction}
	//		thumbnailGenerator={thumbnailGenerator}
//			{...props}
		/>
	);
};

const stateToProps = ({file}) => ({file});
const dispatchToProps = (dispatch) => bindActionCreators({fetchFiles}, dispatch);

export default connect(stateToProps, dispatchToProps)(Browser);
