import { ImFileEmpty, ImFileText2 } from 'react-icons/im';
import { TabWrapper, TabDiv } from '../../components';
import { useNavigate, useLocation, Outlet } from 'react-router';
import { fireEmoji } from '../../assets/images';
import styled from 'styled-components';

const WidgetDiv = styled.div`
	position: relative;
	font-weight: 700;
	line-height: 1.3;
	.titleWrap {
		img {
			height: 1.8rem;
			margin-right: 1rem;
		}
		div {
			flex-shrink: 0;
		}
		display: inline-flex;
		font-size: 1.8rem;
		background: white;
		padding-right: 1rem;
		padding-bottom: 1rem;
	}
	.connectLine {
		border: 0.3rem solid rgba(217, 217, 217, 0.6);
		border-left: none;
		width: 8rem;
		height: 7rem;
		position: absolute;
		top: 0.7rem;
		left: 50%;
		z-index: -1;
	}
	.regionList {
		padding: 2rem 3.5rem;
		background: rgba(245, 245, 245);
		border-radius: 2.5rem;
		font-size: 1.5rem;
		margin: 0;
		margin-top: 0.5rem;
		line-height: 2;
		li {
			display: flex;
			.regionIndex {
				color: rgba(129, 204, 85);
				margin-right: 1rem;
			}
			.regionName {
				flex-shrink: 0;
				text-decoration: underline;
				text-underline-position: under;
			}
			:hover {
				.regionName {
					text-decoration: underline wavy rgba(129, 204, 85, 0.5);
				}
			}
		}
	}
`;
const Widget = () => {
	const list = ['동작구', '관악구', '용산구', '서초구', '영등포구'];
	return (
		<div className='widget'>
			<WidgetDiv>
				<div className='connectLine'></div>
				<div className='titleWrap'>
					<img src={fireEmoji} />
					<div>
						현재 플로깅이
						<br />
						HOT한 지역
					</div>
				</div>
				<ul className='regionList'>
					{list.map(function (element, i) {
						return (
							<li key={i}>
								<div className='regionIndex'>{i + 1}.</div>
								<div className='regionName'>{element}</div>
							</li>
						);
					})}
				</ul>
			</WidgetDiv>
		</div>
	);
};
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
			<div className='widgetWrapper'>
				<div className='widgetSection'>
					<div className='widgetDiv'>
						<Widget></Widget>
					</div>
				</div>
			</div>
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
			<div className='infiniteScrollWrap'>
				<Outlet />
			</div>
		</>
	);
};
export { RecruitmentInfiniteScroll };
