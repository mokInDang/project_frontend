import styled from 'styled-components';

const BoardItemsWrap = styled.div`
	margin-top: 10rem;
	display: grid;
	padding: 0 2rem;
	grid-template-columns: repeat(auto-fill, Minmax(35rem, 20%));
	// 너비 35rem인 아이템을 담을 수 있을만큼!
	justify-content: center;
	align-content: center;
	row-gap: 7rem;
	column-gap: 4rem;
	@media (max-width: 778px) {
		grid-template-columns: Minmax(32rem, 80%);
	}
	@media (min-width: 1920px) {
		grid-template-columns: repeat(4, 35rem);
	}
`;
const BoardItemCard = styled.div`
	// 부모 컴포넌트인 BoardItemsWrap에서 너비를 지정해주었으므로 자식 컴포넌트(아이템)의 너비는 지정하지 말아야 함
	display: flex;
	flex-direction: column;
	height: 42rem;
	border-radius: 0.7rem;
	padding: 4rem 3rem 2rem 3rem;
	box-sizing: border-box;
	background-color: rgba(255, 255, 255, 0.8);
	border: 2px solid #b3b3b3;
	border-radius: 5rem;
	transition: all 0.2s ease-in-out;
	position: relative;
	word-break: break-all;

	font-style: normal;
	font-weight: 700;

	@media (max-width: 778px) {
		height: 40rem;
	}
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
		line-height: 2.2rem;
		margin: 2rem 0;
	}
	.content {
		color: #969696;
		font-size: 1.4rem;
		line-height: 152%;
		flex-grow: 1;
		overflow: hidden;
	}
	hr {
		opacity: 0.7;
		border: 1.5px solid #b3b3b3;
		margin: 1.5rem 0;
	}
	.email {
		align-items: center;
		display: flex;
		font-size: 1.7rem;
	}
`;
export { BoardItemCard, BoardItemsWrap };
