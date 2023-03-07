import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MovetoHome() {
	window.location.replace('/');
}
function Welcome() {
	function splitString(stringToSplit, separator) {
		var arrayOfStrings = stringToSplit.split(separator);
		console.log(arrayOfStrings[0]);
		console.log(arrayOfStrings[1]);
		localStorage.setItem('AccessToken', arrayOfStrings[0]);
		localStorage.setItem('RefreshToken', arrayOfStrings[1]);
	}
	const KAKAO_CODE = new URL(document.location.href).searchParams.get('code');
	useEffect(() => {
		let data = { authorizationCode: KAKAO_CODE };
		//console.log(KAKAO_CODE);
		const getAccessToken = async () => {
			await axios
				.post(
					'https://dev.dongnejupging.xyz/api/member/join',
					JSON.stringify(data),
					{
						headers: {
							'Content-Type': `application/json`,
							'Access-Control-Allow-Origin': `https://localhost`,
						},
					}
				)
				.then((res) => {
					//인가코드를 보내고 나면
					const authToken = res.headers.get('Authorization');
					// let accessToken = res.data.accessToken; //액세스 토큰 받아오기
					// let refreshToken = res.headers['refresh-token']  ; //리프레쉬 토큰 받아오기
					// localStorage.setItem('AccessToken', accessToken);
					// localStorage.setItem('Refresh_Token', refreshToken);
					var comma = ', ';
					splitString(authToken, comma);
					console.log('토큰 받아오기 성공');
				})
				.catch((response) => {
					console.log(response);
					console.log('실패');
				});
		};
		if (KAKAO_CODE) {
			//console.log(KAKAO_CODE);
			getAccessToken();
			//setTimeout(MovetoHome, 2000); // 메인 페이지로 2초 후 이동
		}
	}, []);

	return (
		<>
			<h1>회원가입을 축하합니다~</h1>
			<h3>AccessToken : {localStorage.getItem('AccessToken')}</h3>
			<h3>RefreshToken : {localStorage.getItem('RefreshToken')}</h3>
			<Link to='/'>홈으로</Link>
		</>
	);
}
export default Welcome;
