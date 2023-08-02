import { GlobalProfile } from '..';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { tape_green, tape_pastelgreen } from '../../assets/images';

const CertificationItemCard = styled.div`
	box-sizing: border-box;
	font-size: 1.4rem;
	font-weight: 700;
	word-break: break-word;
	color: rgba(0, 0, 0, 0.7);
	background: {#ffffff};
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
	z-index: 2;
	transform: scale(1);

	.thumbnail {
		box-shadow: inset 0px 0px 1.5rem rgba(0, 0, 0, 0.3);
		box-sizing: border-box;
		margin: 1.8rem;
		margin-bottom: 1.5rem;
		height: 29rem;
		overflow: hidden;
		img {
			position: relative;
			width: 100%;
			height: 100%;
			object-fit: cover;
			z-index: -1;
			background: rgba(217, 217, 217, 0.5);
		}
		@media (max-width:425px){
			height:40rem;
			margin:2rem;
		}
	}
	.writerProfileWrap {
		padding: 0 2rem 2rem 2rem;
	}
	.writerProfile {
		display: flex;
		align-items: center;
		margin: 0;
	}
	.line {
		border-bottom: 1px solid #b3b3b3;
		height: 1px;
		opacity: 0.3;
		margin: 1rem 0;
	}
	.contentBody {
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		font-size: 1.7rem;
		line-height: 2.5rem;
		height: 5rem;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		color: rgba(0, 0, 0, 0.9);
	}
	transition: all 0.2s ease-in-out;
	:hover {
		cursor: pointer;
		transform: scale(1.01);
		-webkit-transform: scale(1.01);
		-moz-transform: scale(1.01);
		-ms-transform: scale(1.01);
		-o-transform: scale(1.01);
	}
`;
const Tape = styled.div`
	position: absolute;
	width: 13rem;
	height: 3rem;
	@media (max-width: 425px) {
		height: 7rem;
		width: 17rem;
		top: -1rem;
	}
	z-index: 3;
	top: -0.5rem;
	left: 50%;
	transform: translate3d(-50%, -50%, 0)
		${(props) => {
			if (props.tapeNumber === 0) return 'rotate(-3.5deg)';
			if (props.tapeNumber === 1) return 'rotate(4.53deg)';
			if (props.tapeNumber === 2) return 'rotate(1.43deg)';
			if (props.tapeNumber === 3) return 'rotate(-1.7deg)';
		}};
	background: url(${(props) => {
			if (props.tapeNumber % 2) return tape_pastelgreen;
			else return tape_green;
		}})
		no-repeat center/contain;
`;
const CertificationCard = ({ boardItem, tapeNumber }) => {
	const navigate = useNavigate();
	const newContent = boardItem.contentBody
		.replace(/<br>/gi, ' ')
		.replace(/<(\/p)([^>]*)>/g, ' ')
		.replace(/&nbsp;/gi, ' ')
		.replace(/<[^>]*>?/g, '')
		.replace(/(<([^>]+)>)/gi, '');
	return (
		<CertificationItemCard
			onClick={() => navigate(`/boards/certification/${boardItem.boardId}`)}
		>
			<Tape tapeNumber={tapeNumber % 4} />
			<div className='thumbnail'>
				<img src={boardItem.mainImageUrl} loading='lazy'></img>
			</div>
			<div className='writerProfileWrap'>
				<div className='writerProfile'>
					<GlobalProfile
						size='4rem'
						margin='0 1.5rem 0 0'
						src={boardItem.writerProfileUrl}
					></GlobalProfile>
					{boardItem.writerAlias}({boardItem.firstFourLettersOfEmail}
					****)
				</div>
				<div className='line' role='presentation' />
				<div className='contentBody'>{newContent}</div>
			</div>
		</CertificationItemCard>
	);
};
export { CertificationCard };
