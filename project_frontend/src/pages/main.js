import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const KAKAO_CODE = new URL(document.location.href).searchParams.get('code');

function Home() {
	console.log(KAKAO_CODE);
	window.history.pushState(KAKAO_CODE, '', `/`);
	localStorage.setItem('authorizationCode', KAKAO_CODE);
	if (KAKAO_CODE){
		alert("로그인을 축하드립니다."); // 모달알림창구현해보기
	}
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
