import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';
import Dropdown from './dropdown';
import { useState, useEffect } from 'react';
import { movePath } from '../hooks/movePath';
import { homeIcon } from '../assets/images';

const Headerdiv = styled.div`
	align-items: center;
	background: #ffffff;
	display: flex;
	height: 110px;
	top: 0;
	width: 100%;
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
	@media (max-width: 500px) {
	}
`;

const Profile = styled.div`
	border-radius: 50%;
	background: #555;
	display: inline-block;
	height: 50px;
	width: 50px;
`;

const ButtonWrap = styled.div`
	align-items: center;
	display: flex;
	margin: 0px 5% 0px 0px;
	@media (max-width: 778px) {
		margin-right: 7%;
	}
`;

const ProfileWrap = styled.div`
	flex-shrink: 0;
	cursor: pointer;
`;
const Header = (props) => {
	const navigate = useNavigate();
	const [view, setView] = useState(false);
	const location = useLocation();
	const [userInfo, setUserInfo] = useState({});
	useEffect(() => {
		if (location.state !== null) {
			setUserInfo(location.state);
			console.log(userInfo);
		}
	}, [location.state]); // 로그인 시 state로 넘겨받은 userInfo 저장

	useEffect(() => {
		setView(false);
	}, [location.pathname]); // 페이지 이동 시 dropdown view false로

	var isLogined = props.isLogined;
	return (
		<>
			{location.pathname === '/login' ? ( // login 페이지에서 헤더 표시 X
				<></>
			) : (
				<Headerdiv>
					<>
						{view ? <Dropdown /> : ''}
						<div style={{ flexGrow: '1' }}>
							<img
								src={homeIcon}
								onClick={() => movePath(navigate, '/')}
								style={{ width: '4rem', marginLeft: '3rem' }}
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
									<Profile />
									<AiFillCaretDown
										size={30}
										style={{ margin: '10px 0px 10px 10px' }}
									/>
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
