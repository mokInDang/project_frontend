import styled from 'styled-components';
import { onLogout } from '../apis';
import { useNavigate } from 'react-router-dom';
import { movePath } from '../hooks/movePath';

const DropdownDiv = styled.div`
	z-index: 10000;
	background-color: #ffffff;
	box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column;
	position: absolute;
	right: 5%;
	top: 120px;
	width: 220px;
	justify-content: space-around;
	.newPost {
		display: none;
		@media (max-width: 768px) {
			display: block;
		}
	}
`;

const DropdownList = styled.div`
	cursor: pointer;
	font-family: 'NanumSquare_acR';
	font-style: normal;
	font-weight: 700;
	font-size: 23px;
	line-height: 25px;
	padding: 20px;
	:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
	:active {
		background-color: rgba(0, 0, 0, 0.2);
	}
`;
function Dropdown() {
	const navigate = useNavigate();
	return (
		<DropdownDiv>
			<DropdownList
				className="newPost"
				onClick={() => movePath(navigate, '/boards')}>
				새 글 쓰기
			</DropdownList>
			<DropdownList>내 작성글</DropdownList>
			<DropdownList>설정</DropdownList>
			<DropdownList onClick={onLogout}>로그아웃</DropdownList>
		</DropdownDiv>
	);
}

export default Dropdown;
