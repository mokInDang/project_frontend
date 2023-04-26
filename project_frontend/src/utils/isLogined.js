import secureLocalStorage from 'react-secure-storage';

const isLogined = (func, value, navigate) => {
	const accessToken = secureLocalStorage.getItem('accessToken');
	if (typeof accessToken === 'string' && accessToken.slice(0, 6) === 'Bearer') {
		func(value);
	} else {
		alert('로그인 후 이용하실 수 있습니다.');
		navigate('/login');
	}
};

export { isLogined };
