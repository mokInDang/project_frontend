import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HR } from '../write/writeFormComponents';
import { BsArrowLeft } from 'react-icons/bs';
import {
	BoardDetailsWrap,
	HeadingDiv,
	WriterDiv,
	WriterProfilePicDiv,
	VerticalBar,
	ContentDiv,
	BoardInfo,
	ReplyDiv,
	ReplyInput,
	ReplySubmitButton,
	ButtonsWrap,
	BoardContentButtonDiv,
} from './boardDetailsStyledComponents';
import { closeRecruitment, deleteRecruitment } from '../../apis';

const DateString = (dateString, parseString) => {
	let date = new Date(dateString);
	var year = date.getFullYear();
	var month = ('0' + (date.getMonth() + 1)).slice(-2);
	var day = ('0' + date.getDate()).slice(-2);
	var newDateString = year + parseString + month + parseString + day;
	return newDateString;
};

const BoardContent = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [boardDetails, setBoardDetails] = useState('');
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

	let items = ['활동 지역', '모집 구분', '시작 예정', '모집 상태'];
	let values = [
		boardDetails.region,
		boardDetails.activityCategory,
		DateString(boardDetails.startingDate, '.'),
		boardDetails.onRecruitment ? '모집 중' : '마감됨',
	];
	return (
		<>
			{boardDetails ? (
				<BoardDetailsWrap>
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
					{boardDetails.mine && (
						<ButtonsWrap boardDetails={boardDetails}>
							{/* boardDetails.onRecruitment 조회하여 마감 버튼 스타일할 것 */}
							{boardDetails.onRecruitment && (
								<>
									<BoardContentButtonDiv
										onClick={() => {
											closeRecruitment(boardDetails.boardId);
										}}>
										마감
									</BoardContentButtonDiv>
									<BoardContentButtonDiv
										onClick={() => {
											navigate(`/edit/recruitment/${boardDetails.boardId}`, {
												state: boardDetails,
											});
										}}>
										수정
									</BoardContentButtonDiv>
								</>
							)}
							<BoardContentButtonDiv
								onClick={() => {
									deleteRecruitment(boardDetails.boardId, navigate);
								}}>
								삭제
							</BoardContentButtonDiv>
						</ButtonsWrap>
					)}
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
						<div
							dangerouslySetInnerHTML={{ __html: boardDetails.contentBody }}
						/>
					</ContentDiv>
					{/* 댓글 API 연결 후 댓글 Div 컴포넌트로 분리할 것! */}
					<ReplyDiv>
						<HeadingDiv fontSize="2.5rem">0개의 댓글이 있습니다.</HeadingDiv>
						<ReplyInput>
							<textarea />
						</ReplyInput>
						<ReplySubmitButton>댓글 등록</ReplySubmitButton>
					</ReplyDiv>
				</BoardDetailsWrap>
			) : (
				<></>
			)}
		</>
	);
};
export { BoardContent };
