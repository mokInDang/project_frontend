import styled from 'styled-components';

const Headerdiv = styled.div`
	top: 0;
	left: 0;
	right: 0;
	width: 100%;

	height: 80px;
	position: sticky;
	background: #8a4baf;
`;

const Header = () => {
	return <Headerdiv />;
};
export default Header;
