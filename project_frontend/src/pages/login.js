import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
	JoinComment,
	KakaoLoginButton,
	CloseButton,
	LoginPageWrap,
	LoginComments,
} from '../components';
import { TfiClose } from 'react-icons/tfi';

// eslint-disable-next-line no-restricted-globals
const Host = window.location.host;
const REST_API_KEY = '60b35611c843f6c8f618a495ecc8eaf6';
const REDIRECT_URI = `https://${Host}/api/auth/join`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function Login() {
	return (
		<div>
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
		</div>
	);
}
export default Login;
