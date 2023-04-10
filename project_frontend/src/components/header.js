import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AiFillCaretDown } from 'react-icons/ai';
import Dropdown from './dropdown';
import { useState } from 'react';

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

const NewPostButton = styled(HeaderButton)`
	margin-right: 50px;
	@media (max-width: 778px) {
		display: none;
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

const LinkTo = styled(Link)`
	text-decoration: none;
	color: #000;
`;

const ProfileButton = styled.div`
	flex-shrink: 0;
	cursor: pointer;
`;
const Header = () => {
	const [view, setView] = useState(false);
	const location = useLocation();
	const token = axios.defaults.headers.common.Authorization;
	var isLogined = true;
	if (typeof token === 'string' && token.slice(0, 6) === 'Bearer') {
		isLogined = true;
	} else {
		isLogined = false;
	}

	return (
		<>
			{location.pathname === '/login' ? ( // login 페이지에서 헤더 표시 X
				<></>
			) : (
				<Headerdiv>
					{isLogined ? (
						<>
							{view ? <Dropdown></Dropdown> : ''}
							<div style={{ flexGrow: '1' }}></div>
							<ButtonWrap>
								<NewPostButton>
									<LinkTo to="/boards">새 글 쓰기</LinkTo>
								</NewPostButton>
								<ProfileButton
									onClick={() => {
										setView(!view);
									}}>
									<Profile />
									<AiFillCaretDown
										size={30}
										style={{ margin: '10px 0px 10px 10px' }}
									/>
								</ProfileButton>
							</ButtonWrap>
						</>
					) : (
						<>
							<div style={{ flexGrow: '1' }} />
							<ButtonWrap>
								<NewPostButton>
									<LinkTo to="/boards">새 글 쓰기</LinkTo>
								</NewPostButton>
								<HeaderButton>
									<LinkTo to="/login">로그인</LinkTo>
								</HeaderButton>
							</ButtonWrap>
						</>
					)}
				</Headerdiv>
			)}
		</>
	);
};
export default Header;
