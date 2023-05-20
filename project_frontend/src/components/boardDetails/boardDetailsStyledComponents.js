import { WriteWrapper } from '../../components';
import styled from 'styled-components';
const BoardWrapper = styled(WriteWrapper)`
	margin: 2.75rem auto;
	@media (max-width: 768px) {
		margin: 1rem auto;
	}
	margin-bottom: 5rem;
`;
const BoardDetailsWrap = styled.div`
	position: relative;
	.BoardInfoHR {
		margin: 0;
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
		word-break: keep-all;
	}
	.startingDate {
		color: #696868;
	}
`;

const VerticalBar = styled.div`
	border-left: 2px solid rgba(153, 153, 153, 0.3);
	height: 2.1rem;
	margin: 0 1.5rem;
`;

const ContentDiv = styled.div`
	margin: 8rem 0;
	font-size: 1.8rem;
`;

const BoardInfo = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: auto auto;
	grid-template-rows: auto auto;
	row-gap: 4rem;
	column-gap: 7rem;
	justify-content: flex-start;

	font-family: NanumSquareNeo;
	font-weight: 900;
	font-size: 2.3rem;
	line-height: 160%;

	padding: 6rem 0;
	transition: ease 0.2s;
	.boardInfoLabel {
		display: flex;
		flex-wrap: wrap;
		color: #302f2f;
		@media (max-width: 1024px) {
			display: block;
		}
		@media (max-width: 778px) {
			display: flex;
		}
	}
	.ButtonsWrap {
		margin-right: 0;
	}
	.category {
		color: #8a8a8a;
		margin-right: 3.2rem;
	}
	@media (max-width: 778px) {
		grid-template-columns: auto;
		gap: 2rem;
		padding: 4rem 0;
	}
`;
const ReplyDiv = styled(ContentDiv)`
	display: flex;
	flex-direction: column;
	margin: 5rem 0;
`;
const ReplyInput = styled.div`
	margin: 2rem 0;
	width: 100%;
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
		font-family: NanumSquare;
		font-size: 2rem;
		font-weight: 700;
	}
`;
const ReplySubmitButton = styled.div`
	align-self: flex-end;
	width: 10rem;
	height: 3.4rem;
	line-height: 3.4rem;
	text-align: center;
	color: #ffffff;
	background: #000000;
	border-radius: 1.6rem;
	box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.13);
	font-family: 'NanumSquare';
	font-weight: 500;
	font-size: 1.5rem;
	text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.13);
	cursor: pointer;
`;
const ButtonsWrap = styled.div`
	position: absolute;
	z-index: 99;
	font-family: NanumSquare;
	display: flex;
	top: 1.5rem;
	text-align: center;
	right: 0;
	margin-right: 0;
	justify-content: end;
	font-size: 2rem;
	font-weight: 700;
	color: #000000b2;
	@media (max-width: 1024px) {
		display: block;
	}
`;
const BoardContentButtonDiv = styled.div`
	flex-shrink: 0;
	margin: 0 2rem;
	cursor: pointer;
	margin-bottom: 1rem;
`;
export {
	BoardWrapper,
	BoardDetailsWrap,
	HeadingDiv,
	WriterDiv,
	VerticalBar,
	ContentDiv,
	BoardInfo,
	ReplyDiv,
	ReplyInput,
	ReplySubmitButton,
	ButtonsWrap,
	BoardContentButtonDiv,
};
