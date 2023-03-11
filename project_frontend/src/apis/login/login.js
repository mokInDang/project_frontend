import axios from 'axios';

const JWT_EXPIRY_TIME = 30 * 60 * 1000; // 만료 시간 (30분 밀리초로 표현)

const onLogin = async (res) => {
	console.log(`onLogin 실행`);
	await axios
		.post('/api/member/join', JSON.stringify(res), {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': `https://www.dongnejupging.xyz`,
			},
		})
		.then(onLoginSuccess)
		.catch((error) => {
			console.log(error);
			console.log('로그인 실패');
		});
};
let setAuthHeader = function (res) {
	return new Promise((resolve) => {
		console.log('setAuthHeader 실행');
		const Token = res.headers.get('Authorization');
		axios.defaults.headers.common['Authorization'] = Token;
		const { alias } = res.data;
		console.log(JSON.stringify(alias));
		resolve(console.log(axios.defaults.headers.common.Authorization)); // resolve 함수 호출된 경우 비동기 처리 성공!
	});
};
const onLoginSuccess = async (res) => {
	console.log('onLoginSuccess 실행');
	await setAuthHeader(res)
		.then(() => {
			console.log('onLoginSuccess 내 onSilentRefresh 실행')
			setTimeout(onSilentRefresh(), 5000);
		})
		.catch((error) => {
			console.log(error);
			console.log('onLoginSuccess 실패');
		});
};

const onSilentRefresh = () => {
	console.log('onSilentRefresh 실행');
	axios
		.post('/api/member/reissueToken')
		.then(onLoginSuccess)
		.catch((error) => {
			console.log(error);
			console.log('onSilentRefresh 실패');
			// Todo : status 따라 다른 에러 메시지 출력하도록 할 것
		});
};

export { onLogin, onSilentRefresh, onLoginSuccess };
