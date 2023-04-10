
import { OnLogin } from '../apis';
import { BarLoader } from 'react-spinners';

function Welcome() {
	const KAKAO_CODE = new URL(document.location.href).searchParams.get('code');
	let kakaoAuthCode = { authorizationCode: KAKAO_CODE };
	if (KAKAO_CODE) {
		OnLogin(kakaoAuthCode);
	} // eslint-disable-next-line

	return (
		<div
			style={{
				display: 'flex',
				margin: '0 auto',
				textAlign: 'center',
				width: '100%',
			}}>
			<BarLoader
				color="#81CC55"
				height="5px"
				width="100%"></BarLoader>
		</div>
	);
}
export default Welcome;
