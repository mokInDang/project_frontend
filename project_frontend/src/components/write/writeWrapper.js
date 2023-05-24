import styled from 'styled-components';

const WriteWrapper = styled.div`
	margin: 10rem auto;
	width: 62.5%;
	word-break: break-all;
	.selectBoxWrap {
		display: flex;
		justify-content: space-between;
		margin-bottom: 7rem;
		flex-wrap: wrap;
	}
	.selectBox {
		width: 48%;
	}
	@media (max-width: 768px) {
		width: 70%;
	}
	@media (max-width: 425px) {
		width: 85%;
		.selectBox {
			width: 100%;
		}
	}
`;
export default WriteWrapper;
