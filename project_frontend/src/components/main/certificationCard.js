import { WriterProfilePicDiv } from '..';
import { useNavigate } from 'react-router-dom';
import { movePath } from '../../utils';
import styled from 'styled-components';

const CertificationItemCard = styled.div`
	border: 2px solid #b3b3b3;
	box-sizing: border-box;
	font-size: 1.65rem;
	font-weight: 700;
	word-break: break-word;
	color: rgba(0, 0, 0, 0.7);
	border-radius: 1rem;
	.thumbnail {
		margin: 2rem;
		height: 35rem;
		background: no-repeat black center/cover url(${(props) => props.src});
		margin-bottom: 2rem;
		border-radius: 1rem;
	}
	.writerProfileWrap {
		padding: 0 2rem 2rem 2rem;
	}
	.writerProfile {
		display: flex;
		align-items: center;
		margin: 0;
	}
	hr {
		border: 1.5px solid #b3b3b3;
		margin-top: 0;
		margin-bottom: 2rem;
	}
	.contentBody {
		font-family: NanumSquareNeo;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		font-size: 2.5rem;
		line-height: 2.5rem;
		height: 3rem;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		margin-bottom: 2rem;
		color: rgba(0, 0, 0, 0.9);
	}
`;
const CertificationCard = (props) => {
	const navigate = useNavigate();
	const { contentBody } = props.content;
	const newContent = contentBody
		.replace(/<[^>]*>?/g, '')
		.replace(/(<([^>]+)>)/gi, '');
	return (
		<CertificationItemCard
			src={props.content.mainImageUrl}
			onClick={() =>
				movePath(navigate, `/boards/certification/${props.content.boardId}`)
			}>
			<div className="thumbnail"></div>
			<div className="writerProfileWrap">
				<hr />
				<div className="contentBody">{props.content.title}</div>
				<div className="writerProfile">
					<WriterProfilePicDiv
						size="4rem"
						margin="0 1.5rem 0 0"
						src={props.content.writerProfileUrl}></WriterProfilePicDiv>
					{props.content.writerAlias}({props.content.firstFourLettersOfEmail}
					****)
				</div>
			</div>
		</CertificationItemCard>
	);
};
export { CertificationCard };