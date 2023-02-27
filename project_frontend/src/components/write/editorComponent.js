import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditorComponent() {
	const [value, setValue] = useState('');

	return (
		<ReactQuill
			theme="snow"
			value={value}
			onChange={setValue}
            style={{width: '100%', height:'550px'}}
		/>
	);
}

export default EditorComponent;
