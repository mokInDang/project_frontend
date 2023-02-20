import styled from 'styled-components';

const WelcomeComment = styled.p`
	margin: auto;
	padding-bottom: 15px;
	font-family: 'NanumSquare';
	font-style: bold;
	font-weight: 800;
	font-size: 30px;

	color: #000000;
	text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
`;
const style1 = {
	fontSize:'40px'
};

const JoinComment = () => {
	return (
		<>
			<WelcomeComment style={style1}>우리동네줍깅</WelcomeComment>
			<WelcomeComment>오신 것을 환영합니다!</WelcomeComment>
		</>
	);
};
export default JoinComment;
