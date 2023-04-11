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
let setAuthHeader = function (res) {
	return new Promise((resolve) => {
		console.log('3. setAuthHeader 실행');
		secureLocalStorage.setItem('accessToken', res.headers.get('Authorization'));
		axios.defaults.headers.common['Authorization'] =
			secureLocalStorage.getItem('accessToken');
		var setHeaderTime = new Date();
		resolve(
			console.log(
				`4. setAuthHeader 완료 : ${setHeaderTime.toLocaleString('ko-KR')}`
			)
		); // resolve 함수 호출된 경우 비동기 처리 성공!
	});
};
const onLoginSuccess = async (res) => {
	console.log('2. onLoginSuccess 실행');

	await setAuthHeader(res)
		.then(() => {
			// setHeader 성공 시 .then 안 함수 실행
			console.log('5. onLoginSuccess 내 reissueToken 실행');
			reissueToken();
		})
		.catch((error) => {
			console.log(error);
			console.log('onLoginSuccess 실패');
		});
};

const onSilentRefresh = () => {
	console.log('6. onSilentRefresh 실행');
	axios
		.post('/api/auth/refresh')
		.then((res) => {
			setAuthHeader(res);
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
		setInterval(() => onSilentRefresh(), JWT_EXPIRY_TIME - 10000);
	} else {
		console.log('Access Token not defined');
	}
};
export { OnLogin, onSilentRefresh, onLoginSuccess, reissueToken };
