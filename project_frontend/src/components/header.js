import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';
import Dropdown from './dropdown';
import { useState, useEffect } from 'react';
import { movePath, isLogined } from '../utils';
import { homeIcon } from '../assets/images';
import secureLocalStorage from 'react-secure-storage';
import { locationIcon } from '../assets/images';

const Headerdiv = styled.div`
	width: 100%;
	justify-content: center;

	.headerWrapper {
		box-sizing: border-box;
		padding: 0 5rem;
		margin: 0 auto;
		transition: all 0.2s ease-in-out;
		align-items: center;
		background: #ffffff;
		display: flex;
		height: 9rem;
		@media (min-width: 1600px) {
			height: 11rem;
			padding: 0 3rem;
			max-width: 161rem;
		}
		@media (max-width: 778px) {
			padding: 0 3rem;
		}
		@media (max-width: 425px) {
			padding: 0 2rem;
		}
	}
	.logoWrapper {
		flex-grow: 1;
		.HomebuttonWrapper {
			cursor: pointer;
		}
		div {
			display: flex;
			align-items: center;
			font-family: NanumSquareNeo;
			font-weight: 900;
			font-size: 3rem;
			img {
				width: 3.5rem;
				margin-right: 2rem;
			}
		}
	}
	.myRegion {
		margin-right: 5rem;
		text-shadow: none;
		display: flex;
		align-items: center;
		img {
			width: 3.5rem;
			margin: 1rem;
		}
		@media (max-width: 778px) {
			margin-right: 3rem;
		}
	}
	.newPost {
		margin-right: 5rem;
		cursor: pointer;
		@media (max-width: 778px) {
			display: none;
		}
	}
`;

const HeaderButton = styled.div`
	color: #000000;
	flex-shrink: 0;
	font-weight: 700;
	font-size: 2.4rem;
	height: 100%;
	text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
	cursor: pointer;
`;

const GlobalProfile = styled.div`
	border-radius: 50%;
	border: 1px solid rgba(0, 0, 0, 0.1);
	margin-right: 0.5rem;
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	background: url(${(props) =>
			props.src &&
			props.src !== 'DEFAULT_PROFILE_IMAGE_URL' &&
			props.src !== null
				? props.src
				: 'https://s3.ap-northeast-2.amazonaws.com/dongnejupging.profile.image.bucket/profile_image/%EC%9E%84%EC%8B%9C%ED%94%84%EB%A1%9C%ED%95%84.PNG'})
		no-repeat center/cover;
`;

const ButtonWrap = styled.div`
	align-items: center;
	display: flex;
`;

const ProfileWrap = styled.div`
	flex-shrink: 0;
	display: flex;
	cursor: pointer;
	justify-content: end;
	align-items: center;
`;
const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isLogined, setIsLogined] = useState(false);
	let [userInfo, setUserInfo] = useState({ region: 'DEFAULT_REGION' });
	const [view, setView] = useState(false);

	useEffect(() => {
		if (secureLocalStorage.getItem('accessToken')) {
			setIsLogined(true);
			setUserInfo(secureLocalStorage.getItem('userInfo'));
			console.log(userInfo);
		} else {
			setIsLogined(false);
		}
	}, []);

	// const getUserInfo = () => {
	// 	if (isLogined) {
	// 		setUserInfo(secureLocalStorage.getItem('userInfo'));
	// 	}
	// };

	useEffect(() => {
		setView(false);
	}, [location.pathname]); // 페이지 이동 시 dropdown view false로
	// secureLocalStorage.setItem('accessToken', 'Bearer Token');

	return (
		<>
			{location.pathname !== '/login' && (
				<Headerdiv>
					<div className="headerWrapper">
						<div className="logoWrapper">
							<div>
								<div
									className="HomebuttonWrapper"
									onClick={() => movePath(navigate, '/')}>
									<img
										src={homeIcon}
										alt="homeIcon"
									/>
									우리동네줍깅
								</div>
							</div>
						</div>
						{location.pathname !== '/api/auth/join' && (
							<ButtonWrap>
								{isLogined && userInfo.region !== 'DEFAULT_REGION' ? (
									<div className="myRegion">
										<img
											src={locationIcon}
											alt="locationIcon"
										/>
										<HeaderButton>{userInfo.region}</HeaderButton>
									</div>
								) : (
									<></>
								)}
								<HeaderButton
									className="newPost"
									onClick={() =>
										// isLogined(navigate, '/boards/recruitment')
										navigate('/boards/recruitment')
									}>
									새 글 쓰기
								</HeaderButton>
								{isLogined ? (
									<ProfileWrap
										onClick={() => {
											setView(!view);
										}}>
										<GlobalProfile
											size="5rem"
											src={userInfo.profileImageUrl}
										/>
										<AiFillCaretDown size={'3rem'} />
										{view ? <Dropdown /> : ''}
									</ProfileWrap>
								) : (
									<HeaderButton onClick={() => movePath(navigate, '/login')}>
										로그인
									</HeaderButton>
								)}
							</ButtonWrap>
						)}
					</div>
				</Headerdiv>
			)}
		</>
	);
};
export { Header, GlobalProfile };
