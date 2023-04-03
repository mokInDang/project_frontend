import styled from 'styled-components';

const BoardItemsWrap = styled.div`
	margin-top: 100px;
	display: grid;
	padding: 0 20px;
	grid-template-columns: repeat(auto-fill, 350px);
	// 너비 350px 아이템을 담을 수 있을만큼!
	justify-content: center;
	align-content: center;
	row-gap: 70px;
	column-gap: 40px;
	@media (max-width: 778px) {
		grid-template-columns: Minmax(320px, 80%);
		row-gap: 40px;
	}
`;
const BoardItemCard = styled.div`
	// 부모 컴포넌트인 BoardItemsWrap에서 너비를 지정해주었으므로 자식 컴포넌트(아이템)의 너비는 지정하지 말아야 함
	height: 420px;
	border-radius: 7px;
	padding: 30px;
	box-sizing: border-box;
	background-color: rgba(255, 255, 255, 0.8);
	border: 2px solid #b3b3b3;
	border-radius: 50px;
	transition: all 0.2s ease-in-out;
	position: relative;

	@media (max-width: 778px) {
		height: 400px;
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

	div {
		font-family: NanumSquare_acR;
		font-style: normal;
		font-weight: 700;
	}
	.title {
		font-size: 20px;
		line-height: 22px;
		margin: 20px 0;
	}
	.content {
		color: #969696;
		font-size: 14px;
		line-height: 152%;
	}
	.email {
		position: absolute;
		bottom: 35px;
		font-size: 15px;
	}
`;
export { BoardItemCard, BoardItemsWrap };
