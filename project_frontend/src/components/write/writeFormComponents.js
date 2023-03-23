import styled from 'styled-components';

const HR = styled.hr`
	border: 1.8px solid rgba(153, 153, 153, 0.3);
	margin-bottom: 25px;
`;

const P = styled.p`
	font-family: NanumSquareNeo;
	font-style: normal;
	font-weight: 900;
	font-size: 22px;

	/* or 62% */
	align-items: center;
	display: flex;
	letter-spacing: 0.01em;
	text-indent: 10px;
	color: #000000;
`;
const Label = styled.label`
	font-family: NanumSquare_acR;
	font-weight: 700;
	font-size: 23px;
	line-height: 25px;
`;

const Title = styled.input`
	font-family: NanumSquareNeo;
	margin-top: 25px;
	margin-bottom: 35px;
	height: 60px;
	background: #ffffff;
	border: 1px solid #bdbdbd;
	border-radius: 8px;
	outline: 0;
	width: 100%;
	text-indent: 20px;
	font-family: NanumSquareNeo;
	font-style: normal;
	font-weight: 350;
	font-size: 17px;
`;
const Button = styled.div`
display:inline-block;
	width: 85px;
    height:100%;
    box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.13)
    border: none;
    border-radius: 7px;
    cursor:pointer;
    margin-left: 25px;
    text-align:center;
    font-weight: 350;
    font-size: 15px;
    line-height: 30px;
	background: ${(props) => (props.name === 'cancel' ? '#DDDDDD' : '#000000')};
    color: ${(props) => (props.name === 'cancel' ? '#767676' : '#ffffff')};
`;
export { HR, P, Label, Title, Button };
