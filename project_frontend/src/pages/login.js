import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Login() {
	return (
		<Fragment>
			<div>로그인</div>
			<div>
				<Link to="/">메인 페이지</Link>
			</div>
		</Fragment>
	);
}
export default Login;
