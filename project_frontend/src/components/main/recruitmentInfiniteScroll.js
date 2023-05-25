import { useState } from 'react';
import { ImFileEmpty, ImFileText2 } from 'react-icons/im';
import { isLogined, RegionRequiredRoutes, PrivateRoutes } from '../../utils';
import { InfiniteScroll, MyRegionInfiniteScroll } from './infiniteScroll';
import { TabWrapper, TabDiv } from '../../components';
import { Routes, Route, useNavigate, useLocation, Outlet } from 'react-router';
const RecruitmentInfiniteScroll = () => {
	var regionTab = 'all';
	const navigate = useNavigate();
	const location = useLocation();
	if (location.pathname.includes('myregion')) {
		regionTab = 'myRegion';
	} else {
		regionTab = 'all';
	}

	return (
		<>
			<TabWrapper regionTab={regionTab}>
				<TabDiv
					onClick={(e) => {
						// e.preventDefault();
						navigate('/');
					}}
					className='regionTab entireRegion'>
					<ImFileEmpty size='2.5rem' style={{ marginRight: '1rem' }} />
					전체
				</TabDiv>
				<TabDiv
					onClick={(e) => {
						e.preventDefault();
						navigate('/recruitment/myregion');
						// isLogined(setRegionTab, 'myRegion', navigate);
					}}
					className='regionTab myRegion'>
					<ImFileText2 size='2.5rem' style={{ marginRight: '1rem' }} />내 지역
				</TabDiv>
			</TabWrapper>
			<Outlet />
		</>
	);
};
export { RecruitmentInfiniteScroll };
