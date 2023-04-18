import React, { useState } from 'react';
import EditorComponent from './editorComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CustomSelectActivity, CustomSelectDate } from './customSelect';
import { Button, ButtonWrap, HR, Label, P, Title } from './writeFormComponents';
import { green1, green2 } from '../../assets/images';
import { movePath } from '../../utils';

const WriteForm = (props) => {
	const boardIdForEdit = props.boardIdForEdit;
	const navigate = useNavigate();
	const [form, setForm] = useState(props.form);
	const { title, contentBody, activityCategory, startingDate } = form;

	const writePost = () => {
		console.log('writePost 실행');
		console.log(form);
		axios
			.post(`/api/boards/recruitment`, JSON.stringify(form), {
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
			})
			.then((res) => {
				console.log(res.data.boardId);
				navigate(`/boards/recruitment/${res.data.boardId}`, { replace: true });
			})
			.catch((error) => {
				console.log(error);
				console.log(error.response.request.response);
			});
	};
	const getSelectedActivity = (newSelectedActivity) => {
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			activityCategory: newSelectedActivity, // 덮어쓰기
		};
		setForm(nextForm);
		console.log(form);
	};
	const getSelectedDate = (newSelectedDate) => {
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			startingDate: newSelectedDate, // 덮어쓰기
		};
		setForm(nextForm);
	};

	const getHtmlContentBody = (newContentBody) => {
		if (newContentBody === '<p><br></p>') {
			newContentBody = '';
		}
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			contentBody: newContentBody, // 덮어쓰기
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
				name="contentBody"
				value={contentBody}
				getHtmlContentBody={
					getHtmlContentBody
				}></EditorComponent>
			<ButtonWrap>
				<Button
					name="cancel"
					onClick={() => {
						if (window.confirm('글 작성을 취소하시겠습니까?')) {
							movePath(navigate, '/');
						}
					}}>
					취소
				</Button>
				<Button
					onClick={() => {
						if (!boardIdForEdit) writePost();
						else {
							// 수정(axios.patch) 함수 넣기
							console.log('수정하기 버튼 클릭');
						}
					}}
					name="write">
					{!boardIdForEdit ? '글 등록' : '수정하기'}
				</Button>
			</ButtonWrap>
		</div>
	);
};

export default WriteForm;
