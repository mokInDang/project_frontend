import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MovetoHome() {
	window.location.replace('/');
}
function Welcome() {
	const KAKAO_CODE = new URL(document.location.href).searchParams.get('code');
	useEffect(() => {
		let data = { authorizationCode: KAKAO_CODE };
		console.log(`카카오 코드 확인 : ${data}`);
		const getAccessToken = async () => {
			console.log(`getAccessToken 실행`);
			await axios
				.post('/api/member/join', JSON.stringify(data), {
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': `https://www.dongnejupging.xyz`,
					},
				})
				.then((res) => {
					// accessToken 설정
					const { Token } = res.headers.get('Authorization');
					axios.defaults.headers.common['Authorization'] = `${Token}`;
					console.log(
						`http header Authorization 필드에 기본으로 Access Token 삽입 ${Token}`
					);
					const { Alias } = res.data.alias;
					console.log(res.data);
					console.log(Alias);
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
			<Link to='/'>홈으로</Link>
		</>
	);
}
export default Welcome;
