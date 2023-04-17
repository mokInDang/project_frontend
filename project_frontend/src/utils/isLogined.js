import secureLocalStorage from 'react-secure-storage';

const isLogined = (func, value) => {
	if (secureLocalStorage.getItem('accessToken')) {
		func(value);
	} else {
		alert('로그인 후 이용하실 수 있습니다.');
	}
};

export { isLogined };
