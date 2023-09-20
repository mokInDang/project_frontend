import { OnLogin } from '../apis';
import { BarLoader } from 'react-spinners';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login } from '../store/userSlice';

function Welcome() {
	const dispatch = useDispatch();
	const KAKAO_CODE = new URL(document.location.href).searchParams.get('code');
	const navigate = useNavigate();
	let kakaoAuthCode = { authorizationCode: KAKAO_CODE };
	useEffect(() => {
		if (KAKAO_CODE) {
			OnLogin(kakaoAuthCode, dispatch, navigate);
		} else {
			alert('잘못된 접근입니다.');
			navigate('/');
		} // eslint-disable-next-line
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				margin: '0 auto',
				textAlign: 'center',
				width: '100%',
			}}>
			<BarLoader color='#81CC55' height='5px' width='100%'></BarLoader>
		</div>
	);
}
export default Welcome;
