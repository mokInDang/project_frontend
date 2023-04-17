import React, { Fragment, useState } from 'react';
import { InfiniteScroll } from '../components';
import { SlArrowDown } from 'react-icons/sl';
import { TabWrapper, TabDiv } from '../components';
import { ImFileEmpty, ImFileText2 } from 'react-icons/im';
import GetLocationButton from '../components/getLocationButton';
import { BannerSlide } from '../components/main/bannerSlider';
import secureLocalStorage from 'react-secure-storage';

function Home() {
	const [boardTab, setBoardTap] = useState(0);
	const [regionTab, setRegionTap] = useState(0);

	const isLogined = (func, value) => {
		if (secureLocalStorage.getItem('accessToken')) {
			func(value);
		} else {
			alert('로그인 후 이용하실 수 있습니다.');
		}
	};
	return (
		<Fragment>
			<BannerSlide />
			<TabWrapper boardTab={boardTab}>
				<TabDiv
					onClick={(e) => {
						e.preventDefault();
						setBoardTap(0);
					}}
					className="recruitment">
					<SlArrowDown style={{ marginRight: '2rem' }} />
					<span>구인 게시판</span>
				</TabDiv>
				<TabDiv
					onClick={(e) => {
						e.preventDefault();
						setBoardTap(1);
					}}
					className="proofShots">
					<SlArrowDown style={{ marginRight: '2rem' }} />
					<span>인증 게시판</span>
				</TabDiv>
			</TabWrapper>
			<div style={boardTab ? { display: 'none' } : { display: 'block' }}>
				<TabWrapper regionTab={regionTab}>
					<TabDiv
						onClick={(e) => {
							e.preventDefault();
							setRegionTap(0);
						}}
						className="entireRegion">
						<ImFileEmpty
							size="2.5rem"
							style={{ marginRight: '1rem' }}
						/>
						전체
					</TabDiv>
					<TabDiv
						onClick={(e) => {
							e.preventDefault();
							isLogined(setRegionTap, 1);
						}}
						className="myRegion">
						<ImFileText2
							size="2.5rem"
							style={{ marginRight: '1rem' }}
						/>
						내 지역
					</TabDiv>
				</TabWrapper>
				<div style={regionTab ? { display: 'none' } : { display: 'block' }}>
					<InfiniteScroll regionTab={regionTab} />
				</div>
				{regionTab ? <InfiniteScroll regionTab={regionTab} /> : <></>}
			</div>
			<div style={!boardTab ? { display: 'none' } : { display: 'block' }}>
				<GetLocationButton />
			</div>
		</Fragment>
	);
}
export default Home;
