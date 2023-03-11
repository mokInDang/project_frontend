import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components';
import PropTypes from 'prop-types';
import GetLocationButton from '../components/getLocationButton';
import { onSilentRefresh } from '../apis';

function Home() {
	const reissueTest = () => {
		const token = axios.defaults.headers.common.Authorization;
		console.log(token);
		if (typeof token === 'string' && token.slice(0, 6) === 'Bearer') {
			// 로그아웃 시 Authorization undefined로
			onSilentRefresh();
		} else
			console.log('typeof axios default header Authorization is not string');
	};
	return (
		<Fragment>
			<Header />
			<div>메인 페이지_글쓰기 화면 구현</div>
			<button onClick={reissueTest}>리이슈 테스트</button>
			<div>
				<Link to="/login">로그인</Link>
			</div>
			<div>
				<Link to="/boards">글쓰기</Link>
			</div>
			<GetLocationButton>내 위치 받아오기</GetLocationButton>
		</Fragment>
	);
}
export default Home;
