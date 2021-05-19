import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { fetchFiles, openFile, closeFile } from "Include/reducers/file";
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

import Modal from "react-modal";

setChonkyDefaults({ iconComponent: ChonkyIconFA });

const pathToChain = (path = '/') => path.split('/').map((frag, index, array) => ({
	id: `${path}_${frag}_directory`,
	name: frag || "Root",
	isDir: true,
	fullPath: index === 0? '/' : array.slice(0, index+1).join('/'),
}));

const handleAction = (data, history, openFile) => {
	switch (data.id) {
	case ChonkyActions.OpenFiles.id:
		if (data.payload.targetFile) {
			let path = data.payload.targetFile.fullPath;
			let name = data.payload.targetFile.name;

			if (data.payload.targetFile.isDir) {
				history.push(path);
			} else {
				const regName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
				const reg = new RegExp(`/${regName}$`);
				let dirName = path.replace(reg, '')
				history.push(`${dirName}#${name}`);
				openFile();
			}
			break;
		}
	}
};

const getUrlFile = (location) => {
        const hash = location.hash.replace(/^#/,'');
        if (hash !== '') {
                return `${location.pathname}/${hash}`.replace(/\/{2,}/g, '/');
        }
        return null;
};

export const Browser = ({file, location, history, fetchFiles, openFile, closeFile}) => {
	if (!(file.loading || file.loaded === location.pathname)) {
		fetchFiles(location.pathname);
	}

	let openedFile = getUrlFile(location);

	return (<div style={{ height: '100vh', width: '100vw' }}>
			<FullFileBrowser
				files={file.fileList}
				folderChain={pathToChain(location.pathname)}
				onFileAction={(data) => handleAction(data, history, openFile)}
			/>
			<Modal
				isOpen={file.isOpen}
				onRequestClose={()=>{ history.push(location.pathname); closeFile()} }
				contentLabel={openedFile}
			>
				<Show If={file.isOpen}>
					<h2 style={{'text-align': 'center'}}>{openedFile}</h2>
					<video
						controls
						src={`/content/${openedFile}`}
						style={{
							'margin': '0 auto',
							'display': 'block',
							'min-width': '10%',
							'max-width': '95%',
							'max-height': '95%',
						}}
					/>
				</Show>
			</Modal>
		</div>
	);
};

const stateToProps = ({file}) => ({file});
const dispatchToProps = (dispatch) => bindActionCreators({fetchFiles, openFile, closeFile}, dispatch);

export default connect(stateToProps, dispatchToProps)(Browser);
