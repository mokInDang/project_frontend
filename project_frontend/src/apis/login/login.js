import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
const JWT_EXPIRY_TIME = 2 * 60 * 60 * 1000; // 만료 시간 (30분 밀리초로 표현) 60000 = 1분, 60000 *60 = 1시간, 60000*60*2 = 2시간

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
			secureLocalStorage.setItem('userInfo', res.data);
			onLoginSuccess(res);
			const userInfo = secureLocalStorage.getItem('userInfo');
			navigate('/');
			if(userInfo.region === "DEFAULT_REGION"){
				alert("마이페이지에서 내 위치 인증 후 게시글 작성이 가능합니다!\n마이페이지 -> 내 위치 인증 클릭\n(모바일의 경우 위치 인증 시 핸드폰의 GPS를 켜주세요.)")
			}
		})
		.catch((error) => {
			console.log(error);
			console.log('onLogin 실패');
			alert('로그인에 실패하였습니다.');
			navigate('/');
		});
};
const onLoginSuccess = (res) => {
	console.log('2. onLoginSuccess 실행');
	secureLocalStorage.setItem('accessToken', res.headers.get('Authorization'));
	axios.defaults.headers.common['Authorization'] =
		secureLocalStorage.getItem('accessToken');
	setTimeout(() => onSilentRefresh(), JWT_EXPIRY_TIME - 60000);
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
