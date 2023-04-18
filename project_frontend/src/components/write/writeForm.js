import React, { useState } from 'react';
import EditorComponent from './editorComponent';
import { useNavigate } from 'react-router-dom';
import { CustomSelectActivity, CustomSelectDate } from './customSelect';
import { Button, ButtonWrap, HR, Label, P, Title } from './writeFormComponents';
import { green1, green2 } from '../../assets/images';
import { movePath } from '../../utils';
import { writeRecruitment, EditRecruitment } from '../../apis';

const WriteForm = (props) => {
	const boardIdToEdit = props.boardIdToEdit;
	const navigate = useNavigate();
	const [form, setForm] = useState(props.form);
	const { title, contentBody, activityCategory, startingDate } = form;

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
				getHtmlContentBody={getHtmlContentBody}
			/>
			<ButtonWrap>
				<Button
					name="cancel"
					onClick={() => {
						if (window.confirm('작성을 취소하고 페이지를 벗어나시겠습니까?')) {
							movePath(navigate, '/');
						}
					}}>
					취소
				</Button>
				<Button
					onClick={() => {
						if (!boardIdToEdit) writeRecruitment(form, navigate);
						else EditRecruitment(boardIdToEdit, form, navigate);
					}}
					name="write">
					{!boardIdToEdit ? '글 등록' : '수정하기'}
				</Button>
			</ButtonWrap>
		</div>
	);
};

export default WriteForm;
