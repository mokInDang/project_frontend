import {
	RecruitmentInfiniteScroll,
	CertificationCardInfiniteScroll,
} from '../components';
import { SlArrowRight } from 'react-icons/sl';
import { TabWrapper, TabDiv } from '../components';
import { BannerSlide } from '../components/main/bannerSlider';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

function Home() {
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<>
			<BannerSlide />
			<TabWrapper boardTab={location.pathname}>
				<div className="mainCategory">
					<div>
						<TabDiv
							onClick={() => {
								navigate('/');
							}}
							className="recruitment">
							<SlArrowRight
								style={{ marginRight: '2rem' }}
								className="recruitmentarrow"
							/>
							<span>플로깅 모집</span>
						</TabDiv>
						<TabDiv
							onClick={() => {
								navigate('certification');
							}}
							className="certification">
							<SlArrowRight
								style={{ marginRight: '2rem' }}
								className="certificationarrow"
							/>
							<span>플로깅 인증</span>
						</TabDiv>
					</div>
					<div>
						<TabDiv
							onClick={() => {
								location.pathname === '/'
									? navigate('/boards/recruitment')
									: navigate('/boards/certification');
							}}>
							<span>새 글 쓰기</span>
						</TabDiv>
					</div>
				</div>
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
		</>
	);
}
export default Home;
