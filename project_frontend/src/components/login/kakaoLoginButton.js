import React from 'react';
import styled from 'styled-components';
import { kakao_login_large_narrow } from '../../assets/images';

const StyledButton = styled.button`
	background-image: url(${kakao_login_large_narrow});
	background-repeat: no-repeat;
	background-size: cover;
	/* padding: -10px; */
	color: transparent;
	width: 300px;
	height: 45px;
	border: none;
`;

function kakaoLoginButton() {
	const REST_API_KEY = '60b35611c843f6c8f618a495ecc8eaf6';
	const REDIRECT_URI = 'http://localhost:3000/api/member/join';
	const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

	return (
		<a href={KAKAO_AUTH_URL}>
			<StyledButton />
		</a>
	);
}

export default kakaoLoginButton;
