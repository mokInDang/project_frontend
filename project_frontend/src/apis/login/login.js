import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
const JWT_EXPIRY_TIME = 30 * 60 * 1000; // 만료 시간 (30분 밀리초로 표현)

const OnLogin = async (res) => {
	const navigate = useNavigate();
	console.log(`1. onLogin 실행`);
	await axios
		.post('/api/auth/join', JSON.stringify(res), {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': `https://www.dongnejupging.xyz`,
			},
		})
		.then((res) => {
			onLoginSuccess(res);
			secureLocalStorage.setItem('userInfo', res.data);
			navigate('/');
		})
		.catch((error) => {
			console.log(error);
			console.log('onLogin 실패');
			alert('로그인에 실패하였습니다.');
			navigate('/');
		});
};
const onLoginSuccess = async (res) => {
	console.log('2. onLoginSuccess 실행');
	secureLocalStorage.setItem('accessToken', res.headers.get('Authorization'));
	axios.defaults.headers.common['Authorization'] =
		secureLocalStorage.getItem('accessToken');
	setTimeout(() => onSilentRefresh(), 10000);
};

const onSilentRefresh = () => {
	console.log('3. onSilentRefresh 실행');
	axios
		.post('/api/auth/refresh')
		.then((res) => {
			onLoginSuccess(res);
		})
		.catch((error) => {
			console.log(error);
			console.log('onSilentRefresh 실패');
		});
};
const reissueToken = () => {
	// Todo : 로그아웃 시 Authorization undefined로 설정해줄 것
	if (
		secureLocalStorage.getItem('accessToken') !== null &&
		secureLocalStorage.getItem('accessToken').slice(0, 6) === 'Bearer'
	) {
		axios.defaults.headers.common['Authorization'] =
			secureLocalStorage.getItem('accessToken');
		onSilentRefresh();
	} else {
		console.log('Access Token not defined');
	}
};
export { OnLogin, onSilentRefresh, onLoginSuccess, reissueToken };
