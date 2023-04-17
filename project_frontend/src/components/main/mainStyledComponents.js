import styled from 'styled-components';

const BoardItemsWrap = styled.div`
	display: grid;
	padding: 0 2rem;
	grid-template-columns: repeat(auto-fill, Minmax(35rem, 20%));
	// 너비 35rem인 아이템을 담을 수 있을만큼!
	justify-content: center;
	align-content: center;
	row-gap: 7rem;
	column-gap: 4rem;
	@media (max-width: 796px) {
		grid-template-columns: Minmax(32rem, 95%);
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
	border: 2px solid #b3b3b3;
	border-radius: 4rem;
	transition: all 0.2s ease-in-out;

	font-style: normal;
	font-weight: 700;
	word-break: break-word;

	position: relative;
	overflow: hidden;

	:hover {
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
		background-color: grey;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		opacity: 0.4;
		display: none;
	}
	.category {
		color: #b3b3b3;
		font-size: 1.4rem;
		display: flex;
		letter-spacing: 0.075rem;
		flex-shrink: 0;
		transition: all 0.1s ease-in-out;
		@media (max-width: 355px) {
			font-size: 1.3rem;
		}
	}
	.title {
		font-size: 2rem;
		height: 4.4rem;
		line-height: 2.2rem;
		text-overflow: ellipsis;
		display: -webkit-box;
		overflow: hidden;
		margin: 2rem 0;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		align-self: center;
	}
	.content {
		display: -webkit-box;
		text-overflow: ellipsis;
		width: 100%;
		color: #969696;
		font-size: 1.4rem;
		line-height: 2.1rem;
		overflow: hidden;
		height: 10.5rem;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
	}
	.writerProfileWrap {
		margin-top: 3rem;
		font-size: 1.7rem;
		text-align: right;
		color: rgba(0, 0, 0, 0.8);
		hr {
			opacity: 0.8;
			border: 1.5px solid #b3b3b3;
		}
	}
	.writerProfile {
		align-items: center;
		display: flex;
	}
`;
const TabWrapper = styled.div`
	display: flex;
	width: 100%;
	max-width: 160rem;
	margin: 0 auto;
	padding: 0 2rem;
	box-sizing: border-box;
	flex-direction: row;
	font-size: 2.5rem;
	font-weight: 700;
	@media only screen and (max-width: 778px) {
		font-size: 2.4rem;
	}
	@media only screen and (max-width: 425px) {
		font-size: 2.2rem;
	}
	div {
		margin: 1.5rem 3rem;
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	color: #3a3a3a;
	${(props) =>
		props.boardTab
			? '.recruitment{color:#dddddd}'
			: '.proofShots{color:#dddddd}'}
	${(props) =>
		props.regionTab
			? '.entireRegion{color:#dddddd}'
			: '.myRegion{color:#dddddd}'}
`;
const TabDiv = styled.div`
	color: #111111;
`;
export { BoardItemCard, BoardItemsWrap, TabWrapper, TabDiv };
