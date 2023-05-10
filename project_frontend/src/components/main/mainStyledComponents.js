import styled from 'styled-components';
import { closed_stamp } from '../../assets/images';

const CertificationCardsWrap = styled.div`
	display: grid;
	width: 80%;
	grid-template-columns: repeat(auto-fill, 39rem);
	justify-content: center;
	align-content: center;
	margin: 0 auto;
	margin-top: 5rem;
	row-gap: 7rem;
	column-gap: 3rem;
	@media (min-width: 1440px) {
		grid-template-columns: repeat(3, 39rem);
	}
	@media (min-width: 1920px) {
		grid-template-columns: repeat(4, 39rem);
	}
	@media (max-width: 425px) {
		grid-template-columns: Minmax(35rem, 95%);
	}
`;
const BoardItemsWrap = styled.div`
	display: grid;
	padding: 0 2rem;
	margin-top: 2rem;
	grid-template-columns: repeat(auto-fill, 35rem);
	// 너비 35rem인 아이템을 담을 수 있을만큼!
	justify-content: center;
	align-content: center;
	row-gap: 7rem;
	column-gap: 4rem;
	@media (max-width: 796px) {
		grid-template-columns: Minmax(35rem, 95%);
	}
	@media (min-width: 1920px) {
		grid-template-columns: repeat(4, 35rem);
	}
`;
const BoardItemCard = styled.div`
	// 부모 컴포넌트인 BoardItemsWrap에서 너비를 지정해주었으므로 자식 컴포넌트(아이템)의 너비는 지정하지 말아야 함
	height: 40rem;

	border-radius: 0.7rem;
	padding: 4rem 3rem 2rem 3rem;
	box-sizing: border-box;
	background-color: rgba(255, 255, 255, 0.8);
	border: 0.2rem solid #b3b3b3;
	border-radius: 4rem;
	transition: all 0.2s ease-in-out;
	transform: scale(1);

	font-weight: 700;
	word-break: break-word;

	position: relative;
	overflow: hidden;

	:hover {
		cursor: pointer;
		transform: scale(1.01);
		-webkit-transform: scale(1.01);
		-moz-transform: scale(1.01);
		-ms-transform: scale(1.01);
		-o-transform: scale(1.01);
		background-color: rgba(129, 204, 85, 0.01);
	}
	:active {
		transform: scale(1);
		-webkit-transform: scale(1);
		-moz-transform: scale(1);
		-ms-transform: scale(1);
		-o-transform: scale(1);
		background-color: rgba(0, 0, 0, 0.1);
	}
	.closed {
		width: 100%;
		height: 100%;
		background: rgba(129, 129, 129, 0.3) url(${closed_stamp}) no-repeat center
			center;
		background-size: 20rem;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		display: ${(props) => (props.isOnRecruitment ? 'none' : 'block')};
	}
	.category {
		color: #b3b3b3;
		font-size: 1.4rem;
		display: flex;
		flex-direction: row;
		letter-spacing: 0.05rem;
		flex-shrink: 0;
		align-items: center;
		.bar {
			height: 1.4rem;
		}
		@media (max-width: 355px) {
			font-size: 1.3rem;
		}
	}
	.title {
		font-size: 2rem;
		height: 5rem;
		line-height: 2.5rem;
		text-overflow: ellipsis;
		display: -webkit-box;
		overflow: hidden;
		margin: 2rem 0;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		align-self: center;
		// letter-spacing: 0.05rem;
	}
	.contentBody {
		display: -webkit-box;
		text-overflow: ellipsis;
		width: 100%;
		color: #969696;
		font-size: 1.4rem;
		line-height: 2.1rem;
		height: 10.5rem;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
		// letter-spacing: 0.05rem;
	}
	.writerProfileWrap {
		margin-top: 3rem;
		font-size: 1.7rem;
		text-align: right;
		color: rgba(40, 40, 40, 0.8);
		hr {
			opacity: 0.8;
			border: 1.5px solid #b3b3b3;
		}
	}
	.writerProfile {
		align-items: center;
		display: flex;
		flex-direction: row;
		flex-shrink: 0;
	}
	.numofComments {
		font-size: 2rem;
		display: flex;
		align-items: center;
		color: rgba(40, 40, 40, 0.5);
		span {
			margin-left: 0.5rem;
		}
		svg {
			transform: scaleX(-1);
		}
	}

	@media (max-width: 796px) {
		.category {
			font-size: 1.8rem;
		}
		.title {
			font-size: 2.5rem;
			height: 3rem;
			line-height: 3rem;
			-webkit-line-clamp: 1;
		}
		.contentBody {
			font-size: 2rem;
			line-height: 2.7rem;
			height: 10.8rem;
			-webkit-line-clamp: 4;
		}
		.writerProfileWrap {
			margin-top: 4rem;
		}
	}
`;
const TabWrapper = styled.div`
	display: flex;
	width: 100%;
	max-width: 160rem;
	padding: 0 10rem;
	margin: 0 auto;
	box-sizing: border-box;
	font-size: 2.5rem;
	font-weight: 700;
	flex-wrap: wrap;

	@media only screen and (min-width: 1560px) {
		padding: 0 2rem;
	}
	@media only screen and (max-width: 1380px) {
		padding: 0 2rem;
	}
	@media only screen and (max-width: 778px) {
		font-size: 2.4rem;
	}
	@media only screen and (max-width: 425px) {
		font-size: 2.2rem;
	}
	div {
		display: flex;
		align-items: center;
	}
	.certificationarrow {
		transition: all 0.2s ease;
		${(props) =>
			props.boardTab === '/certification' ? 'transform:rotateZ(90deg)' : ''}
	}
	.recruitmentarrow {
		transition: all 0.2s ease;
		${(props) => (props.boardTab === '/' ? 'transform:rotateZ(90deg)' : '')}
	}
	.mainCategory {
		flex-wrap: wrap;
		margin: 0;
		width: 100%;
		justify-content: space-between;
		div {
			flex-wrap: wrap;
		}
	}
	color: #3a3a3a;
	${(props) =>
		props.boardTab === '/certification'
			? '.recruitment{color:#dddddd}'
			: '.certification{color:#dddddd}'}
	.regionTab {
		margin: 1rem;
		padding: 1.3rem 3rem;
		border-top-left-radius: 2rem;
		border-top-right-radius: 2rem;
	}
	.entireRegion {
		${(props) =>
			props.regionTab === 'myRegion'
				? 'color: #dddddd;'
				: 'background-color: rgba(179, 179, 179, 0.5); box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);'}
	}
	.myRegion {
		${(props) =>
			props.regionTab === 'all'
				? 'color:#dddddd;'
				: 'background-color: rgba(179, 179, 179, 0.5); box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);'}
	}
`;
const TabDiv = styled.div`
	margin: 1.5rem 3rem;
	color: #111111;
	cursor: pointer;
	align-self: flex-start;
`;
export {
	BoardItemCard,
	BoardItemsWrap,
	TabWrapper,
	TabDiv,
	CertificationCardsWrap,
};
