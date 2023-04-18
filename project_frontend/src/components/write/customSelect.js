import styled from 'styled-components';
import { useEffect, useState } from 'react';

const SelectBox = styled.div`
	margin-top: 2rem;
	content: '산책/달리기';
	position: relative;
	width: 100%;
	height: 5.5rem;
	background-color: #ffffff;
	cursor: pointer;
	border: 1px solid #bdbdbd;
	border-radius: 0.8rem;
	outline: 0;
	text-indent: 2rem;
	align-items: center;
	display: flex;

	&::before {
		content: '⌵';
		position: absolute;
		top: 1.4rem;
		right: 2rem;
		color: #bdbdbd;
		font-size: 2rem;
	}
`;
const Label = styled.label`
	font-size: 1.4rem;
	margin-left: 0.4rem;
	text-align: center;
	font-family: NanumSquareNeo;
	font-style: normal;
	font-weight: 350;
	font-size: 1.8rem;
	color: rgba(0, 0, 0, 0.5);
`;
const SelectOptions = styled.ul`
	z-index: 10000;
	position: absolute;
	list-style: none;
	top: 6rem;
	left: 0;
	width: 100%;
	overflow: hidden;
	display: ${(props) => (props.show ? 'block' : 'none')};
	padding: 0;
	border: 1px solid #bdbdbd;
	border-radius: 0.8rem;
	background-color: #ffffff;
	font-weight: 700;
	font-size: 1.8rem;
`;

const Option = styled.li`
	font-size: 1.5rem;
	padding: 1.2rem 0;
	background-color: #ffffff;
	opacity: 0.7;
	transition: background-color 0.2s ease-in;
	&:hover {
		background-color: rgba(161, 198, 254, 0.5);
	}
`;

const DateSelector = styled.input`
	margin-top: 2rem;
	position: relative;
	height: 5.5rem;
	width: 100%;
	cursor: pointer;
	border: 1px solid #bdbdbd;
	border-radius: 0.8rem;
	text-indent: 1rem;
	font-family: NanumSquareNeo;
	font-style: normal;
	font-weight: 350;
	font-size: 1.8rem;
	color: rgba(0, 0, 0, 0.5);

	&::before {
		content: '⌵';
		position: absolute;
		top: 1.4rem;
		right: 2rem;
		color: #bdbdbd;
		font-size: 2rem;
	}
	// background: url() no-repeat right 5px center / 10px auto;
	::-webkit-clear-button,
	::-webkit-inner-spin-button {
		display: none;
	}
	::-webkit-calendar-picker-indicator {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: transparent;
		color: transparent;
		cursor: pointer;
	}
`;

const TodayString = () => {
	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	var todayString = year + '-' + month + '-' + day;
	return todayString;
};
const CustomSelectActivity = ({ getSelectedActivity, value }) => {
	const [showOptions, setShowOptions] = useState(false);
	const [currentValue, setCurrentValue] = useState('');
	const handleOnChangeSelectValue = (e) => {
		const { innerText } = e.target;
		setCurrentValue(innerText);
	};
	
	useEffect(() => {
		setCurrentValue(value);
	}, []);

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

const CustomSelectDate = ({ getSelectedDate, value }) => {
	const [date, setDate] = useState('');
	const onChange = (e) => {
		setDate(e.target.value);
	};

	useEffect(() => {
		setDate(value);
	}, []);

	useEffect(() => {
		getSelectedDate(date);
	}, [date]);
	return (
		<DateSelector
			placeholder="연도-월-일"
			type="date"
			value={date}
			onChange={onChange}
			min={TodayString()}></DateSelector>
	);
}; // 추후 react-datepicker 라이브러리로 변경할 것

export { CustomSelectActivity, CustomSelectDate, TodayString };
