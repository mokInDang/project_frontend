import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../components';
import PropTypes from 'prop-types';
import GetLocationButton from '../components/getLocationButton';
import { reissueToken } from '../apis';

function Home() {
	return (
		<Fragment>
			<Header />
			<div>메인 페이지_글쓰기 화면 구현</div>
			<button onClick={reissueToken}>리이슈 테스트</button>
			<div>
				<Link to="/boards">글쓰기</Link>
			</div>
			<GetLocationButton>내 위치 받아오기</GetLocationButton>
		</Fragment>
	);
}
export default Home;
