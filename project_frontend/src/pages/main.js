import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Home() {
	const KAKAO_CODE = new URL(document.location.href).searchParams.get('code');
	console.log(KAKAO_CODE);
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
