import React, { useState } from 'react';
import EditorComponent from './editorComponent';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
	CustomSelectActivity,
	CustomSelectDate,
	TodayString,
} from './customSelect';
import { Button, ButtonWrap, HR, Label, P, Title } from './writeFormComponents';
import { green1, green2 } from '../../assets/images';

const WriteForm = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		title: '',
		content: '',
		activityCategory: '',
		startingDate: '',
	});

	const { title, content, activityCategory, startingDate } = form;

	const writePost = async () => {
		console.log('writePost 실행');
		console.log(form);
		axios
			.post(`/api/boards`, JSON.stringify(form), {
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
			})
			.then((res) => {
				console.log(res.data.boardId);
				navigate(`/boards/${res.data.boardId}`, { replace: true });
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const getSelectedActivity = (newSelectedActivity) => {
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			activityCategory: newSelectedActivity, // 덮어쓰기
		};
		setForm(nextForm);
	};
	const getSelectedDate = (newSelectedDate) => {
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			startingDate: newSelectedDate, // 덮어쓰기
		};
		setForm(nextForm);
	};

	const getHtmlContent = (newContent) => {
		if (newContent === '<p><br></p>') {
			newContent = '';
		}
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			content: newContent, // 덮어쓰기
		};
		setForm(nextForm);
	};

	const onChange = (e) => {
		// input 태그에 사용되는 함수
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			[e.target.name]: e.target.value, // 덮어쓰기
		};
		setForm(nextForm);
	};

	return (
		<div>
			<P>
				<img
					src={green1}
					alt="1"
				/>
				프로젝트 기본 정보를 입력해주세요.
			</P>
			<HR />
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '7rem',
				}}>
				<div style={{ display: 'inline-block', width: '48%' }}>
					<Label htmlFor="activityCategory">모집 구분</Label>
					<CustomSelectActivity
						name="activityCategory"
						value={activityCategory}
						getSelectedActivity={getSelectedActivity}
					/>
				</div>
				<div style={{ display: 'inline-block', width: '48%' }}>
					<Label htmlFor="startingDate">시작 예정일</Label>
					<CustomSelectDate
						name="startingDate"
						value={startingDate}
						getSelectedDate={getSelectedDate}
					/>
				</div>
			</div>
			<P>
				<img
					src={green2}
					alt="2"
				/>
				프로젝트에 대해 소개해주세요.
			</P>
			<HR />
			<Label htmlFor="title">제목</Label>
			<Title
				type="text"
				placeholder="글 제목을 입력해주세요."
				name="title"
				value={title}
				onChange={onChange}></Title>
			<EditorComponent
				name="content"
				value={content}
				getHtmlContent={getHtmlContent}></EditorComponent>
			<ButtonWrap>
				<Button name="cancel">
					<Link
						to="/"
						style={{ textDecoration: 'none', color: '#767676' }}>
						취소
					</Link>
				</Button>
				<Button
					onClick={writePost}
					name="write">
					글 등록
				</Button>
			</ButtonWrap>
		</div>
	);
};

export default WriteForm;
