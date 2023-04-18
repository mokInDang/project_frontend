import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const Host = window.location.host;
const REST_API_KEY = '60b35611c843f6c8f618a495ecc8eaf6';
const LOGOUT_REDIRECT_URI = `https://${Host}`;
const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;

const onLogout = async () => {
	console.log(`Logout 실행 : 카카오 계정과 함께 로그아웃`);
	await axios
		.delete('/api/auth/logout')
		.then((res) => {
			console.log(`동네줍깅 로그아웃 : Access token 삭제`);
			axios.defaults.headers.common['Authorization'] = undefined;
			console.log(res.status);
			secureLocalStorage.clear();
			window.location.replace(KAKAO_LOGOUT_URL);
		})
		.catch((error) => {
			console.log(error);
			console.log('동네줍깅 로그아웃 실패');
		});
};

export { onLogout };
