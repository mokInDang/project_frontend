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

const setDefaultHeaders = (Token) => {
	axios.defaults.headers.common['Authorization'] = Token;
};

const onLoginSuccess = (res) => {
	// accessToken 설정
	if (res.status === 200) {
		console.log('Response Status : 200');
		const Token = res.headers.get('Authorization');
		setDefaultHeaders(Token);
		console.log(`onLoginSuccess 실행 ${Token}`);

		const { alias } = res.data;
		console.log(JSON.stringify(alias));

		try {
			setTimeout(onSilentRefresh, JWT_EXPIRY_TIME);
		} catch (e) {
			console.log(e);
		}
	}
};

export { onLogin, onSilentRefresh, onLoginSuccess };
