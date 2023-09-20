import axios from 'axios';
import { login, getToken } from '../../store/userSlice';
const JWT_EXPIRY_TIME = 2 * 60 * 60 * 1000; // 만료 시간 (30분 밀리초로 표현) 60000 = 1분, 60000 *60 = 1시간, 60000*60*2 = 2시간
const OnLogin = async (kakaoAuthCode, dispatch, navigate) => {
	console.log(`1. onLogin 실행`);
	await axios
		.post('/api/auth/join', JSON.stringify(kakaoAuthCode), {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': `https://www.dongnejupging.xyz`,
			},
		})
		.then((res) => {
			console.log(res.data);
			dispatch(login(res.data));
			dispatch(getToken(res.headers.get('Authorization')));
			// onLoginSuccess(res, dispatch);
			navigate('/');
			if (res.data.region === 'DEFAULT_REGION') {
				alert(
					'마이페이지에서 내 위치 인증 후 게시글 작성이 가능합니다!\n마이페이지 -> 내 위치 인증 클릭\n(모바일의 경우 위치 인증 시 핸드폰의 GPS를 켜주세요.)'
				);
			}
		})
		.catch((error) => {
			console.log(error);
			console.log('onLogin 실패');
			alert('로그인에 실패하였습니다.');
			navigate('/');
		});
};

const onLoginSuccess = (res, dispatch) => {
	console.log('2. onLoginSuccess 실행');
	axios.defaults.headers.common['Authorization'] =
		res.headers.get('Authorization');
	dispatch(getToken(res.headers.get('Authorization')));
	setTimeout(() => onSilentRefresh(), JWT_EXPIRY_TIME - 60000);
};

const onSilentRefresh = (dispatch) => {
	console.log('3. onSilentRefresh 실행');
	axios
		.post('/api/auth/refresh')
		.then((res) => {
			onLoginSuccess(res, dispatch);
		})
		.catch((error) => {
			console.log(error);
			console.log('onSilentRefresh 실패');
		});
};
const reissueToken = (accessToken, dispatch) => {
	// Todo : 로그아웃 시 Authorization undefined로 설정해줄 것
	if (accessToken && accessToken.slice(0, 6) === 'Bearer') {
		axios.defaults.headers.common['Authorization'] = accessToken;
		onSilentRefresh(dispatch);
	} else {
		console.log('Access Token not defined');
	}
};
export { OnLogin, onSilentRefresh, onLoginSuccess, reissueToken };
