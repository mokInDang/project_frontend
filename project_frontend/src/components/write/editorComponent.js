import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditorComponent({ getHtmlContent }) {
	const [content, setContent] = useState('');
	const getContent =(e)=>{
		setContent(e);
		getHtmlContent(content);
	}
	const modules = {
		toolbar: [
			//[{ 'font': [] }],
			[{ 'header': [1, 2, false] }],
			['bold', 'italic', 'underline', 'strike'],
			[
				{ 'list': 'ordered' },
				{ 'list': 'bullet' },
				{ 'indent': '-1' },
				{ 'indent': '+1' },
			],
			[{ 'align': [] }, { 'color': [] }, { 'background': [] }],
		],
	};

	const formats = [
		//'font',
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'align',
		'color',
		'background',
	];
	useEffect(() => {
		getContent()
	},[]);

	return (
		<div style={{ height: '600px' }}>
			<ReactQuill
				style={{ height: '550px' }}
				theme="snow"
				modules={modules}
				formats={formats}
				value={content}
				onChange={getContent}
			/>
		</div>
	);
}

export default EditorComponent;
