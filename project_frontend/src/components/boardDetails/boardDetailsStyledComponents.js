import { WriteWrapper, Profile } from '../../components';
import styled from 'styled-components';

const BoardWrapper = styled(WriteWrapper)`
	margin: 2.75rem auto;
	@media (max-width: 768px) {
		margin: 1rem auto;
	}
`;

const HeadingDiv = styled.div`
	font-family: 'NanumSquareNeo';
	font-weight: 900;
	font-size: ${(props) => props.fontSize};
	line-height: 135%;
`;

const WriterDiv = styled.div`
	display: flex;
	align-items: center;
	font-size: 1.75rem;
	font-weight: 700;
	margin: 1.5rem 0;
	div {
		display: flex;
		flex-wrap: wrap;
	}
	.startingDate {
		color: #696868;
	}
`;

const WriterProfilePicDiv = styled(Profile)`
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	margin: 2rem 2rem 2rem 0;
	flex-shrink: 0;
`;

const VerticalBar = styled.div`
	border-left: 2px solid rgba(153, 153, 153, 0.3);
	height: 2.1rem;
	margin: 0 1.5rem;
`;

const ContentDiv = styled.div`
	font-weight: 700;
	font-size: 1.8rem;
	line-height: 160%;
	letter-spacing: 0.07rem;
	margin: 8rem 0;
`;

const BoardInfo = styled.div`
	display: grid;
	grid-template-columns: auto auto;
	grid-template-rows: auto auto;
	gap: 4rem;
	justify-content: flex-start;

	font-family: NanumSquareNeo;
	font-weight: 900;
	font-size: 2.3rem;
	line-height: 160%;

	margin: 6rem 0;
	transition: ease 0.2s;
	div {
		display: flex;
		flex-wrap: wrap;
		color: #302f2f;
		margin-right: 3.2rem;
		@media (max-width: 1024px) {
			display: block;
		}
	}
	.category {
		color: #8a8a8a;
	}
	@media (min-width: 1440px) {
		grid-template-columns: repeat(3, auto);
		grid-template-rows: 1fr;
		gap: 3rem;
	}
	@media (max-width: 768px) {
		grid-template-columns: auto;
	}
`;
const ReplyDiv = styled(ContentDiv)`
	position: relative;
`;
const ReplyInput = styled.div`
	margin: 2rem 0;
	height: 10rem;
	border: 2px solid rgba(162, 162, 162, 0.6);
	border-radius: 10px;
	padding: 1rem;
	box-sizing: border-box;
	textarea {
		width: 100%;
		height: 100%;
		border: none;
		resize: none;
		outline: none;
		font-family: NanumSquare_acR;
		font-size: 1.5rem;
		font-weight: 700;
	}
`;
const ReplySubmitButton = styled.div`
	position: absolute;
	right: 0;
	width: 10rem;
	height: 3.4rem;
	line-height: 3.4rem;
	text-align: center;
	color: #ffffff;
	background: #000000;
	border-radius: 16px;
	box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.13);
	font-family: 'NanumSquare_acR';
	font-weight: 500;
	font-size: 1.2rem;
	text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.13);
`;
export {
	BoardWrapper,
	HeadingDiv,
	WriterDiv,
	WriterProfilePicDiv,
	VerticalBar,
	ContentDiv,
	BoardInfo,
	ReplyDiv,
	ReplyInput,
	ReplySubmitButton,
};
