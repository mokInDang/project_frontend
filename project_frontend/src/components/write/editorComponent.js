import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quillstyle.css';

const Quill = ReactQuill.Quill;
var Font = Quill.import('formats/font');
var Size = Quill.import('formats/size');
Font.whitelist = ['NanumSquare', 'NanumSquareNeo'];
Size.whitelist = ['medium', 'large'];
Quill.register(Size, true);
Quill.register(Font, true);

function EditorComponent({ getHtmlContentBody, value, placeholder }) {
	const [contentBody, setContentBody] = useState('');
	const modules = {
		toolbar: [
			[{ 'font': Font.whitelist }],
			[{ 'size': ['medium', 'large'] }],
			['bold', 'italic', 'underline'],
			[{ 'list': 'ordered' }, { 'list': 'bullet' }],
			[{ 'align': [] }, { 'color': [] }, { 'background': [] }],
		],
	};

	const formats = [
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'align',
		'color',
		'background',
	];
	useEffect(() => {
		setContentBody(value);
	}, []);

	useEffect(() => {
		// if (contentBody.replace(/(<([^>]+)>)/gi, '').replace(/\s/g, '') === '') {
		// 	setContentBody('');
		// }
		getHtmlContentBody(contentBody);
	}, [contentBody]);

	return (
		<ReactQuill
			theme='snow'
			modules={modules}
			formats={formats}
			value={contentBody}
			onChange={setContentBody}
			placeholder={placeholder}
		/>
	);
}

export default EditorComponent;
