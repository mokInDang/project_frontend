import React, { Fragment } from 'react';
import {
	RecruitmentInfiniteScroll,
	CertificationCardInfiniteScroll,
} from '../components';
import { SlArrowDown } from 'react-icons/sl';
import { TabWrapper, TabDiv } from '../components';
import { BannerSlide } from '../components/main/bannerSlider';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

function Home() {
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<Fragment>
			<BannerSlide />
			<TabWrapper boardTab={location.pathname}>
				<TabDiv
					onClick={() => {
						navigate('/');
					}}
					className="recruitment">
					<SlArrowDown style={{ marginRight: '2rem' }} />
					<span>플로깅 모집</span>
				</TabDiv>
				<TabDiv
					onClick={() => {
						navigate('certification');
					}}
					className="proofShots">
					<SlArrowDown style={{ marginRight: '2rem' }} />
					<span>플로깅 인증</span>
				</TabDiv>
			</TabWrapper>
			<Routes>
				<Route
					exact
					path={'/'}
					element={<RecruitmentInfiniteScroll />}
				/>
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
