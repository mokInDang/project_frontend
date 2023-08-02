import { useState, useEffect, useRef } from 'react';
import {
	ReplyDiv,
	HeadingDiv,
	ReplyInput,
	ReplySubmitButton,
	GlobalProfile,
	HR,
	BoardContentButtonDiv,
	ButtonWrap,
	Button,
} from '../components';
import axios from 'axios';
import styled from 'styled-components';

const CommentDiv = styled.div`
	font-style: normal;
	font-weight: 700;
	font-size: 2rem;
`;
const CommentWrap = styled.div`
	padding-top: 2rem;
`;
const CommentBodyDiv = styled.div`
	margin: 1.5rem 2rem 0 2rem;
	line-height: 2.5rem;
	font-size: 2rem;
	font-weight: 700;
	flex-grow: 1;
	padding: 1rem;
	box-sizing: border-box;
`;
const CommentProfileDiv = styled.div`
	display: flex;
	align-items: center;
	position: relative;
`;
const CommentWriterDiv = styled.div`
	word-break: keep-all;
	.writerAlias {
		font-family: 'NanumSquareNeo';
		font-weight: 900;
		font-size: 2rem;
		margin-bottom: 0.8rem;
		justify-content: flex-end;
	}
	.createdDatetime {
		font-weight: 700;
		font-size: 1.8rem;
		color: rgba(105, 104, 104, 0.5);
		letter-spacing: 0.06rem;
		display: flex;
	}
	font-style: normal;
	font-weight: 700;
	font-size: 2rem;
	line-height: 2.2rem;
	@media (max-width: 600px) {
	}
`;
const CommentButtonsWrap = styled.div`
	flex-grow: 1;
	flex-wrap: wrap;
	display: flex;
	text-align: center;
	justify-content: end;
	justify-self: flex-end;
	align-self: flex-start;
	align-items: baseline;
	font-size: 2rem;
	font-weight: 700;
	color: #000000b2;
	@media (max-width: 300px) {
		font-size: 1.8rem;
	}
`;
const LowLevel = styled.div`
	border-left: 2px solid rgba(153, 153, 153, 0.4);
	border-bottom: 2px solid rgba(153, 153, 153, 0.4);
	width: 2rem;
	height: 2rem;
	margin: 1rem;
	flex-shrink: 0;
`;
const ReplyBodyWrap = styled.div`
	background-color: rgba(217, 217, 217, 0.28);
	flex-grow: 1;
	border-radius: 3rem;
	align-items: center;
	padding: 1.5rem;
`;
const ReplyCommentWrap = styled.div`
	display: flex;
	margin-top: 2rem;
`;
const ReplyBody = styled(CommentBodyDiv)`
	border: none;
	padding: 0;
	margin: 1.5rem 1.5rem 0.5rem 1.5rem;
`;

function newDatetime(Datetime) {
	let datetime = new Date(Datetime);
	let newDate = datetime.toLocaleString();
	let newTime =
		datetime.getHours() +
		':' +
		datetime.getMinutes() +
		':' +
		datetime.getMinutes();
	return newDate;
}
const Comment = ({ comment, getComments, writingCommentPermission }) => {
	const replyRef = useRef();
	const [toWriteReply, setToWriteReply] = useState(false);
	const [replyCommentBody, setReplyCommentBody] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const getReplyCommentBody = (e) => {
		if (
			e.target.value.replace(/ /g, '') === '' ||
			e.target.value.replace(/\n/g, '') === ''
		)
			e.target.value = '';
		setReplyCommentBody(e.target.value);
	};
	const onEnterDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			postReplyComment();
		}
	};
	const deleteComment = () => {
		axios
			.delete(`/api/comments/${comment.commentId}`)
			.then(() => {
				getComments();
			})
			.catch((error) => {
				console.log(error);
				alert('댓글 삭제에 실패했습니다.');
			});
	};
	const onMoveToReplyCommentInput = () => {
		if (replyRef.current) {
			replyRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	};
	const postReplyComment = () => {
		var newReplyCommentBody = replyCommentBody.trim();
		if (newReplyCommentBody === '') {
			alert('댓글 본문을 입력해주세요.');
			return;
		}
		setIsLoading(true);
		axios
			.post(`/api/comments/${comment.commentId}/reply-comment`, {
				replyCommentBody: newReplyCommentBody,
			})
			.then(() => {
				setReplyCommentBody('');
				getComments();
				setIsLoading(false);
				setToWriteReply(false);
			})
			.catch((error) => {
				console.log(error);
				alert('대댓글 작성에 실패했습니다.');
				setIsLoading(false);
			});
	};
	useEffect(() => {
		if (toWriteReply) {
			onMoveToReplyCommentInput();
		}
	}, [toWriteReply]);
	return (
		<CommentDiv>
			<CommentWrap>
				<CommentProfileDiv>
					<GlobalProfile
						size={'7rem'}
						margin={'0 1.5rem 0 0'}
						src={comment.writerProfileImageUrl}
					/>
					<CommentWriterDiv>
						<div className='writerAlias'>
							{comment.writerAlias}({comment.firstFourLettersOfEmail}
							****)
						</div>
						<div className='createdDatetime'>
							{newDatetime(comment.createdDatetime)}
						</div>
					</CommentWriterDiv>
					<CommentButtonsWrap>
						{!toWriteReply && writingCommentPermission && (
							<BoardContentButtonDiv
								onClick={() => {
									setToWriteReply(true);
								}}>
								대댓글 작성
							</BoardContentButtonDiv>
						)}
						{comment.mine && (
							<BoardContentButtonDiv
								onClick={() => {
									if (window.confirm('댓글을 삭제하시겠습니까?')) {
										deleteComment();
									}
								}}>
								삭제
							</BoardContentButtonDiv>
						)}
					</CommentButtonsWrap>
				</CommentProfileDiv>
				<CommentBodyDiv>{comment.commentBody}</CommentBodyDiv>
			</CommentWrap>
			<HR style={{ marginBottom: 0 }}></HR>
			<ReplyComments
				reply={comment.multiReplyCommentSelectionResponse}
				getComments={getComments}
			/>
			{toWriteReply && (
				<div ref={replyRef}>
					<ReplyCommentWrap>
						<LowLevel></LowLevel>
						<ReplyInput>
							<textarea
								value={replyCommentBody}
								onChange={getReplyCommentBody}
								maxLength={250}
								// onKeyDown={onEnterDown}
							/>
						</ReplyInput>
					</ReplyCommentWrap>
					<ButtonWrap style={{ marginTop: 0 }} isLoading={isLoading}>
						<div className='loading'></div>
						<Button
							name='cancel'
							onClick={() => {
								setToWriteReply(false);
							}}>
							취소
						</Button>
						<Button
							onClick={() => {
								postReplyComment();
							}}>
							대댓글 작성
						</Button>
					</ButtonWrap>
				</div>
			)}
			{comment.multiReplyCommentSelectionResponse.countOfReplyComments !==
				0 && <HR style={{ marginBottom: 0, marginTop: '2rem' }}></HR>}
		</CommentDiv>
	);
};

const ReplyComments = ({ reply, getComments }) => {
	const [replyComments, setReplyComments] = useState([]);
	useEffect(() => {
		if (reply) {
			setReplyComments(reply.replyComments);
			// console.log(replyComments);
		}
	});
	if (replyComments === []) return <></>;
	else {
		return (
			<>
				{replyComments.map((replyComment) => {
					return (
						<ReplyComment
							getComments={getComments}
							key={replyComment.replyCommentId}
							replyComment={replyComment}></ReplyComment>
					);
				})}
			</>
		);
	}
};
const ReplyComment = ({ replyComment, getComments }) => {
	const deleteReplyComment = () => {
		axios
			.delete(`/api/comments/reply-comments/${replyComment.replyCommentId}`)
			.then(() => {
				getComments();
			})
			.catch((error) => {
				console.log(error);
				alert('대댓글 삭제에 실패했습니다.');
			});
	};
	return (
		<ReplyCommentWrap>
			<LowLevel></LowLevel>
			<ReplyBodyWrap>
				<CommentProfileDiv>
					<GlobalProfile
						size={'7rem'}
						margin={'0 1.5rem 0 0'}
						src={replyComment.writerProfileImageUrl}
						style={{ border: 'none' }}
					/>
					<CommentWriterDiv>
						<div className='writerAlias'>
							{replyComment.writerAlias}({replyComment.firstFourLettersOfEmail}
							****)
						</div>
						<div className='createdDatetime'>
							{newDatetime(replyComment.createdDatetime)}
						</div>
					</CommentWriterDiv>
					<CommentButtonsWrap>
						{replyComment.mine && (
							<BoardContentButtonDiv
								onClick={() => {
									if (window.confirm('대댓글을 삭제하시겠습니까?')) {
										deleteReplyComment();
									}
								}}>
								삭제
							</BoardContentButtonDiv>
						)}
					</CommentButtonsWrap>
				</CommentProfileDiv>
				<ReplyBody>{replyComment.replyCommentBody}</ReplyBody>
			</ReplyBodyWrap>
		</ReplyCommentWrap>
	);
};

const Comments = ({ boardType, boardId }) => {
	const [comments, setComments] = useState();
	const [countOfComments, setCountOfComments] = useState();
	const [commentBody, setCommentBody] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isInit, setIsInit] = useState(true);
	const [writingCommentPermission, setWritingCommentPermission] =
		useState(true);

	const onEnterDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			postComment();
		}
	};

	const getCommentBody = (e) => {
		if (
			e.target.value.replace(/ /g, '') === '' ||
			e.target.value.replace(/\n/g, '') === ''
		)
			e.target.value = '';
		setCommentBody(e.target.value);
	};
	const postComment = () => {
		var newCommentBody = commentBody.trim();
		if (newCommentBody === '') {
			alert('댓글 본문을 입력해주세요.');
			return;
		}
		setIsLoading(true);
		axios
			.post(`/api/${boardType}/${boardId}/comments`, {
				commentBody: newCommentBody,
			})
			.then(() => {
				setCommentBody('');
				if (isInit) setIsInit(false);
				getComments();
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
				alert('댓글 작성에 실패했습니다.');
				setIsLoading(false);
			});
	};
	const getComments = () => {
		axios
			.get(`/api/${boardType}/${boardId}/comments`)
			.then((res) => {
				const commentData = res.data;
				setComments(commentData.comments);
				setCountOfComments(commentData.countOfCommentAndReplyComment);
				setWritingCommentPermission(commentData.writingCommentPermission);
			})
			.catch((error) => {
				console.log(error);
				// const commentData = {
				// 	'comments': [
				// 		{
				// 			'commentId': 21,
				// 			'commentBody': '좋은 냄새는 어떤 냄새인가요 재원님?',
				// 			'createdDatetime': '2023-04-27T10:20:48.034221',
				// 			'writerAlias': '미노',
				// 			'edited': false,
				// 			'firstFourLettersOfEmail': 'koho',
				// 			'writerProfileImageUrl':
				// 				'https://dognejupging-xyz-image-bucket.s3.ap-northeast-2.amazonaws.com/profile_image/bc816516-752b-4fd6-9017-99f988206ba8.jpg',
				// 			'mine': false,
				// 			'multiReplyCommentSelectionResponse': {
				// 				'replyComments': [],
				// 				'countOfReplyComments': 0,
				// 			},
				// 		},
				// 		{
				// 			'commentId': 28,
				// 			'commentBody':
				// 				'냄새 날 것 같아서 같이 못 할 것 같으면 어떻게 하나요???',
				// 			'createdDatetime': '2023-04-28T13:38:16.596166',
				// 			'writerAlias': '5테가위손',
				// 			'edited': false,
				// 			'firstFourLettersOfEmail': 'dbsw',
				// 			'writerProfileImageUrl':
				// 				'https://dognejupging-xyz-image-bucket.s3.ap-northeast-2.amazonaws.com/profile_image/deae020d-132a-4524-80a0-a42fd553bc9f.jpeg',
				// 			'mine': false,
				// 			'multiReplyCommentSelectionResponse': {
				// 				'replyComments': [
				// 					{
				// 						'replyCommentId': 16,
				// 						'replyCommentBody': '나는 바보입니다 ㅋㅋ',
				// 						'createdDatetime': '2023-04-28T13:48:49.411139',
				// 						'writerAlias': '5테가위손',
				// 						'edited': false,
				// 						'firstFourLettersOfEmail': 'dbsw',
				// 						'writerProfileImageUrl':
				// 							'https://dognejupging-xyz-image-bucket.s3.ap-northeast-2.amazonaws.com/profile_image/deae020d-132a-4524-80a0-a42fd553bc9f.jpeg',
				// 						'mine': false,
				// 					},
				// 					{
				// 						'replyCommentId': 17,
				// 						'replyCommentBody': '나는 멍청이~~',
				// 						'createdDatetime': '2023-04-28T13:49:02.038094',
				// 						'writerAlias': '5테가위손',
				// 						'edited': false,
				// 						'firstFourLettersOfEmail': 'dbsw',
				// 						'writerProfileImageUrl':
				// 							'https://dognejupging-xyz-image-bucket.s3.ap-northeast-2.amazonaws.com/profile_image/deae020d-132a-4524-80a0-a42fd553bc9f.jpeg',
				// 						'mine': false,
				// 					},
				// 				],
				// 				'countOfReplyComments': 2,
				// 			},
				// 		},
				// 		{
				// 			'commentId': 42,
				// 			'commentBody': '같이 플로깅 합시다!',
				// 			'createdDatetime': '2023-05-21T22:10:12.267799',
				// 			'writerAlias': '최지환',
				// 			'edited': false,
				// 			'firstFourLettersOfEmail': 'cjh8',
				// 			'writerProfileImageUrl':
				// 				'https://dognejupging-xyz-image-bucket.s3.ap-northeast-2.amazonaws.com/profile_image/33a8dabe-90a7-482a-850e-6ac2920929fa.PNG',
				// 			'mine': false,
				// 			'multiReplyCommentSelectionResponse': {
				// 				'replyComments': [],
				// 				'countOfReplyComments': 0,
				// 			},
				// 		},
				// 		{
				// 			'commentId': 45,
				// 			'commentBody': '저도 참여하고 싶습니다!',
				// 			'createdDatetime': '2023-05-21T22:21:44.098118',
				// 			'writerAlias': '미노',
				// 			'edited': false,
				// 			'firstFourLettersOfEmail': 'koho',
				// 			'writerProfileImageUrl':
				// 				'https://dognejupging-xyz-image-bucket.s3.ap-northeast-2.amazonaws.com/profile_image/bc816516-752b-4fd6-9017-99f988206ba8.jpg',
				// 			'mine': false,
				// 			'multiReplyCommentSelectionResponse': {
				// 				'replyComments': [],
				// 				'countOfReplyComments': 0,
				// 			},
				// 		},
				// 	],
				// 	'countOfCommentAndReplyComment': 3,
				// };
				// setComments(commentData.comments);
				// setCountOfComments(commentData.countOfCommentAndReplyComment);
			});
	};

	useEffect(() => {
		getComments();
	}, []);

	useEffect(() => {
		if (isInit) return;
		// {
		// let currentHeight = 0;
		// var onMoveToLastComment = setInterval(function () {
		// 	let pageBottom = document.body.scrollHeight;
		// 	if (currentHeight < pageBottom) {
		// 		window.scroll({ behavior: 'smooth', top: pageBottom });
		// 		currentHeight = pageBottom;
		// 	} else {
		// 		clearInterval(onMoveToLastComment);
		// 	}
		// }, 100);
		// }

		const timer = setTimeout(() => {
			window.scroll({
				behavior: 'smooth',
				top: document.documentElement.scrollHeight,
			});
		}, 50);
		return () => clearTimeout(timer);
	}, [comments]);

	return (
		<>
			{comments && (
				<>
					<ReplyDiv>
						<HeadingDiv fontSize='2.5rem'>
							{countOfComments}개의 댓글이 있습니다.
						</HeadingDiv>
						<ReplyInput writingCommentPermission={writingCommentPermission}>
							<textarea
								maxLength={250}
								value={commentBody}
								onChange={getCommentBody}
								// onKeyDown={onEnterDown}
								placeholder={
									writingCommentPermission
										? '댓글을 작성해보세요.'
										: '타 지역의 모집 게시글에는 댓글을 달 수 없습니다.'
								}
								disabled={!writingCommentPermission}
							/>
						</ReplyInput>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<>
								{isLoading && (
									<div
										style={{
											position: 'absolute',
											backgroundColor: 'rgba(255,255,255,0.8)',
											opacity: '0.8',
											width: '10rem',
											height: '3.4rem',
											right: '0',
											borderRadius: '1.45rem',
										}}></div>
								)}
								<ReplySubmitButton
									writingCommentPermission={writingCommentPermission}
									onClick={writingCommentPermission ? postComment : () => {}}>
									댓글 등록
								</ReplySubmitButton>
							</>
						</div>
					</ReplyDiv>
					{comments.map((comment) => {
						return (
							<Comment
								key={comment.commentId}
								comment={comment}
								getComments={getComments}
								writingCommentPermission={writingCommentPermission}
							/>
						);
					})}
				</>
			)}
		</>
	);
};
export { Comments };
