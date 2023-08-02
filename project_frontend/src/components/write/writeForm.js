import React, { useEffect, useState } from 'react';
import EditorComponent from './editorComponent';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	ButtonWrap,
	HR,
	Label,
	P,
	Title,
	NumDiv,
} from './writeFormComponents';
import { writeRecruitment, EditRecruitment } from '../../apis';
import { CustomSelectActivity, CustomSelectDate, Map, WriteWrapper } from '..';

const WriteForm = (props) => {
	const boardIdToEdit = props.boardIdToEdit;
	const navigate = useNavigate();
	const [form, setForm] = useState(props.form);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		props.getIsLoading(isLoading);
	}, [isLoading]);
	const {
		title,
		contentBody,
		activityCategory,
		startingDate,
		meetingPlaceCreationRequest,
		meetingPlaceModificationRequest,
	} = form;
	var meetingPlace = {};
	if (meetingPlaceModificationRequest !== undefined) {
		const { latitude, longitude, meetingAddress } =
			meetingPlaceModificationRequest;
		meetingPlace = { latitude, longitude, meetingAddress };
	} else {
		const { latitude, longitude, meetingAddress } = meetingPlaceCreationRequest;
		meetingPlace = { latitude, longitude, meetingAddress };
	}
	const getSelectedActivity = (newSelectedActivity) => {
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			activityCategory: newSelectedActivity, // 덮어쓰기
		};
		setForm(nextForm);
	};
	const getMeetingPlace = (newLatitude, newLongitude, newMeetingAddress) => {
		if (meetingPlaceModificationRequest !== undefined) {
			const nextForm = {
				...form, // 기존값 복사 (spread operator)// 덮어쓰기
				meetingPlaceModificationRequest: {
					latitude: newLatitude,
					longitude: newLongitude,
					meetingAddress: newMeetingAddress,
				},
			};
			setForm(nextForm);
		} else {
			const nextForm = {
				...form, // 기존값 복사 (spread operator)// 덮어쓰기
				meetingPlaceCreationRequest: {
					latitude: newLatitude,
					longitude: newLongitude,
					meetingAddress: newMeetingAddress,
				},
			};
			setForm(nextForm);
		}
	};
	const getSelectedDate = (newSelectedDate) => {
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			startingDate: newSelectedDate, // 덮어쓰기
		};
		setForm(nextForm);
	};

	const getHtmlContentBody = (newContentBody) => {
		if (
			newContentBody === '<p><br></p>' ||
			newContentBody.replace(/(<([^>]+)>)/gi, '').replace(/\s/g, '') === ''
		) {
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
		if (e.target.value.replace(/ /g, '') === '') e.target.value = '';
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			[e.target.name]: e.target.value, // 덮어쓰기
		};
		setForm(nextForm);
	};

	return (
		<WriteWrapper>
			<P>
				<NumDiv>
					<span>1</span>
				</NumDiv>
			활동 종류와 시작 예정일을 입력해주세요.
			</P>
			<HR />
			<div className='selectBoxWrap'>
				<div className='selectBox activitySelectBox'>
					<Label htmlFor='activityCategory'>모집 구분</Label>
					<CustomSelectActivity
						name='activityCategory'
						value={activityCategory}
						getSelectedActivity={getSelectedActivity}
					/>
				</div>
				<div className='selectBox'>
					<Label htmlFor='startingDate'>시작 예정일</Label>
					<CustomSelectDate
						name='startingDate'
						value={startingDate}
						getSelectedDate={getSelectedDate}
					/>
				</div>
			</div>
			<P>
				<NumDiv>
					<span>2</span>
				</NumDiv>
				활동 시 만날 위치를 지정해주세요.
			</P>
			<HR />
			<Label htmlFor='title'>위치 검색</Label>
			<Map getMeetingPlace={getMeetingPlace} meetingPlace={meetingPlace} />
			<P>
				<NumDiv>
					<span>3</span>
				</NumDiv>
				진행할 플로깅 활동에 대해 설명해주세요.
			</P>
			<HR />
			<Label htmlFor='title'>제목</Label>
			<Title value={title} onChange={onChange}></Title>
			<EditorComponent
				name='contentBody'
				value={contentBody}
				getHtmlContentBody={getHtmlContentBody}
				placeholder={'진행할 플로깅 활동에 대해 자유롭게 설명해주세요!'}
			/>
			<ButtonWrap isLoading={isLoading}>
				<div className='loading' />
				<Button
					name='cancel'
					onClick={() => {
						if (window.confirm('작성을 취소하고 페이지를 벗어나시겠습니까?')) {
							navigate(-1);
						}
					}}>
					취소
				</Button>
				<Button
					onClick={() => {
						if (!boardIdToEdit) writeRecruitment(form, navigate, setIsLoading);
						else EditRecruitment(boardIdToEdit, form, navigate, setIsLoading);
					}}
					name='write'>
					{!boardIdToEdit ? '글 등록' : '수정하기'}
				</Button>
			</ButtonWrap>
		</WriteWrapper>
	);
};

export default WriteForm;
