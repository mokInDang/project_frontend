import React, { Fragment, useState } from 'react';
import { InfiniteScroll } from '../components';
import { SlArrowDown } from 'react-icons/sl';
import { TabWrapper, TabDiv } from '../components';
import { banner } from '../assets/images';
import { ImFileEmpty, ImFileText2 } from 'react-icons/im';

function Home() {
	const [boardTab, setBoardTap] = useState(0);
	const [regionTab, setRegionTap] = useState(0);
	console.log(regionTab);
	return (
		<Fragment>
			<div
				style={{
					height: '35rem',
					background: `#81CC55 url(${banner}) no-repeat center center`,
					backgroundSize: 'contain',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<div
					style={{
						fontSize: '4rem',
						textAlign: 'center',
						margin: 'auto 0',
						fontWeight: '700',
						lineHeight: '6rem',
						letterSpacing: '0.1rem',
					}}>
					<div>
						<span
							style={{
								fontFamily: 'NanumSquareNeo',
								fontWeight: '900',
								fontSize: '5rem',
							}}>
							환경도 건강도 동시
						</span>
						에 챙기자!
					</div>
					<div>함께할 친구를 찾으세요!</div>
				</div>
				{/* <button onClick={() => reissueToken()}>리이슈 테스트</button>
				<GetLocationButton>내 위치 받아오기</GetLocationButton> */}
			</div>
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
							setRegionTap(1);
						}}
						className="myRegion">
						<ImFileText2
							size="2.5rem"
							style={{ marginRight: '1rem' }}
						/>
						내 지역
					</TabDiv>
				</TabWrapper>
				<InfiniteScroll
					style={regionTab ? { display: 'none' } : { display: 'block' }}
				/>
			</div>
			<div style={!boardTab ? { display: 'none' } : { display: 'block' }}>
				인증게시판
			</div>
		</Fragment>
	);
}
export default Home;
