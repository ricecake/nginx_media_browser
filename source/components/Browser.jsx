import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { fetchFiles, openFile } from "Include/reducers/file";
import { Show } from "Component/Helpers";

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

const handleAction = (data, history, fetchFiles, openFile) => {
	switch (data.id) {
	case ChonkyActions.OpenFiles.id:
		if (data.payload.targetFile) {
			let path = data.payload.targetFile.fullPath;
			if (data.payload.targetFile.isDir) {
				fetchFiles(path);
				history.push(path);
			} else {
				console.log("opening", path);
				openFile(path);
			}
			break;
		}
	}
};

export const Browser = ({file, location, history, fetchFiles, openFile}) => {
	console.log(file);
	if (!(file.loading || file.loaded)) {
		fetchFiles(location.pathname);
	}
	return (<div>
			<FullFileBrowser
				files={file.fileList}
				folderChain={pathToChain(location.pathname)}
				onFileAction={(data) => handleAction(data, history, fetchFiles, openFile)}
			/>
			<Show If={file.opened}>
				<video controls src={`/content/${file.opened}`}/>
			</Show>
		</div>
	);
};

const stateToProps = ({file}) => ({file});
const dispatchToProps = (dispatch) => bindActionCreators({fetchFiles, openFile}, dispatch);

export default connect(stateToProps, dispatchToProps)(Browser);
