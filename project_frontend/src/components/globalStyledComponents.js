import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LinkTo = styled(Link)`
	text-decoration: none;
	color: #000;
`;

const Profile = styled.div`
	display: inline-block;
	border-radius: 50%;
	background: #555;
	height: 50px;
	width: 50px;
`;

export { LinkTo, Profile };
