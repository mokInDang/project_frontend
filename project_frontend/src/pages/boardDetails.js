import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components';
import { HR } from '../components/write/writeFormComponents';
import { BsArrowLeft } from 'react-icons/bs';
import styled from 'styled-components';
import {
	BoardWrapper,
	HeadingDiv,
	WriterDiv,
	WriterProfilePicDiv,
	VerticalBar,
	ContentDiv,
	BoardInfo,
	ReplyInput,
} from '../components';

const DateString = (dateString, parseString) => {
	let date = new Date(dateString);
	var year = date.getFullYear();
	var month = ('0' + (date.getMonth() + 1)).slice(-2);
	var day = ('0' + date.getDate()).slice(-2);
	var dateString = year + parseString + month + parseString + day;
	return dateString;
};
function BoardDetails() {
	const navigate = useNavigate();
	const [boardDetails, setBoardDetails] = useState('');
	let params = useParams();
	axios
		.get(`/api/boards/${params.boardId}`)
		.then((res) => {
			console.log(res.data);
			setBoardDetails(res.data);
		})
		.catch((error) => {
			alert(`해당하는 글이 존재하지 않습니다.`);
			console.log(`해당하는 글이 존재하지 않습니다.`);
			console.log(error);
			navigate('/');
		});

	let items = ['활동 지역', '모집 구분', '시작 예정'];
	let values = [
		boardDetails.region,
		boardDetails.activityCategory,
		DateString(boardDetails.startingDate, '.'),
	];
	return (
		<>
			<Header />
			{/* 상세글 받아오지 못했을 시 표시되지 않도록 조건문 넣을 것 */}
			<BoardWrapper>
				<BsArrowLeft
					size={50}
					style={{ margin: '30px 10px', cursor: 'pointer' }}
					onClick={() => navigate(-1)}
				/>
				<HeadingDiv fontSize="4rem">{boardDetails.title}</HeadingDiv>
				<WriterDiv>
					<WriterProfilePicDiv />
					<div>
						{boardDetails.writerAlias}({boardDetails.firstFourLettersOfEmail})
					</div>
					<VerticalBar id="verticalbar" />
					<div className="startingDate">
						{DateString(boardDetails.creatingDatetime, '.')}
					</div>
				</WriterDiv>
				<HR />
				<BoardInfo>
					{items.map((item, i) => {
						return (
							<div key={i}>
								<div className="category">{item}</div>
								<div>{values[i]}</div>
							</div>
						);
					})}
				</BoardInfo>
				<ContentDiv>
					<HeadingDiv fontSize="2.9rem">프로젝트 소개</HeadingDiv>
					<HR />
					<div dangerouslySetInnerHTML={{ __html: boardDetails.content }} />
				</ContentDiv>
				<ContentDiv>
					<HeadingDiv fontSize="2.5rem">0개의 댓글이 있습니다.</HeadingDiv>
					<ReplyInput>
						<textarea></textarea>
					</ReplyInput>
					<div className="submitReply">댓글 등록</div>
				</ContentDiv>
			</BoardWrapper>
		</>
	);
}
export default BoardDetails;
