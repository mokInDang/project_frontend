import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { JoinComment, KakaoLoginButton } from '../components';
import { TfiClose } from 'react-icons/tfi';

const LoginPageWrap = styled.div`
	text-align: center;
	padding-top: 203px;
	user-select: none;
`;
const LoginComments = styled.div`
	font-family: 'NanumGothic';
	font-style: normal;
	font-weight: 700;
	font-size: 24px;
	line-height: 28px;
	color: #000000;
	opacity: 0.5;
	padding-top: 60px;
	padding-bottom: 80px;
`;
const CloseButton = styled.span`
	position: absolute;
	right: 20px;
	top: 20px;
`;
// eslint-disable-next-line no-restricted-globals
const Host = window.location.host;
const REST_API_KEY = '60b35611c843f6c8f618a495ecc8eaf6';
const REDIRECT_URI = `https://${Host}/api/member/join/`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function Login() {
	return (
		<>
			<div>
				<Link to="/">
					<CloseButton>
						<TfiClose
							size="30"
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
