import styled from 'styled-components';

const HR = styled.hr`
	border: 0.18rem solid rgba(153, 153, 153, 0.3);
	margin-bottom: 2.5rem;
`;

const P = styled.p`
	font-family: NanumSquareNeo;
	font-style: normal;
	font-weight: 900;
	font-size: 2.2rem;
	font-size: 2.2rem;

	align-items: center;
	display: flex;
	letter-spacing: 0.01em;
	text-indent: 1rem;
	text-indent: 1rem;
	color: #000000;
`;
const Label = styled.label`
	font-weight: 700;
	font-size: 2.3rem;
	line-height: 2.5rem;
	font-size: 2.3rem;
	line-height: 2.5rem;
	span {
		font-size: 1.2rem;
		color: rgba(129, 204, 85, 1);
		margin: 0 1rem;
	}
`;

const Title = styled.input.attrs({
	type: 'text',
	placeholder: '글 제목을 입력해주세요.',
	name: 'title',
	maxLength: '40',
})`
	font-family: NanumSquareNeo;
	margin-top: 2.5rem;
	margin-bottom: 3.5rem;
	height: 6rem;
	margin-top: 2.5rem;
	margin-bottom: 3.5rem;
	height: 6rem;
	background: #ffffff;
	border: 1px solid #bdbdbd;
	border-radius: 0.8rem;
	outline: 0;
	width: 100%;
	text-indent: 2rem;
	font-family: NanumSquareNeo;
	font-style: normal;
	font-weight: 350;
	font-size: 1.7rem;
`;

const QuillWrap = styled.div`
	height: 600px;
	@media (max-width: 768px) {
		height: 400px;
	}
	@media (max-width: 425px) {
		height: 400px;
	}
`;

const ButtonWrap = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 2rem;
	position: relative;
	.loading {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: white;
		opacity: 0.8;
		display: ${(props) => (props.isLoading ? 'block' : 'none')};
	}
`;
const Button = styled.div`
	display: inline-block;
	width: 8.5rem;
    height: 100%;
    box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.13)
    border: none;
    border-radius: 0.7rem;
    cursor:pointer;
    margin-left: 2.5rem;
    text-align: center;
    font-weight: 350;
    font-size: 1.5rem;
    line-height: 3rem;
	background: ${(props) => (props.name === 'cancel' ? '#DDDDDD' : '#000000')};
    color: ${(props) => (props.name === 'cancel' ? '#767676' : '#ffffff')};
`;
export { HR, P, Label, Title, Button, ButtonWrap, QuillWrap };
