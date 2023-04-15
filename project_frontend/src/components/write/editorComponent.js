import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quillstyle.css';
import { QuillWrap } from './writeFormComponents';

const Quill = ReactQuill.Quill;
var Font = Quill.import('formats/font');
var Size = Quill.import('formats/size');
Font.whitelist = ['NanumSquare', 'NanumSquareNeo'];
Size.whitelist = ['medium', 'large'];
Quill.register(Size, true);
Quill.register(Font, true);

function EditorComponent({ getHtmlContent }) {
	const [content, setContent] = useState('');
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
		getHtmlContent(content);
	}, [content]);

	return (
		<QuillWrap>
			<ReactQuill
				className="QuillComponent"
				theme="snow"
				modules={modules}
				formats={formats}
				value={content}
				onChange={setContent}
				placeholder="프로젝트에 대해 소개해주세요!"
			/>
		</QuillWrap>
	);
}

export default EditorComponent;
