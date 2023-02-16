import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { KakaoLoginButton } from '../components';

function Login() {
    
	const uri = window.location.href;
	const arr = uri.split('=');
	const PARAMS = new URL(document.location).searchParams;
	const KAKAO_CODE = PARAMS.get('code');

	return (
		<>
			<KakaoLoginButton />
			<h3>{KAKAO_CODE}</h3>
			<Link to="/">메인 페이지</Link>
		</>
	);
}
export default Login;
