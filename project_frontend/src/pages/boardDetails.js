import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { WriteWrapper, Header, Profile } from '../components';
import { HR } from '../components/write/writeFormComponents';
import { BsArrowLeft } from 'react-icons/bs';
import styled from 'styled-components';

const TitleDiv = styled.div`
	font-family: 'NanumSquareNeo';
	font-style: normal;
	font-weight: 900;
	font-size: 40px;
	line-height: 135%;
`;
const ContentDiv = styled.div`
	font-weight: 600;
	font-style: normal;
	font-size: 18px;
	line-height: 160%;
	letter-spacing: 0.7px;
`;
const ProfileDiv = styled(Profile)`
	width: 68px;
	height: 68px;
`;
const BoardWrapper = styled(WriteWrapper)`
	margin: 45px auto;
`;

const board = {
	'boardId': 1,
	'title': 'asdasdddwioqjdsdddadsssssssssssssssssdaewwwwwwwwwwwwwwoq',
	'content':
		'<p>asdasdddwioqjdsdddoqasdasdddwioqjdsdddoqasdasdddwioqjdsdddoqasdasdddwioqjdsdddoqasdasdddwioqjdsdddoqasdasdddwioqjdsdddoqasdasdddwioqjdsdddoqasdasdddwioqjdsdddoqasdasdddwioqjdsdddoqasdasdddwioqjdsdddoqasdasdddwioqjdsdddoqasdasdddwioqjdsdddoq</p>',
	'creatingDatetime': '2023-04-02T22:28:16.951634',
	'writerAlias': '최지환',
	'startingDate': '2023-04-19',
	'region': '동작구',
	'activityCategory': '산책',
	'onRecruitment': true,
	'firstFourLettersOfEmail': 'cjh8',
	'mine': true,
};
function BoardDetails() {
	const navigate = useNavigate();
	const [boardDetails, setBoardDetails] = useState('');
	let params = useParams();
	// axios
	// 	.get(`/api/boards/${params.boardId}`)
	// 	.then((res) => {
	// 		console.log(res.data);
	// 		setBoardDetails(res.data);
	// 		console.log(boardDetails);
	// 	})
	// 	.catch((error) => {
	// 		alert(`해당하는 글이 존재하지 않습니다.`);
	// 		console.log(error);
	// 		// navigate('/');
	// 	});
	const getBoardDetails = (details) => {
		setBoardDetails(details);
		console.log(boardDetails);
	};
	useEffect(() => {
		getBoardDetails(board);
		console.log(boardDetails);
	}, [boardDetails]);
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
				<TitleDiv>{boardDetails.title}</TitleDiv>
				<ProfileDiv />
				<div>
					{boardDetails.writerAlias} | {boardDetails.firstFourLettersOfEmail}
				</div>
				<HR></HR>
				<ContentDiv>
					<div dangerouslySetInnerHTML={{ __html: boardDetails.content }} />
				</ContentDiv>
			</BoardWrapper>
		</>
	);
}
export default BoardDetails;
