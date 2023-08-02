import React, { useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
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
	const { state } = useLocation();
	const navigate = useNavigate();
	const history = createBrowserHistory();
	const preventGoback = () => {
		history.push(window.location.href);
		navigate('/');
	};
	useEffect(() => {
		history.push(window.location.href);
		window.addEventListener('popstate', preventGoback);
		return () => {
			window.removeEventListener('popstate', preventGoback);
		};
	}, []);
	return (
		<LoginPageWrap>
			<CloseButton onClick={preventGoback} style={{ cursor: 'pointer' }}>
				<TfiClose size='3rem' color='#3A3A3A'></TfiClose>
			</CloseButton>
			<div>
				<JoinComment />
				<LoginComments>소셜 계정으로 로그인하기</LoginComments>
				<a href={KAKAO_AUTH_URL}>
					<KakaoLoginButton />
				</a>
			</div>
		</LoginPageWrap>
	);
}
export default Login;
