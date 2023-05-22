import styled from 'styled-components';
const Headerdiv = styled.div`
	width: 100%;
	justify-content: center;
	position: sticky;
	position: -webkit-sticky;
	background-color: white;
	top: 0;
	z-index: 100;
	box-shadow: 1rem 0 2rem 1rem rgba(0, 0, 0, 0.05);
	-webkit-box-shadow: 1rem 0 2rem 1rem rgba(0, 0, 0, 0.05);

	.headerWrapper {
		box-sizing: border-box;
		padding: 0 5rem;
		margin: 0 auto;
		transition: all 0.2s ease-in-out;
		align-items: center;
		background: #ffffff;
		display: flex;
		height: 9rem;
		@media (min-width: 1600px) {
			height: 11rem;
			padding: 0 3rem;
			max-width: 161rem;
		}
		@media (max-width: 778px) {
			padding: 0 3rem;
		}
		@media (max-width: 425px) {
			padding: 0 2rem;
		}
	}
	.logoWrapper {
		flex-grow: 1;
		.HomebuttonWrapper {
			cursor: pointer;
			@media (max-width: 500px) {
				font-size: 2.5rem;
			}
		}
		div {
			display: flex;
			align-items: center;
			font-family: NanumSquareNeo;
			font-weight: 900;
			font-size: 3rem;
			img {
				height: 4.5rem;
			}
		}
	}
	.myRegion {
		margin-right: 5rem;
		text-shadow: none;
		display: flex;
		align-items: center;
		img {
			width: 3.5rem;
			margin: 1rem;
		}
		@media (max-width: 778px) {
			margin-right: 3rem;
		}
	}
	.newPost {
		margin-right: 5rem;
		display: flex;
		justify-content: center;
		cursor: pointer;
		@media (max-width: 778px) {
			display: none;
		}
	}
	.region
`;

const HeaderButton = styled.div`
	color: #000000;
	flex-shrink: 0;
	font-weight: 700;
	font-size: 2.4rem;
	height: 100%;
	text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
	cursor: pointer;
	display: flex;
	align-items: center;
	@media (max-width: 500px) {
		font-size: 2rem;
	}
`;

const HeaderButtonWrap = styled.div`
	align-items: center;
	display: flex;
	.myRegion {
		cursor: default;
	}
	@keyframes jittery {
		1%,
		9% {
			transform: scale(1);
		}
		2% {
			transform: scale(0.95);
		}
		3% {
			transform: scale(1.05);
		}
		4% {
			transform: scale(1.05) rotate(-5deg);
		}
		5% {
			transform: scale(1.05) rotate(5deg);
		}
		6% {
			transform: scale(1.05) rotate(-3deg);
		}
		7% {
			transform: scale(1.05) rotate(2deg);
		}
		8% {
			transform: scale(1.05) rotate(0);
		}
	}

	@keyframes jelly {
		25% {
			transform: scale(0.9, 1.1);
		}
		50% {
			transform: scale(1.1, 0.9);
		}
		75% {
			transform: scale(0.95, 1.05);
		}
	}
	.myRegionMapButton {
		cursor: pointer;
		animation: jittery 20s infinite;
		background: rgba(129, 204, 85, 0.7);
		box-shadow: 0px 5px 0px 0px rgba(129, 204, 85, 1);

		box-sizing: border-box;
		padding-left: 1rem;
		padding-right: 2rem;
		border-radius: 1rem;
		margin: 0 2rem;
		img {
			width: 3rem;
		}
		:hover {
			animation-play-state: paused;
			margin-top: 15px;
			margin-bottom: 5px;
			box-shadow: 0px 0px 0px 0px rgba(129, 204, 85, 1);
		}
		:active {
			// -webkit-animation: jelly 0.5s;
			// animation: jelly 0.5s;
			background-color: rgba(129, 204, 85, 0.9);
		}
	}
`;

const ProfileWrap = styled.div`
	flex-shrink: 0;
	display: flex;
	cursor: pointer;
	justify-content: end;
	align-items: center;
`;

export { Headerdiv, HeaderButton, HeaderButtonWrap, ProfileWrap };
