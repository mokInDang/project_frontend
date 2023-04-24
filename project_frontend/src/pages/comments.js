import { useState, useEffect } from 'react';
import {
	ReplyDiv,
	HeadingDiv,
	ReplyInput,
	ReplySubmitButton,
	WriterProfilePicDiv,
	HR,
} from '../components';
import axios from 'axios';
import styled from 'styled-components';

const CommentDiv = styled.div`
	font-style: normal;
	font-weight: 700;
	font-size: 2rem;
	margin: 2rem 0;
`;
const CommentBodyDiv = styled.div`
	margin: 2rem;
	line-height: 2.5rem;
`;
const CommentProfileDiv = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 2rem;
`;
const CommentWriterDiv = styled.div`
	.writerAlias {
		font-family: 'NanumSquareNeo';
		font-weight: 900;
		font-size: 2rem;
		margin-bottom: 0.8rem;
	}
	.createdDatetime {
		font-weight: 700;
		font-size: 1.8rem;
		color: rgba(105, 104, 104, 0.5);
		letter-spacing: 0.06rem;
	}
	font-style: normal;
	font-weight: 700;
	font-size: 20px;
	line-height: 22px;
`;
const Comment = ({ comment }) => {
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
	return (
		<CommentDiv>
			<CommentProfileDiv>
				<WriterProfilePicDiv
					size={'7rem'}
					margin={'0 1.5rem 0 0'}
				/>
				<CommentWriterDiv>
					<div className="writerAlias">
						{comment.writerAlias} ({comment.firstFourLettersOfEmail}
						****)
					</div>
					<div className="createdDatetime">
						{newDatetime(comment.createdDatetime)}
						{comment.edited ? ' (수정됨)' : ''}
					</div>
				</CommentWriterDiv>
			</CommentProfileDiv>
			<CommentBodyDiv>{comment.commentBody}</CommentBodyDiv>
		</CommentDiv>
	);
};

const Comments = ({ boardType, boardId }) => {
	const [comments, setComments] = useState();
	const [commentBody, setCommentBody] = useState();
	const getCommentBody = (e) => {
		setCommentBody(e.target.value);
	};
	const postComment = () => {
		axios
			.post(`/api/${boardType}/${boardId}/comments`, {
				'commentBody': commentBody,
			})
			.then(() => {
				getComment();
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const getComment = () => {
		axios
			.get(`/api/${boardType}/${boardId}/comments`)
			.then((res) => setComments(res.data.comments))
			.catch((error) => {
				console.log(error);
				setComments([
					{
						'commentId': 0,
						'commentBody':
							'댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.댓글 본문입니다.',
						'createdDatetime': '2023-04-24T05:24:34.066Z',
						'writerAlias': '음냠냐',
						'edited': false,
						'firstFourLettersOfEmail': 'pany',
						'writerProfileImageUrl': 'string',
						'mine': true,
					},
					{
						'commentId': 1,
						'commentBody': '댓글 본문입니다.',
						'createdDatetime': '2023-04-25T05:24:34.066Z',
						'writerAlias': '으르렁',
						'edited': true,
						'firstFourLettersOfEmail': 'doko',
						'writerProfileImageUrl': 'string',
						'mine': false,
					},
				]);
			});
	};

	useEffect(() => {
		getComment();
	}, []);

	useEffect(() => {
		console.log(comments);
	}, [comments]);

	return (
		<>
			<ReplyDiv>
				<HeadingDiv fontSize="2.5rem">
					{comments ? comments.length : '0'}개의 댓글이 있습니다.
				</HeadingDiv>
				<ReplyInput>
					<textarea
						value={commentBody}
						onChange={getCommentBody}
					/>
				</ReplyInput>
				<ReplySubmitButton onClick={postComment}>댓글 등록</ReplySubmitButton>
			</ReplyDiv>
			{comments &&
				comments.map((comment) => {
					return (
						<div key={comment.commentId}>
							<Comment comment={comment} />
							<HR></HR>
						</div>
					);
				})}
		</>
	);
};
export { Comments };
