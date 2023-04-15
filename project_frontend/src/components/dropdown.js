import styled from 'styled-components';
import { onLogout } from '../apis';
import { useNavigate } from 'react-router-dom';
import { movePath } from '../hooks/movePath';

const DropDownWrapper = styled.div`
	position: absolute;
	top: 8rem;

	@media (max-width: 1440px) {
		top: 9rem;
	}
	@media (max-width: 778px) {
		top: 8rem;
	}
	.newPost {
		display: none;
		@media (max-width: 778px) {
			display: block;
		}
	}
`;
const DropdownDiv = styled.div`
	z-index: 10000;
	background-color: #ffffff;
	box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column;
	width: 22rem;
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
function Dropdown() {
	const navigate = useNavigate();
	return (
		<DropDownWrapper>
			<DropdownDiv>
				<DropdownList
					className="newPost"
					onClick={() => movePath(navigate, '/boards')}>
					새 글 쓰기
				</DropdownList>
				<DropdownList>내 작성글</DropdownList>
				<DropdownList>마이페이지</DropdownList>
				<DropdownList onClick={onLogout}>로그아웃</DropdownList>
			</DropdownDiv>
		</DropDownWrapper>
	);
}

export default Dropdown;
