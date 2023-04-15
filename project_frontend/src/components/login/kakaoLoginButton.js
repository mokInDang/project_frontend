import React from 'react';
import styled from 'styled-components';
import {
	kakao_login_large_wide,
	kakao_login_large_narrow,
	kakao_login_medium_narrow,
	kakao_login_medium_wide,
} from '../../assets/images';

const KakaoLoginButton = styled.img.attrs({
	src: `${kakao_login_large_narrow}`,
})`
	filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.13));
`;

export default KakaoLoginButton;
