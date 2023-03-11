import axios from 'axios';

const JWT_EXPIRY_TIME = 30 * 60 * 1000; // 만료 시간 (30분 밀리초로 표현)

const onLogin = async (data) => {
	console.log(`onLogin 실행`);
	await axios
		.post('/api/member/join', JSON.stringify(data), {
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
const onSilentRefresh = () => {
	console.log('onSilentRefresh 실행');
	const data = {};
	axios
		.post('/api/member/reissueToken', data)
		.then(onLoginSuccess)
		.catch((error) => {
			console.log(error);
			console.log('onSilentRefresh 실패');
			// Todo : status 따라 다른 에러 메시지 출력하도록 할 것
		});
};

const onLoginSuccess = (res) => {
	// accessToken 설정
	const Token = res.headers.get('Authorization');
	axios.defaults.headers.common['Authorization'] = `${Token}`;
	console.log(`onLoginSuccess 실행 ${Token}`);

	setTimeout(onSilentRefresh, 5000);

	const { alias } = res.data;
	console.log(res.data);
	console.log(JSON.stringify(alias));
};

export { onLogin, onSilentRefresh, onLoginSuccess };
