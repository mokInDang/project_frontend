import { ImFileEmpty, ImFileText2 } from 'react-icons/im';
import { TabWrapper, TabDiv } from '../../components';
import { useNavigate, useLocation, Outlet } from 'react-router';
import { fireEmoji } from '../../assets/images';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';

const WidgetDiv = styled.div`
	position: relative;
	font-weight: 700;
	line-height: 1.3;
	font-family: NanumSquareNeo;
	.titleWrap {
		img {
			height: 2rem;
			margin-right: 1rem;
		}
		div {
			flex-shrink: 0;
		}
		display: inline-flex;
		font-size: 2rem;
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
		font-family: NanumSquare;
		font-weight: 900;
		font-size: 1.7rem;
		display: flex;
		flex-direction: column;
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
				text-decoration: underline wavy rgba(129, 204, 85, 0.5);
				text-underline-position: under;
			}
			:hover {
				.regionName {
					text-decoration: underline dotted rgba(129, 204, 85, 0.5);
				}
			}
		}
	}
`;
const Widget = () => {
	const [list, setList] = useState([
		'동작구',
		'관악구',
		'용산구',
		'서초구',
		'영등포구',
	]);
	const getRegionRank = () => {
		axios
			.get('/api/boards/recruitment/region-rank?page=0&size=5')
			.then((res) => {
				const data = res.data;
				// console.log(data);
				setList(res.data.regions);
			})
			.catch((error) => console.log(error));
	};
	useEffect(() => {
		getRegionRank();
	}, []);
	useEffect(() => {
		// console.log(list);
	}, [list]);
	return (
		<div className='widget'>
			<WidgetDiv>
				{/* <div className='connectLine'></div> */}
				<div className='titleWrap'>
					<img src={fireEmoji} />
					<div>지역별 플로깅 랭킹</div>
				</div>
				<ul className='regionList'>
					<div>
						{list &&
							list.map(function (element, i) {
								return (
									<li key={i}>
										<div className='regionIndex'>{i + 1}.</div>
										<div className='regionName'>{element.region}</div>
									</li>
								);
							})}
					</div>
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
			<TabWrapper regionTab={regionTab}>
				<TabDiv
					onClick={(e) => {
						// e.preventDefault();
						navigate('/');
					}}
					className='regionTab entireRegion'
				>
					<ImFileEmpty size='2.5rem' style={{ marginRight: '1rem' }} />
					전체
				</TabDiv>
				<TabDiv
					onClick={(e) => {
						e.preventDefault();
						navigate('/recruitment/myregion');
						// isLogined(setRegionTab, 'myRegion', navigate);
					}}
					className='regionTab myRegion'
				>
					<ImFileText2 size='2.5rem' style={{ marginRight: '1rem' }} />내 지역
				</TabDiv>
			</TabWrapper>
			<div className='infiniteScrollWrap'>
				<div className='widgetWrapper'>
					<div className='widgetSection'>
						<div className='widgetDiv'>
							<Widget></Widget>
						</div>
					</div>
				</div>
				<Outlet />
			</div>
		</>
	);
};
export { RecruitmentInfiniteScroll };
