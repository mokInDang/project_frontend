import styled from 'styled-components';

const DropdownDiv = styled.div`
	font-size: 23px;
	position: absolute;
	width: 220px;
	height: 220px;
	top: 120px;
	right: 100px;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
`;

const DropdownList = styled.div`
	margin: 10px 20px 10px 20px;
`;

function Dropdown() {
	return (
		<DropdownDiv>
			<DropdownList>내 작성글</DropdownList>
			<DropdownList>설정</DropdownList>
			<DropdownList>로그아웃</DropdownList>
		</DropdownDiv>
	);
}

export default Dropdown;
