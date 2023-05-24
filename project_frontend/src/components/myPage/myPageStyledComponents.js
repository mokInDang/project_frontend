import styled from 'styled-components';
const MyPageWrapper = styled.div`
	position: relative;
	margin: 8rem auto;
	text-align: center;
	width: 90%;
	word-break: break-all;
	font-size: 1.8rem;
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
		.titleText {
			background-color: white;
		}
	}
	.profileImageWrap {
		display: flex;
		align-items: center;
		margin: 4rem 0;
		justify-content: center;
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
		display: flex;
		justify-content: center;
		align-items: end;
		margin: 6rem 0;
		@media (max-width: 800px) {
			flex-wrap: wrap;
		}
		@media (max-width: 643px) {
			margin: 0;
		}
		@media (max-width: 456px) {
			svg {
				margin: 1rem 0;
			}
		}
		. .myInfoWrapCenter {
			display: flex;
		}
		.aliasWrap {
			display: flex;
			align-items: center;
			margin: 4rem auto;
			justify-content: center;
			flex-wrap: wrap;
			@media (max-width: 800px) {
				margin-top: 0;
			}
			@media (max-width: 456px) {
				margin-bottom: 1rem;
			}
		}
		.myRegionWrap {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			justify-content: center;
		}
		label {
			margin: 0 2.5rem;
			width: 12rem;
			text-align: center;
			flex-shrink: 0;
			font-weight: 700;
			@media (max-width: 800px) {
				margin: 0 1rem;
			}
		}
		input[type='text'] {
			border: 1px solid rgba(189, 189, 189, 1);
			width: 27rem;
			height: 5rem;
			font-family: NanumSquare;
			padding: 0 2rem;
			box-sizing: border-box;
			font-size: 2rem;
			font-weight: 700;
			border-radius: 0.8rem;
			outline: 0;
			@media (max-width: 778px) {
				padding: 0;
				text-align: center;
			}
		}
	}
	.buttonsWrap {
		display: flex;
		justify-content: center;
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
		box-size: border-box;
		border-radius: 0.8rem;
		box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.13);
		cursor: pointer;
		margin: 0.6rem 2rem;
		flex-shrink: 0;
		@media (max-width: 768px) {
			margin-top: 4rem;
		}
	}
`;
export { MyPageWrapper };
