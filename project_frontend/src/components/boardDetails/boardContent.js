import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HR } from '../write/writeFormComponents';
import { BsArrowLeft } from 'react-icons/bs';
import {
	BoardDetailsWrap,
	HeadingDiv,
	WriterDiv,
	VerticalBar,
	ContentDiv,
	BoardInfo,
	BoardContentButtonDiv,
	ButtonsWrap,
} from './boardDetailsStyledComponents';
import {
	getRecruitment,
	closeRecruitment,
	deleteRecruitment,
} from '../../apis';
import { GlobalProfile, BoardDetailsMap } from '../../components';
import { DateString } from '../../utils';
import { Comments } from '../../pages/comments';

const BoardContent = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [boardDetails, setBoardDetails] = useState('');
	const getBoardDetails = (value) => {
		setBoardDetails(value);
	};
	const [isOnRecruitment, setIsOnRecruitment] = useState(1);
	const getClosedDetails = () => {
		setIsOnRecruitment(0);
	};
	useEffect(() => {
		getRecruitment(params.boardId, getBoardDetails, navigate);
	}, [isOnRecruitment]);
	useEffect(() => {
		if (!isOnRecruitment) {
			const navigateBack = setTimeout(() => {
				alert('마감 처리가 완료되었습니다.');
				navigate(-1);
			}, 50);
			return () => clearTimeout(navigateBack);
		}
	}, [boardDetails]);

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
				<>
					<BoardDetailsWrap>
						<BsArrowLeft
							style={{
								margin: '3rem 1rem',
								cursor: 'pointer',
								fontSize: '5rem',
							}}
							onClick={() => navigate(-1)}
						/>
						<HeadingDiv fontSize='4rem'>{boardDetails.title}</HeadingDiv>
						<WriterDiv>
							<GlobalProfile
								size='6rem'
								margin='2rem 2rem 2rem 0'
								src={boardDetails.writerProfileImageUrl}
							/>
							<div>
								{boardDetails.writerAlias}(
								{boardDetails.firstFourLettersOfEmail}
								****)
							</div>
							<VerticalBar id='verticalbar' />
							<div className='startingDate'>
								{DateString(boardDetails.creatingDatetime, '.')}
							</div>
						</WriterDiv>
						<HR className='BoardInfoHR' />
						<div>
							<BoardInfo>
								{boardDetails.mine && (
									<ButtonsWrap
										boardDetails={boardDetails}
										className='ButtonsWrap'>
										{/* boardDetails.onRecruitment 조회하여 마감 버튼 스타일할 것 */}
										{boardDetails.onRecruitment === true && (
											<>
												<BoardContentButtonDiv
													onClick={() => {
														closeRecruitment(
															boardDetails.boardId,
															getClosedDetails
														);
													}}>
													마감
												</BoardContentButtonDiv>
												<BoardContentButtonDiv
													onClick={() => {
														navigate(
															`/edit/recruitment/${boardDetails.boardId}`,
															{
																state: boardDetails,
															}
														);
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
								{items.map((item, i) => {
									return (
										<div key={i} className='boardInfoLabel'>
											<div className='category'>{item}</div>
											<div>{values[i]}</div>
										</div>
									);
								})}
							</BoardInfo>
						</div>
						<HeadingDiv fontSize='2.9rem'>플로깅 위치</HeadingDiv>
						<HR style={{ marginTop: '2rem', marginBottom: '5rem' }} />
						<BoardDetailsMap
							meetingPlaceResponse={boardDetails.meetingPlaceResponse}
						/>
						<ContentDiv>
							<HeadingDiv fontSize='2.9rem'>플로깅 활동 소개</HeadingDiv>
							<HR style={{ marginTop: '2rem' }} />
							<div
								dangerouslySetInnerHTML={{ __html: boardDetails.contentBody }}
							/>
						</ContentDiv>
					</BoardDetailsWrap>
					<Comments boardType={'recruitment-board'} boardId={params.boardId} />
				</>
			) : (
				<></>
			)}
		</>
	);
};
export { BoardContent };
