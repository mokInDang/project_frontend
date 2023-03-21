import axios from 'axios';

const onLogout = async (res) => {
	console.log(`Logout 실행`);
	await axios
		.delete('/api/auth/logout')
		.then((res) => {
            axios.defaults.headers.common["Authorization"] = undefined;
            console.log(res.status);
		})
		.catch((error) => {
			console.log(error);
			console.log('로그아웃 실패');
		});
};

export {onLogout}