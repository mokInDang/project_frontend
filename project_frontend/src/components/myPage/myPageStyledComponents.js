import styled from 'styled-components';

const MyPageWrapper = styled.div`
	margin: 8rem auto;
	width: 62.5%;
	word-break: break-all;
	font-size: 1.8rem;
	@media (max-width: 768px) {
		width: 70%;
	}
	@media (max-width: 425px) {
		width: 85%;
	}
	#profileImg {
		display: none;
	}
	button {
		cursor: pointer;
	}
	.title {
		font-family: NanumSquareNeo;
		font-size: 4rem;
		font-weight: 900;
	}
	.profileImageWrap {
		display: flex;
		align-items: center;
		margin: 4rem 0;
	}
	.imageButton {
		width: 12rem;
		height: 3rem;
		margin: 3rem;
		background: rgba(36, 36, 36, 1);
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 0.8rem;
		box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.13);
		cursor: pointer;
		font-size: 1.6rem;
	}
	.myInfoWrap {
		font-size: 3rem;
		margin: 6rem 0;
		.aliasWrap {
			display: flex;
			align-items: center;
			margin: 4rem 0;
		}
		.myRegionWrap {
			display: flex;
			align-items: center;
			margin: 4rem 0;
		}
		label {
			margin: 0 2.5rem;
			width: 12rem;
			text-align: center;
			font-weight: 700;
		}
		input[type='text'] {
			border: 1px solid rgba(189, 189, 189, 1);
			width: 27rem;
			height: 5rem;
			text-indent: 2rem;
			font-family: NanumSquare;
			font-size: 2rem;
			font-weight: 700;
			border-radius: 0.8rem;
			margin-right: 2rem;
		}
	}
	.buttonsWrap {
		display: flex;
	}
	.button {
		width: 10rem;
		height: 4rem;
		margin: 3rem;
		background: rgba(36, 36, 36, 1);
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 0.8rem;
		box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.13);
		cursor: pointer;
	}
	.getRegionButton {
		font-size: 1.8rem;
		background: rgba(36, 36, 36, 1);
		color: #ffffff;
		height: 4rem;
		width: 15rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 0.8rem;
		box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.13);
		cursor: pointer;
		margin: 0 2rem;
	}
`;
export { MyPageWrapper };
