import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { arrow_up } from '../assets/images';
const TopButtonDiv = styled.div`
	width: 8rem;
	height: 8rem;
	border-radius: 10rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 0.8rem solid rgba(129, 204, 85, 1);
	background: rgba(255, 255, 255, 0.8);
	position: fixed;
	right: 10%;
	bottom: 0;
	transform: translate(-50%, -50%);
	z-index: 3;
	font-size: 1.5rem;
	box-sizing: border-box;
	cursor: pointer;
	color: rgba(92, 92, 92, 0.7);
	font-family: NanumSquareNeo;
	font-weight: 900;
	img {
		width: 2em;
	}
	span {
		margin: 0.4em 0;
	}
	@media (max-width: 1920px) {
		right: 0;
		bottom: 0;
		transform: translate(-70%, -50%);
	}
	@media (max-width: 768px) {
		transform: translate(-30%, -30%);
	}
`;
const GlobalProfile = styled.div`
	border-radius: 50%;
	border: 1px solid rgba(0, 0, 0, 0.1);
	flex-shrink: 0;
	margin: ${(props) => props.margin};
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	background: url(${(props) =>
			props.src &&
			props.src !== 'DEFAULT_PROFILE_IMAGE_URL' &&
			props.src !== null
				? props.src
				: 'https://dognejupging-xyz-image-bucket.s3.ap-northeast-2.amazonaws.com/profile_image/profileimage2.png'})
		no-repeat center/cover;
`;

const TopButton = () => {
	const [showButton, setShowButton] = useState(false);
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	useEffect(() => {
		const handleShowButton = () => {
			window.scrollY > 100 ? setShowButton(true) : setShowButton(false);
		};
		window.addEventListener('scroll', handleShowButton);
		return () => {
			window.removeEventListener('scroll', handleShowButton);
		};
	}, []);
	return (
		showButton && (
			<TopButtonDiv
				onClick={() => {
					scrollToTop();
				}}>
				<img src={arrow_up} />
				<span>TOP</span>
			</TopButtonDiv>
		)
	);
};
export { GlobalProfile, TopButton };
