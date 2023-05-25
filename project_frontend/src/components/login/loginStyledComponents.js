import styled from 'styled-components';
import {
	kakao_login_large_wide,
	kakao_login_large_narrow,
	kakao_login_medium_narrow,
	kakao_login_medium_wide,
} from '../../assets/images';

const KakaoLoginButton = styled.img.attrs({
	src: `${kakao_login_large_narrow}`,
})`
	filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.13));
	@media only screen and (max-width: 768px) {
		width: 80%;
	}
`;

const WelcomeComment = styled.p`
	margin: auto;
	padding-bottom: 1.5rem;
	font-family: 'NanumSquare';
	font-weight: 900;
	letter-spacing: 0.1rem;
	font-size: ${(props) => props.fontSize};

	color: #000000;
	text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
`;
const LoginPageWrap = styled.div`
	height: 90vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
`;
const LoginComments = styled.div`
	font-family: NanumSquare;
	font-style: normal;
	font-weight: 900;
	font-size: 2.4rem;
	line-height: 2.8rem;
	color: #000000;
	opacity: 0.5;
	padding-top: 6rem;
	padding-bottom: 8rem;
`;
const CloseButton = styled.span`
	position: absolute;
	right: 2rem;
	top: 2rem;
`;
export {
	KakaoLoginButton,
	WelcomeComment,
	LoginPageWrap,
	LoginComments,
	CloseButton,
};
