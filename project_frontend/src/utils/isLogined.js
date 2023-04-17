import secureLocalStorage from 'react-secure-storage';

const isLogined = (func, value, noAlert) => {
	const accessToken = secureLocalStorage.getItem('accessToken');
	if (typeof accessToken === 'string' && accessToken.slice(0, 6) === 'Bearer') {
		func(value);
	} else {
		if (noAlert === undefined) {
			alert('로그인 후 이용하실 수 있습니다.');
		}
	}
};

export { isLogined };
