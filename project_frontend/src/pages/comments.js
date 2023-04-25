import { useState, useEffect, useRef } from 'react';
import {
	ReplyDiv,
	HeadingDiv,
	ReplyInput,
	ReplySubmitButton,
	WriterProfilePicDiv,
	HR,
	BoardContentButtonDiv,
} from '../components';
import axios from 'axios';
import styled from 'styled-components';

const CommentDiv = styled.div`
	font-style: normal;
	font-weight: 700;
	font-size: 2rem;
	margin: 1rem 0;
	padding: 1rem 0;
`;
const CommentBodyDiv = styled.div`
	margin: 2rem;
	line-height: 2.5rem;
	font-size: 2rem;
	font-weight: 700;
	flex-grow: 1;
	padding: 1rem;
	box-sizing: border-box;
`;
const ReplyBody = styled(CommentBodyDiv)`
	border: none;
	padding: 0;
	margin: 2rem 2rem 1rem 2rem;
`;

const CommentProfileDiv = styled.div`
	display: flex;
	align-items: center;

	position: relative;
`;
const CommentWriterDiv = styled.div`
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
`;

const CommentButtonsWrap = styled.div`
	position: absolute;
	display: flex;
	top: 0;
	right: 0;
	text-align: center;
	justify-content: end;
	justify-self: flex-end;
	font-size: 2rem;
	font-weight: 700;
	color: #000000b2;
	@media (max-width: 1024px) {
		right: 0rem;
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
	return (
		<CommentDiv>
			<CommentProfileDiv>
				<WriterProfilePicDiv
					size={'7rem'}
					margin={'0 1.5rem 0 0'}
					src={comment.writerProfileImageUrl}
				/>
				<CommentWriterDiv>
					<div className="writerAlias">
						{comment.writerAlias} ({comment.firstFourLettersOfEmail}
						****)
					</div>
					<div className="createdDatetime">
						{newDatetime(comment.createdDatetime)}
					</div>
				</CommentWriterDiv>
				<CommentButtonsWrap>
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
					<BoardContentButtonDiv>대댓글 작성</BoardContentButtonDiv>
				</CommentButtonsWrap>
			</CommentProfileDiv>
			<CommentBodyDiv>{comment.commentBody}</CommentBodyDiv>
			<HR style={{ marginBottom: 0 }}></HR>
			<ReplyComments reply={comment.multiReplyCommentSelectionResponse} />
		</CommentDiv>
	);
};

const ReplyComments = ({ reply }) => {
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
			<div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
				{replyComments &&
					replyComments.map((replyComment) => {
						return (
							<ReplyComment
								key={replyComment.replyCommentId}
								replyComment={replyComment}></ReplyComment>
						);
					})}
			</div>
		);
	}
};
const ReplyComment = ({ replyComment }) => {
	return (
		<ReplyCommentWrap>
			<LowLevel></LowLevel>
			<ReplyBodyWrap>
				<CommentProfileDiv>
					<WriterProfilePicDiv
						size={'7rem'}
						margin={'0 1.5rem 0 0'}
						src={replyComment.writerProfileImageUrl}
						style={{ border: 'none' }}
					/>
					<CommentWriterDiv>
						<div className="writerAlias">
							{replyComment.writerAlias} ({replyComment.firstFourLettersOfEmail}
							****)
						</div>
						<div className="createdDatetime">
							{newDatetime(replyComment.createdDatetime)}
						</div>
					</CommentWriterDiv>
					<CommentButtonsWrap>
						{replyComment.mine && (
							<BoardContentButtonDiv
								onClick={() => {
									if (window.confirm('댓글을 삭제하시겠습니까?')) {
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
const Comments = ({ boardType, boardId }) => {
	const [comments, setComments] = useState();
	const [commentBody, setCommentBody] = useState('');
	const [isLoading, setIsLoading] = useState(false);
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
				'commentBody': newCommentBody,
			})
			.then((res) => {
				setCommentBody('');
				getComments();
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
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
						'commentId': 0,
						'commentBody': '댓글 본문입니다.',
						'createdDatetime': '2023-04-24T05:24:34.066Z',
						'writerAlias': '음냠냐',
						'edited': false,
						'firstFourLettersOfEmail': 'pany',
						'writerProfileImageUrl': '',
						'mine': true,
						'multiReplyCommentSelectionResponse': {
							'replyComments': [
								{
									'replyCommentId': 0,
									'replyCommentBody':
										'댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.',
									'createdDatetime': '2023-04-25T15:44:57.335Z',
									'writerAlias': '작성자닉네임',
									'edited': true,
									'firstFourLettersOfEmail': 'string',
									'writerProfileImageUrl': '',
									'mine': true,
								},
								{
									'replyCommentId': 1,
									'replyCommentBody': '댓글 본문입니다.',
									'createdDatetime': '2023-04-25T15:44:57.335Z',
									'writerAlias': '작성자닉네임',
									'edited': true,
									'firstFourLettersOfEmail': 'string',
									'writerProfileImageUrl': '',
									'mine': true,
								},
							],
							'countOfReplyComments': 2,
						},
					},
					{
						'commentId': 1,
						'commentBody': '댓글 본문입니다.',
						'createdDatetime': '2023-04-25T05:24:34.066Z',
						'writerAlias': '으르렁',
						'edited': true,
						'firstFourLettersOfEmail': 'doko',
						'writerProfileImageUrl': '',
						'mine': false,
						'multiReplyCommentSelectionResponse': {
							'replyComments': [],
							'countOfReplyComments': 0,
						},
					},
					{
						'commentId': 2,
						'commentBody': '댓글 본문입니다.',
						'createdDatetime': '2023-04-25T05:24:34.066Z',
						'writerAlias': '똥개',
						'edited': true,
						'firstFourLettersOfEmail': 'doko',
						'writerProfileImageUrl': '',
						'mine': false,
						'multiReplyCommentSelectionResponse': {
							'replyComments': [],
							'countOfReplyComments': 0,
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
				<HeadingDiv fontSize="2.5rem">
					{comments ? comments.length : ''}개의 댓글이 있습니다.
				</HeadingDiv>
				<ReplyInput>
					<textarea
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
						<div key={comment.commentId}>
							<Comment
								comment={comment}
								getComments={getComments}
							/>
						</div>
					);
				})}
		</>
	);
};
export { Comments };
