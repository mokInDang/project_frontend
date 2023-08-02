import {
	RecruitmentInfiniteScroll,
	CertificationCardInfiniteScroll,
} from '../components';
import { SlArrowRight } from 'react-icons/sl';
import { TabWrapper, TabDiv, TabContentWrapper } from '../components';
import { BannerSlide } from '../components/main/bannerSlider';
import {
	Routes,
	Route,
	Outlet,
	useNavigate,
	useLocation,
} from 'react-router-dom';

function Home() {
	const navigate = useNavigate();
	const location = useLocation();
	var boardTab = 'recruitment';
	if (location.pathname.includes('certification')) {
		boardTab = 'certification';
	} else {
		boardTab = 'recruitment';
	}
	return (
		<>
			<BannerSlide />
			<TabContentWrapper>
				<TabWrapper boardTab={boardTab}>
					<div className='mainCategory'>
						<div>
							<TabDiv
								onClick={() => {
									navigate('/');
								}}
								className='recruitment'>
								<SlArrowRight
									style={{ marginRight: '2rem' }}
									className='recruitmentarrow'
								/>
								<span>플로깅 모집</span>
							</TabDiv>
							<TabDiv
								onClick={() => {
									navigate('certification');
								}}
								className='certification'>
								<SlArrowRight
									style={{ marginRight: '2rem' }}
									className='certificationarrow'
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
				<Outlet />
			</TabContentWrapper>
		</>
	);
}
export default Home;
