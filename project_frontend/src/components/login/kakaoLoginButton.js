import React from 'react';
import styled from 'styled-components';
import {
	kakao_login_large_wide,
	kakao_login_large_narrow,
	kakao_login_medium_narrow,
	kakao_login_medium_wide,
} from '../../assets/images';

const LoginButtonImg = styled.img`
	filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.13));
`;
function KakaoLoginButton() {
	const REST_API_KEY = '60b35611c843f6c8f618a495ecc8eaf6';
	const REDIRECT_URI = 'http://localhost:3000/api/member/join';
	const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
	// const [innerWidth, setInnerWidth] = useState(document.body.offsetWidth);

	// useEffect(()=>{
	//     const resizeListner=()=>{
	//         setInnerWidth(document.body.offsetWidth);
	//     };
	//     window.addEventListener("resize",resizeListner);
	// })

	return (
		<div>
			<a href={KAKAO_AUTH_URL}>
				<LoginButtonImg src={kakao_login_large_narrow}></LoginButtonImg>
			</a>
		</div>
	);
}

export default KakaoLoginButton;
