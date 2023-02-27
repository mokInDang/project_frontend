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
	// const [innerWidth, setInnerWidth] = useState(document.body.offsetWidth);

	// useEffect(()=>{
	//     const resizeListner=()=>{
	//         setInnerWidth(document.body.offsetWidth);
	//     };
	//     window.addEventListener("resize",resizeListner);
	// })

	return (
		<div>
			<LoginButtonImg src={kakao_login_large_narrow}></LoginButtonImg>
		</div>
	);
}

export default KakaoLoginButton;
