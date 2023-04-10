import React, { Fragment } from 'react';
import { InfiniteScroll } from '../components';
import GetLocationButton from '../components/getLocationButton';
import { reissueToken } from '../apis';

function Home() {
	return (
		<Fragment>
			<div style={{ height: '300px', backgroundColor: '#81CC55' }}>
				<button onClick={reissueToken}>리이슈 테스트</button>
				<GetLocationButton>내 위치 받아오기</GetLocationButton>
			</div>
			{InfiniteScroll()}
		</Fragment>
	);
}
export default Home;
