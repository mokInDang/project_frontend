import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MovetoHome() {
	window.location.replace('/');
}
function Welcome() {
	console.log("카카오 인가코드 받아오기");
	const KAKAO_CODE = new URL(document.location.href).searchParams.get('code');
	useEffect(() => {
		let data = { authorizationCode : KAKAO_CODE };
		console.log(KAKAO_CODE);
		const getAccessToken = async () => {
			await axios
				.post(
					'http://15.165.153.213:8080/api/member/join',
					JSON.stringify(data),
					{
						headers: { 'Content-Type': `application/json` },
					}
				)
				.then((res) => {
					//인가코드를 보내고 나면
					const jData = res.headers.get('Authorization');
					// let accessToken = res.data.accessToken; //액세스 토큰 받아오기
					// let refreshToken = res.headers['refresh-token']  ; //리프레쉬 토큰 받아오기
					// localStorage.setItem('AccessToken', accessToken);
					// localStorage.setItem('Refresh_Token', refreshToken);
					localStorage.setItem('Token', jData);
					console.log('토큰 받아오기 성공');
				})
				.catch((response) => {
					console.log(response);
					console.log('실패');
				});
		};
		if (KAKAO_CODE) {
			console.log(KAKAO_CODE);
			getAccessToken();
			//setTimeout(MovetoHome, 2000); // 메인 페이지로 2초 후 이동
		}
	}, []);

	return (
		<>
			<h1>회원가입을 축하합니다~</h1>
			<h3>{KAKAO_CODE}</h3>
			<Link to="/">홈으로</Link>
		</>
	);
}
export default Welcome;
