import styled from 'styled-components';
import { onLogout } from '../apis';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const DropDownWrapper = styled.div`
	z-index: 101;
	position: absolute;
	top: 8rem;
	@media (min-width: 1600px) {
		top: 9.5rem;
	}
`;
const DropdownDiv = styled.div`
	background-color: #ffffff;
	box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column;
	width: 20rem;
	justify-content: space-around;
`;

const DropdownList = styled.div`
	cursor: pointer;
	font-style: normal;
	font-weight: 700;
	font-size: 2.3rem;
	line-height: 2.5rem;
	padding: 2rem;
	:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
	:active {
		background-color: rgba(0, 0, 0, 0.2);
	}
`;
function Dropdown({ setDropdownView, dropMenuRef }) {
	const navigate = useNavigate();
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropMenuRef.current && !dropMenuRef.current.contains(e.target)) {
				setDropdownView(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropMenuRef]);
	return (
		<DropDownWrapper>
			<DropdownDiv>
				{/* <DropdownList>내 작성글</DropdownList> */}
				<DropdownList onClick={() => navigate('/mypage')}>
					마이페이지
				</DropdownList>
				<DropdownList onClick={onLogout}>로그아웃</DropdownList>
			</DropdownDiv>
		</DropDownWrapper>
	);
}

export { Dropdown };
