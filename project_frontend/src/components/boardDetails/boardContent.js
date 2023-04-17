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
	var newDateString = year + parseString + month + parseString + day;
	return newDateString;
};

const BoardContent = () => {
	const navigate = useNavigate();
	const [boardDetails, setBoardDetails] = useState('');
	let params = useParams();
	useEffect(() => {
		axios
			.get(`/api/boards/recruitment/${params.boardId}`)
			.then((res) => {
				console.log(res.data);
				setBoardDetails(res.data);
			})
			.catch((error) => {
				alert('잘못된 접근입니다.');
				console.log(error);
				navigate('/');
			});
	}, []);

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
						style={{ margin: '3rem 1rem', cursor: 'pointer', fontSize: '5rem' }}
						onClick={() => navigate(-1)}
					/>
					<HeadingDiv fontSize="4rem">{boardDetails.title}</HeadingDiv>
					<WriterDiv>
						<WriterProfilePicDiv
							size="6rem"
							margin="2rem 2rem 2rem 0"
							src={boardDetails.writerProfileImageUrl}
						/>
						<div>
							{boardDetails.writerAlias}({boardDetails.firstFourLettersOfEmail}
							****)
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
							<textarea />
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
