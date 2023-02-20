import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { JoinComment, KakaoLoginButton } from '../components';
import { TfiClose } from 'react-icons/tfi';

const LoginPageWrap = styled.div`
	text-align: center;
	padding-top: 203px;
	user-select: none;
`;
const LoginComments = styled.div`
	font-family: 'NanumGothic';
	font-style: normal;
	font-weight: 700;
	font-size: 24px;
	line-height: 28px;
	color: #000000;
	opacity: 0.5;
	padding-top: 60px;
	padding-bottom: 80px;
`;
const CloseButton = styled.span`
	position: absolute;
	right: 20px;
	top: 20px;
`;
function Login() {

	return (
		<>
			<div>
				<Link to="/">
					<CloseButton>
						<TfiClose
							size="30"
							color="#3A3A3A"></TfiClose>
					</CloseButton>
				</Link>
			</div>
			<LoginPageWrap>
				<JoinComment />
				<LoginComments>소셜 계정으로 로그인하기</LoginComments>
				<KakaoLoginButton />
			</LoginPageWrap>
		</>
	);
}
export default Login;
