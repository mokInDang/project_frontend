import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { JoinComment, KakaoLoginButton } from '../components';
import { TfiClose } from 'react-icons/tfi';

const LoginPageWrap = styled.div`
	text-align: center;
	padding-top: 20rem;
	user-select: none;
`;
const LoginComments = styled.div`
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
	width: 3rem;
`;
// eslint-disable-next-line no-restricted-globals
const Host = window.location.host;
const REST_API_KEY = '60b35611c843f6c8f618a495ecc8eaf6';
const REDIRECT_URI = `https://${Host}/api/auth/join`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function Login() {
	return (
		<>
			<div>
				<Link to="/">
					<CloseButton>
						<TfiClose
							size="3rem"
							color="#3A3A3A"></TfiClose>
					</CloseButton>
				</Link>
			</div>
			<LoginPageWrap>
				<JoinComment />
				<LoginComments>소셜 계정으로 로그인하기</LoginComments>
				<a href={KAKAO_AUTH_URL}>
					<KakaoLoginButton />
				</a>
			</LoginPageWrap>
		</>
	);
}
export default Login;
