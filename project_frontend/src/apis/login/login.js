import axios from 'axios';

const JWT_EXPIRY_TIME = 30 * 60 * 1000; // 만료 시간 (30분 밀리초로 표현)

const onLogin = async (res) => {
	console.log(`1. onLogin 실행`);
	await axios
		.post('/api/auth/join', JSON.stringify(res), {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': `https://www.dongnejupging.xyz`,
			},
		})
		.then((res) => {
			debugger;
			onLoginSuccess(res);
		})
		.catch((error) => {
			console.log(error);
			console.log('onLogin 실패');
		});
};
let setAuthHeader = function (res) {
	return new Promise((resolve) => {
		console.log('3. setAuthHeader 실행');
		const Token = res.headers.get('Authorization');
		debugger;
		axios.defaults.headers.common['Authorization'] = Token;
		debugger;
		const { email, alias, region } = res.data;
		var setHeaderTime = new Date();
		resolve(
			console.log(
				`4. setAuthHeader 완료 : ${setHeaderTime.toLocaleString('ko-KR')}`
			)
		); // resolve 함수 호출된 경우 비동기 처리 성공!
	});
};
const onLoginSuccess = async (res) => {
	console.log(res);
	console.log('2. onLoginSuccess 실행');
	await setAuthHeader(res)
		.then(() => {
			// setHeader 성공 시 .then 안 함수 실행
			console.log('5. onLoginSuccess 내 onSilentRefresh 실행');
			debugger;
			setTimeout(onSilentRefresh(), JWT_EXPIRY_TIME - 60000); // 액세스 토큰 만료 1분 전 재발급
			debugger;
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
	const token = axios.defaults.headers.common.Authorization;
	// Todo : 로그아웃 시 Authorization undefined로 설정해줄 것
	if (typeof token === 'string' && token.slice(0, 6) === 'Bearer') {
		onSilentRefresh();
	} else
		console.log('type of axios default header Authorization is not string');
};
export { onLogin, onSilentRefresh, onLoginSuccess, reissueToken };
