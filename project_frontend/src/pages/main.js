import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components';
import PropTypes from 'prop-types';

const KAKAO_CODE = new URL(document.location.href).searchParams.get('code');
function Home() {
	window.history.pushState(KAKAO_CODE, '', `/`);
	console.log(KAKAO_CODE);
	localStorage.setItem('authorizationCode', KAKAO_CODE);
	if (KAKAO_CODE) {
		alert('로그인을 축하드립니다.'); // 모달알림창구현해보기
	}
	useEffect(() => {
		var today = new Date();
		console.log(today);
		let data = { authorizationCode: KAKAO_CODE };
		const getAccessToken = async () => {
			await axios
				.post(
					"http://15.165.153.213:8080/api/member/join",
					JSON.stringify(data),
					{
						headers: { 'Content-Type': `application/json` },
					}
				)
				.then((res) => {
					console.log(KAKAO_CODE);
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
			getAccessToken(); // 메인 페이지로 2초 후 이동
		}
	});
	return (
		<Fragment>
			<Header />
			<div>메인 페이지_글쓰기 화면 구현</div>
			<div>
				<Link to="/login">로그인</Link>
			</div>
			<div>
				<Link to="/boards">글쓰기</Link>
			</div>
		</Fragment>
	);
}
export default Home;
