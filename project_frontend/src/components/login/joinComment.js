import styled from 'styled-components';

const WelcomeComment = styled.p`
	margin: auto;
	padding-bottom: 1.5rem;
	font-weight: 900;
	font-size: ${(props) => props.fontSize};

	color: #000000;
	text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
`;
const JoinComment = () => {
	return (
		<>
			<WelcomeComment fontSize="4rem">우리동네줍깅</WelcomeComment>
			<WelcomeComment fontSize="3rem">오신 것을 환영합니다!</WelcomeComment>
		</>
	);
};
export default JoinComment;
