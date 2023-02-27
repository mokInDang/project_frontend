import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const KAKAO_CODE = new URL(document.location.href).searchParams.get('code');

function Home() {
	window.history.pushState(KAKAO_CODE, '', `/`);
	console.log(KAKAO_CODE);
	localStorage.setItem('authorizationCode', KAKAO_CODE);
	if (KAKAO_CODE) {
		alert('로그인을 축하드립니다.'); // 모달알림창구현해보기
	}
	useEffect(() => {
		const getAccessToken = async () => {
			await axios({
				url: `/api/member/join`, //서버 url로 수정하기
				method: 'post',
				headers: {
					Authorization: `${ KAKAO_CODE }`,
				},
			})
				.then((res) => {
					console.log(KAKAO_CODE);
					//인가코드를 보내고 나면
					let accessToken = res.data.accessToken; //액세스 토큰 받아오기
					let refreshToken = res.headers['refresh-token']; //리프레쉬 토큰 받아오기
					localStorage.setItem('AccessToken', accessToken);
					localStorage.setItem('Refresh_Token', refreshToken);
					console.log('토큰 받아오기 성공');
				})
				.catch((response) => {
					console.log(response);
				});
		};
		if (KAKAO_CODE) {
			getAccessToken(); // 메인 페이지로 2초 후 이동
		}
	});
	return (
		<Fragment>
			<div>메인 페이지_code formatting</div>
			<div>
				<Link to="login">로그인</Link>
			</div>
		</Fragment>
	);
}
export default Home;
