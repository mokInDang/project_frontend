import React, { useState } from 'react';
import EditorComponent from './editorComponent';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WriteForm = () => {
	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	var now = year + '-' + month + '-' + day;
	let todayString = now.toString();

	const [htmlContent, setHtmlContent] = useState('');
	const [form, setForm] = useState({
		activityCategory: '',
		startingDate: '',
		title: '',
	});

	const { activityCategory, startingDate, title } = form;

	const writePost = () => {
		const formData = JSON.stringify(form);
		console.log(formData);
		axios({
			url: `/board`, //서버 url로 수정하기
			method: 'post',
			body: formData,
		});
	};
	const getHtmlContent = (newContent) => {
		setHtmlContent(newContent);
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			content: htmlContent, // 덮어쓰기
		};
		console.log(nextForm);
		// console.log('html');
		setForm(nextForm);
	};

	const onChange = (e) => {
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			[e.target.name]: e.target.value, // 덮어쓰기
		};
		console.log(nextForm);
		setForm(nextForm);
	};

	return (
		<div>
			<h3>프로젝트 기본 정보를 입력해주세요.</h3>
			<hr />
			<label htmlFor="activityCategory">모집 구분</label>
			<select
				onChange={onChange}
				id="activityCategory"
				name="activityCategory"
				value="산책/달리기"
				required>
				<option
					value="산책/달리기"
					disabled>
					산책/달리기
				</option>
				<option value="산책">산책</option>
				<option value="달리기">달리기</option>
			</select>
			<label htmlFor="startingDate">시작 예정일</label>
			<input
				type="date"
				name="startingDate"
				value={startingDate}
				onChange={onChange}
				min={todayString}></input>
			<h3>프로젝트에 대해 소개해주세요.</h3>
			<hr></hr>
			<label htmlFor="title">제목</label>
			<br></br>
			<input
				type="text"
				placeholder="글 제목을 입력해주세요."
				name="title"
				value={title}
				onChange={onChange}></input>
			<EditorComponent
				name="text"
				value={htmlContent}
				getHtmlContent={getHtmlContent}
				onChange={onChange}></EditorComponent>
			<Link to="/">취소</Link>
			<span onClick={writePost}>확인</span>
		</div>
	);
};

export default WriteForm;
