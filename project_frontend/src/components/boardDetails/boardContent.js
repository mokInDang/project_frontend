import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HR } from '../write/writeFormComponents';
import { BsArrowLeft } from 'react-icons/bs';
import {
	HeadingDiv,
	WriterDiv,
	WriterProfilePicDiv,
	VerticalBar,
	ContentDiv,
	BoardInfo,
	ReplyDiv,
	ReplyInput,
	ReplySubmitButton,
} from './boardDetailsStyledComponents';

const DateString = (dateString, parseString) => {
	let date = new Date(dateString);
	var year = date.getFullYear();
	var month = ('0' + (date.getMonth() + 1)).slice(-2);
	var day = ('0' + date.getDate()).slice(-2);
	var dateString = year + parseString + month + parseString + day;
	return dateString;
};

const board = {
	'boardId': 1,
	'title': '니냐뇨',
	'content': '<p>니냐니냐뇨 </p>',
	'creatingDatetime': '2023-04-06T00:59:17.392482',
	'writerAlias': '수현',
	'startingDate': '2023-04-20',
	'region': '영등포구',
	'activityCategory': '달리기',
	'onRecruitment': true,
	'firstFourLettersOfEmail': 'pany',
	'mine': true,
};

const BoardContent = () => {
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

	// function getBoardDetails(board) {
	// 	setBoardDetails(board);
	// }
	// useEffect(() => {
	// 	getBoardDetails(board);
	// }, [boardDetails]);

	let items = ['활동 지역', '모집 구분', '시작 예정'];
	let values = [
		boardDetails.region,
		boardDetails.activityCategory,
		DateString(boardDetails.startingDate, '.'),
	];
	return (
		<>
			{boardDetails ? (
				<>
					<BsArrowLeft
						size={50}
						style={{ margin: '30px 10px', cursor: 'pointer' }}
						onClick={() => navigate(-1)}
					/>
					<HeadingDiv fontSize="4rem">{boardDetails.title}</HeadingDiv>
					<WriterDiv>
						<WriterProfilePicDiv size="6rem" />
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
					{/* 댓글 API 연결 후 댓글 Div 컴포넌트로 분리할 것! */}
					<ReplyDiv>
						<HeadingDiv fontSize="2.5rem">0개의 댓글이 있습니다.</HeadingDiv>
						<ReplyInput>
							<textarea></textarea>
						</ReplyInput>
						<ReplySubmitButton>댓글 등록</ReplySubmitButton>
					</ReplyDiv>
				</>
			) : (
				<></>
			)}
		</>
	);
};
export { BoardContent };
