import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import { Header, InfiniteScroll } from '../components';
import { Header, InfiniteScroll } from '../components';
import GetLocationButton from '../components/getLocationButton';
import { reissueToken } from '../apis';

function Home() {
	console.log(axios.defaults.headers.common['Authorization']);
	return (
		<Fragment>
			<Header />
			<div style={{ height: '300px', backgroundColor: '#81CC55' }}>
				<button onClick={reissueToken}>리이슈 테스트</button>
				<GetLocationButton>내 위치 받아오기</GetLocationButton>
			</div>
			{InfiniteScroll()}
		</Fragment>
	);
}
export default Home;
