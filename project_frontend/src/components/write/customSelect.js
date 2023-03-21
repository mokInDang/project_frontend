import styled from 'styled-components';
import { useEffect, useState } from 'react';

const SelectBox = styled.div`
	content: '산책/달리기';
	position: relative;
	width: 100%;
	height: 55px;
	background-color: #ffffff;
	cursor: pointer;
	border: 1px solid #bdbdbd;
	border-radius: 8px;
	outline: 0;
	text-indent: 20px;
	align-items: center;
	display: flex;

	&::before {
		content: '⌵';
		position: absolute;
		top: 10px;
		right: 20px;
		color: #bdbdbd;
		font-size: 20px;
	}
`;
const Label = styled.label`
	font-size: 14px;
	margin-left: 4px;
	text-align: center;
`;
const SelectOptions = styled.ul`
	z-index: 10000;
	position: absolute;
	list-style: none;
	top: 60px;
	left: 0;
	width: 100%;
	overflow: hidden;
	display: ${(props) => (props.show ? 'block' : 'none')};
	padding: 0;
	border: 1px solid #bdbdbd;
	border-radius: 8px;
	background-color: #ffffff;
`;
const Option = styled.li`
	font-size: 15px;
	padding: 12px 0px;
	background-color: #ffffff;
	transition: background-color 0.2s ease-in;
	&:hover {
		background-color: rgba(161, 198, 254, 0.5);
	}
`;

const CustomSelectActivity = ({ getSelectedActivity }) => {
	const [showOptions, setShowOptions] = useState(false);
	const [currentValue, setCurrentValue] = useState('');
	const handleOnChangeSelectValue = (e) => {
		const { innerText } = e.target;
		setCurrentValue(innerText);
	};
	useEffect(() => {
		getSelectedActivity(currentValue);
	}, [currentValue]);

	return (
		<SelectBox onClick={() => setShowOptions((prev) => !prev)}>
			<Label>{currentValue ? currentValue : '산책/달리기'}</Label>
			<SelectOptions show={showOptions}>
				<Option onClick={handleOnChangeSelectValue}>산책</Option>
				<Option onClick={handleOnChangeSelectValue}>달리기</Option>
			</SelectOptions>
		</SelectBox>
	);
};

export { CustomSelectActivity };
