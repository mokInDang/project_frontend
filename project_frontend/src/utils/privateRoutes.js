import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const PrivateRoutes = ({ authentication, accessToken }) => {
	console.log(authentication, typeof authentication);
	console.log(accessToken, typeof accessToken);
	const Token = JSON.stringify(accessToken);
	console.log(Token);
	if (authentication) {
		//인증이 반드시 필요한 페이지. 미인증 시 로그인 페이지로, 인증을 한 상태일 경우 해당 페이지로 이동
		// if (userInfo !== null && userInfo.region === 'DEFAULT_REGION') {
		// }
		if (accessToken !== undefined && Token.slice(0, 6) === 'Bearer') {
			return <Outlet />;
		} else {
			alert('로그인 후 이용하실 수 있습니다.');
			return <Navigate to='/login' />;
		}
	} else {
		// 반드시 미인증 상태여야 하는 페이지. 미인증 시 해당 페이지로, 인증을 한 상태일 경우 메인 페이지로 이동
		return accessToken !== undefined && Token.slice(0, 6) === 'Bearer' ? (
			<Navigate to='/' />
		) : (
			<Outlet />
		);
	}
};
const RegionRequiredRoutes = (region) => {
	if (region !== 'DEFAULT_REGION') {
		return <Outlet />;
	} else {
		alert('내 위치 인증 후 이용하실 수 있습니다.');
		return <Navigate to='/mypage' />;
	}
};
export { PrivateRoutes, RegionRequiredRoutes };
