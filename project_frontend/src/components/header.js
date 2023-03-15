import styled from 'styled-components';
import GetLocationButton from './getLocationButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiFillCaretDown } from 'react-icons/ai';
import Dropdown from './dropdown';
import { useState } from 'react';

const Headerdiv = styled.div`
	top: 0;
	width: 100%;
	height: 160px;
	background: #ffffff;
	align-items: center;
	display: flex;
`;

const HeaderButton = styled.div`
	direction: rtl;
	display: inline-block;
	height: 100%;
	margin: 0px 0px 0px 20px;
	font-weight: 700;
	font-size: 30px;
	color: #000000;
	text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
`;
const Profile = styled.div`
	display: inline-block;
	border-radius: 50%;
	background: #555;
	height: 50px;
	width: 50px;
`;

const Header = () => {
	const [view, setView] = useState(false);
	const token = axios.defaults.headers.common.Authorization;
	var isLogined = true;
	// Todo : 로그아웃 시 Authorization undefined로 설정해줄 것
	if (typeof token === 'string' && token.slice(0, 6) === 'Bearer') {
		isLogined = true;
	} else {
		isLogined = false;
	}
	{
		typeof token === 'string' && token.slice(0, 6) === 'Bearer'
			? (isLogined = true)
			: (isLogined = false);
	}
	return (
		<Headerdiv>
			{isLogined ? (
				<>
					{view ? <Dropdown></Dropdown> : ''}
					<div style={{ flex: '1 0 auto' }}></div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							margin: '0px 100px 0px 30px',
						}}>
						<Link
							to="/boards"
							style={{ textDecoration: 'none' }}>
							<HeaderButton>새 글 쓰기</HeaderButton>
						</Link>
						<div
							style={{
								marginLeft: `20px`,
							}}
							onClick={() => {
								setView(!view);
							}}>
							<Profile />
							<AiFillCaretDown
								size={30}
								style={{ margin: '10px' }}
							/>
						</div>
					</div>
				</>
			) : (
				<>
					<div style={{ flex: '1 0 auto' }}></div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							margin: '0px 100px 0px 30px',
						}}>
						<Link
							to="/boards"
							style={{ textDecoration: 'none' }}>
							<HeaderButton>새 글 쓰기</HeaderButton>
						</Link>
						<Link
							to="/login"
							style={{ textDecoration: 'none' }}>
							<HeaderButton>로그인</HeaderButton>
						</Link>
					</div>
				</>
			)}
		</Headerdiv>
	);
};
export default Header;
