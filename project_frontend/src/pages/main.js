import React, { Fragment, useState } from 'react';
import { InfiniteScroll, CertificationCardInfiniteScroll } from '../components';
import { SlArrowDown } from 'react-icons/sl';
import { TabWrapper, TabDiv } from '../components';
import { ImFileEmpty, ImFileText2 } from 'react-icons/im';
import { BannerSlide } from '../components/main/bannerSlider';
import { isLogined } from '../utils';
import { CiStar } from 'react-icons/ci';

function Home() {
	const [boardTab, setBoardTap] = useState(0);
	const [regionTab, setRegionTap] = useState(0);

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
				<TabWrapper>
					<TabDiv>
						<CiStar
							size="4rem"
							style={{ marginRight: '0.5rem' }}
						/>
						인증
					</TabDiv>
				</TabWrapper>
				<CertificationCardInfiniteScroll />
			</div>
		</Fragment>
	);
}
export default Home;
