import styled from 'styled-components';

const WriteWrapper = styled.div`
	margin: 10rem auto;
	width: 62.5%;
	word-break: break-all;
	@media (max-width: 768px) {
		width: 70%;
	}
	@media (max-width: 425px) {
		width: 85%;
	}
`;
export default WriteWrapper;
