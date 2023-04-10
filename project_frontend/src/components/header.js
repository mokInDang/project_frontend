import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';
import Dropdown from './dropdown';
import { useState, useEffect } from 'react';
import { movePath } from '../hooks/movePath';
import { homeIcon } from '../assets/images';
import axios from 'axios';

const Headerdiv = styled.div`
	align-items: center;
	background: #ffffff;
	display: flex;
	height: 110px;
	top: 0;
	width: 100%;
	box-sizing: border-box;
	padding: 0 5rem;
	transition: all 0.2s ease-in-out;
	@media (max-width: 778px) {
		height: 90px;
	}
	.NewPost {
		margin-right: 50px;
		@media (max-width: 778px) {
			display: none;
		}
	}
`;

const HeaderButton = styled.div`
	color: #000000;
	flex-shrink: 0;
	font-family: NanumSquare_acR;
	font-weight: 700;
	font-size: 24px;
	height: 100%;
	text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
`;

const Profile = styled.div`
	border-radius: 50%;
	border: 1px solid rgba(0, 0, 0, 0.1);
	margin-right: 1rem;
	height: 50px;
	width: 50px;
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
	justify-content: center;
	align-items: center;
`;
const Header = (props) => {
	const navigate = useNavigate();
	const [view, setView] = useState(false);
	const location = useLocation();
	const [userInfo, setUserInfo] = useState({});
	var isLogined = false;

	const token = axios.defaults.headers.common.Authorization;
	if (typeof token === 'string' && token.slice(0, 6) === 'Bearer') {
		props.getIsLogined(true);
		isLogined = true;
	} else {
		props.getIsLogined(false);
		isLogined = false;
	}

	useEffect(() => {
		if (location.pathname === '/' && location.state !== null) {
			setUserInfo(location.state);
		} else setUserInfo({});
		console.log(`userInfo : ${JSON.stringify(userInfo)}`);
	}, [location.state, location.pathname]); // 로그인 시 state로 넘겨받은 userInfo 저장

	useEffect(() => {
		setView(false);
	}, [location.pathname]); // 페이지 이동 시 dropdown view false로

	return (
		<>
			{location.pathname === '/login' ||
			location.pathname === '/api/auth/join' ? ( // login 페이지에서 헤더 표시 X
				<></>
			) : (
				<Headerdiv>
					<>
						{view ? <Dropdown /> : ''}
						<div style={{ flexGrow: '1' }}>
							<img
								src={homeIcon}
								alt="homeIcon"
								onClick={() => movePath(navigate, '/')}
								style={{ width: '4rem' }}
							/>
						</div>
						<ButtonWrap>
							<HeaderButton
								className="NewPost"
								onClick={() => movePath(navigate, '/boards')}>
								새 글 쓰기
							</HeaderButton>
							{isLogined ? (
								<ProfileWrap
									onClick={() => {
										setView(!view);
									}}>
									<Profile
										src={
											userInfo.profileImage !== undefined
												? userInfo.profileImage
												: 'DEFAULT_PROFILE_IMAGE_URL'
										}
									/>
									<AiFillCaretDown size={30} />
								</ProfileWrap>
							) : (
								<HeaderButton onClick={() => movePath(navigate, '/login')}>
									로그인
								</HeaderButton>
							)}
						</ButtonWrap>
					</>
				</Headerdiv>
			)}
		</>
	);
};
export default Header;
