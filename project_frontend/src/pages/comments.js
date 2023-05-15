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
	@media (max-width: 600px) {
		flex-shrink: 1;
		text-align: right;
		align-items: stretch;
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
const Comment = ({ comment, getComments }) => {
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
		replyRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
	return (
		<CommentDiv ref={replyRef}>
			<CommentWrap>
				<CommentProfileDiv>
					<GlobalProfile
						size={'7rem'}
						margin={'0 1.5rem 0 0'}
						src={comment.writerProfileImageUrl}
					/>
					<CommentWriterDiv>
						<div className='writerAlias'>
							{comment.writerAlias} ({comment.firstFourLettersOfEmail}
							****)
						</div>
						<div className='createdDatetime'>
							{newDatetime(comment.createdDatetime)}
						</div>
					</CommentWriterDiv>
					<CommentButtonsWrap>
						<BoardContentButtonDiv
							onClick={() => {
								setToWriteReply(true);
								onMoveToReplyCommentInput();
							}}>
							대댓글 작성
						</BoardContentButtonDiv>
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
				<div>
					<ReplyCommentWrap>
						<LowLevel></LowLevel>
						<ReplyInput>
							<textarea
								value={replyCommentBody}
								onChange={getReplyCommentBody}
								maxLength={250}
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
			<div ref={replyRef}></div>
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
							{replyComment.writerAlias} ({replyComment.firstFourLettersOfEmail}
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
	const commentRef = useRef();
	const [comments, setComments] = useState();
	const [commentBody, setCommentBody] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const onMoveToLastComment = () => {
		commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
				getComments();
				setIsLoading(false);
				onMoveToLastComment();
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
			.then((res) => setComments(res.data.comments))
			.catch((error) => {
				console.log(error);
				setComments([
					{
						commentId: 0,
						commentBody: '댓글 본문입니다.',
						createdDatetime: '2023-04-24T05:24:34.066Z',
						writerAlias: '음냠냐',
						edited: false,
						firstFourLettersOfEmail: 'pany',
						writerProfileImageUrl: '',
						mine: true,
						multiReplyCommentSelectionResponse: {
							replyComments: [
								{
									replyCommentId: 0,
									replyCommentBody: '댓글 본문입니다.',
									createdDatetime: '2023-04-25T15:44:57.335Z',
									writerAlias: '작성자닉네임',
									edited: true,
									firstFourLettersOfEmail: 'stri',
									writerProfileImageUrl: '',
									mine: true,
								},
								{
									replyCommentId: 1,
									replyCommentBody: '댓글 본문입니다.',
									createdDatetime: '2023-04-25T15:44:57.335Z',
									writerAlias: '작성자닉네임',
									edited: true,
									firstFourLettersOfEmail: 'stri',
									writerProfileImageUrl: '',
									mine: true,
								},
							],
							countOfReplyComments: 2,
						},
					},
					{
						commentId: 1,
						commentBody: '댓글 본문입니다.',
						createdDatetime: '2023-04-25T05:24:34.066Z',
						writerAlias: '으르렁',
						edited: true,
						firstFourLettersOfEmail: 'doko',
						writerProfileImageUrl: '',
						mine: false,
						multiReplyCommentSelectionResponse: {
							replyComments: [],
							countOfReplyComments: 0,
						},
					},
					{
						commentId: 2,
						commentBody: '댓글 본문입니다.',
						createdDatetime: '2023-04-25T05:24:34.066Z',
						writerAlias: '똥개',
						edited: true,
						firstFourLettersOfEmail: 'doko',
						writerProfileImageUrl: '',
						mine: false,
						multiReplyCommentSelectionResponse: {
							replyComments: [],
							countOfReplyComments: 0,
						},
					},
				]);
			});
	};

	useEffect(() => {
		getComments();
	}, []);

	return (
		<>
			<ReplyDiv>
				<HeadingDiv fontSize='2.5rem'>
					{comments ? comments.length : ''}개의 댓글이 있습니다.
				</HeadingDiv>
				<ReplyInput>
					<textarea
						maxLength={250}
						value={commentBody}
						onChange={getCommentBody}
					/>
				</ReplyInput>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{isLoading && (
						<div
							style={{
								position: 'absolute',
								backgroundColor: 'white',
								opacity: '0.8',
								width: '10rem',
								height: '3.4rem',
								right: '0',
								borderRadius: '1.45rem',
							}}></div>
					)}
					<ReplySubmitButton onClick={postComment}>댓글 등록</ReplySubmitButton>
				</div>
			</ReplyDiv>
			{comments &&
				comments.map((comment) => {
					return (
						<Comment
							key={comment.commentId}
							comment={comment}
							getComments={getComments}
						/>
					);
				})}
			<div ref={commentRef}></div>
		</>
	);
};
export { Comments };
