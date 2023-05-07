import React, { Fragment, useState, useEffect } from 'react';
import {
	RecruitmentInfiniteScroll,
	CertificationCardInfiniteScroll,
} from '../components';
import { SlArrowDown } from 'react-icons/sl';
import { TabWrapper, TabDiv } from '../components';
import { BannerSlide } from '../components/main/bannerSlider';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

function Home() {
	const [boardTab, setBoardTap] = useState(0);
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		!boardTab ? navigate('/') : navigate('certification');
	}, [boardTab]);
	useEffect(() => {
		if (location.pathname == '/') {
			setBoardTap(0);
		}
	}, [location.pathname]);
	return (
		<Fragment>
			<BannerSlide />
			<TabWrapper boardTab={boardTab}>
				<TabDiv
					onClick={() => {
						setBoardTap(0);
					}}
					className="recruitment">
					<SlArrowDown style={{ marginRight: '2rem' }} />
					<span>플로깅 모집</span>
				</TabDiv>
				<TabDiv
					onClick={() => {
						setBoardTap(1);
					}}
					className="proofShots">
					<SlArrowDown style={{ marginRight: '2rem' }} />
					<span>플로깅 인증</span>
				</TabDiv>
			</TabWrapper>
			<div style={{ display: !boardTab ? 'block' : 'none' }}>
				<RecruitmentInfiniteScroll />
			</div>
			<Routes>
				<Route
					exact
					path={'certification'}
					element={<CertificationCardInfiniteScroll />}
				/>
			</Routes>
		</Fragment>
	);
}
export default Home;
