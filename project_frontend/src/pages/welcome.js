import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onLogin } from '../apis';

function MovetoHome() {
	window.location.replace('/');
}

function Welcome() {
	const KAKAO_CODE = new URL(document.location.href).searchParams.get('code');

	useEffect(() => {
		let kakaoAuthCode = { authorizationCode: KAKAO_CODE };
		if (KAKAO_CODE) {
			onLogin(kakaoAuthCode);
		} // eslint-disable-next-line
	}, []);

	return (
		<>
			<h1>회원가입을 축하합니다~</h1>
			<Link to='/'>홈으로</Link>
		</>
	);
}
export default Welcome;
