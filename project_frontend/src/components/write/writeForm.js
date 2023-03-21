import React, { useState } from 'react';
import EditorComponent from './editorComponent';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CustomSelectActivity, CustomSelectDate, TodayString } from './customSelect';

const WriteForm = () => {
	const [form, setForm] = useState({
		title: '',
		content: '',
		activityCategory: '',
		startingDate: '',
		requestDate: `${TodayString()}`,
	});

	const { title, content, activityCategory, startingDate, requestDate } = form;

	const writePost = () => {
		console.log('writePost 실행');
		axios.post(`/api/boards`, JSON.stringify(form), {
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
		});
	};
	const getSelectedActivity = (newSelectedActivity) => {
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			activityCategory: newSelectedActivity, // 덮어쓰기
		};
		// console.log('html');
		setForm(nextForm);
		console.log(nextForm);
	};
	const getSelectedDate = (newSelectedDate) => {
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			startingDate: newSelectedDate, // 덮어쓰기
		};
		// console.log('html');
		setForm(nextForm);
		console.log(nextForm);
	};

	const getHtmlContent = (newContent) => {
		if (newContent == '<p><br></p>') {
			newContent = '';
		}
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			content: newContent, // 덮어쓰기
		};
		// console.log('html');
		setForm(nextForm);
		console.log(nextForm);
	};

	const onChange = (e) => {
		// input 태그에 사용되는 함수
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			[e.target.name]: e.target.value, // 덮어쓰기
		};
		setForm(nextForm);
		console.log(nextForm);
	};

	return (
		<div>
			<h3>프로젝트 기본 정보를 입력해주세요.</h3>
			<hr />
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div style={{ display: 'inline-block', width: '45%' }}>
					<label htmlFor="activityCategory">모집 구분</label>
					<CustomSelectActivity
						name="activityCategory"
						value={activityCategory}
						getSelectedActivity={getSelectedActivity}
					/>
				</div>
				<div style={{ display: 'inline-block', width: '45%' }}>
					<label htmlFor="startingDate">시작 예정일</label>
					<CustomSelectDate
						name="startingDate"
						value={startingDate}
						getSelectedDate={getSelectedDate}
					/>
				</div>
			</div>
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
				name="content"
				value={content}
				getHtmlContent={getHtmlContent}></EditorComponent>
			<br />
			<Link to="/">취소</Link>
			<span onClick={writePost}>확인</span>
		</div>
	);
};

export default WriteForm;
