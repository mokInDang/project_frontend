import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const Placeholder = styled.label`
	padding-left: 0.4rem;
	text-align: center;
	font-family: NanumSquareNeo;
	font-style: normal;
	font-size: 1.8rem;
	color: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	cursor: pointer;
`;
const SelectBox = styled.div`
	margin-top: 2rem;
	text-indent: 2rem;
	position: relative;
	height: 5.5rem;
	width: 100%;
	justify-content: start;
	cursor: pointer;
	border: 1px solid #bdbdbd;
	border-radius: 0.8rem;
	box-sizing: border-box;
	outline: 0;
	font-family: NanumSquareNeo;
	align-items: center;
	display: flex;
	.activityPlaceholder {
		font-size: 1.65rem;
		text-align: left;
		text-indent: 2rem;
	}
	::before {
		content: '⌵';
		position: absolute;
		top: 50%;
		right: 2rem;
		transform: translate(0, -50%);
		color: #bdbdbd;
		font-size: 2rem;
	}
	input[type='date'] {
		opacity: 0;
		position: absolute;
		background: transparent;
		overflow: hidden;
		font-family: NanumSquareNeo;
		font-style: normal;
		font-weight: 350;
		font-size: 1.65rem;
		color: rgba(0, 0, 0, 0.5);
		text-indent: 1rem;
		height: 100%;
		outline: none;
		width: 100%;
		border: none;
		box-sizing: border-box;
		// :not(.has-value)::before {
		// 	content: ${(<Placeholder>'연도-월-일'</Placeholder>)};
		// 	width: 100%;
		// }
		// :focus::before,
		// :valid::before {
		// 	display: none;
		// }
		// ::-webkit-datetime-edit-text {
		// 	-webkit-appearance: none;
		// 	display: none;
		// }
		// ::-webkit-datetime-edit-month-field {
		// 	-webkit-appearance: none;
		// 	display: none;
		// }
		// ::-webkit-datetime-edit-day-field {
		// 	-webkit-appearance: none;
		// 	display: none;
		// }
		// ::-webkit-datetime-edit-year-field {
		// 	-webkit-appearance: none;
		// 	display: none;
		// }
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
	}
`;
const SelectOptions = styled.ul`
	z-index: 99;
	position: absolute;
	list-style: none;
	top: 5rem;
	left: 0;
	width: 100%;
	padding: 0;
	border: 1px solid #bdbdbd;
	border-radius: 0.8rem;
	box-sizing: border-box;
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
	const activitySelectorRef = useRef();

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

	useEffect(() => {
		const handleClickOutsideOrScroll = (e) => {
			if (
				activitySelectorRef.current &&
				!activitySelectorRef.current.contains(e.target)
			) {
				setShowOptions(false);
			}
		};
		window.addEventListener('scroll', handleClickOutsideOrScroll);
		document.addEventListener('mousedown', handleClickOutsideOrScroll);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideOrScroll);
			window.removeEventListener('scroll', handleClickOutsideOrScroll);
		};
	}, [activitySelectorRef]);

	return (
		<SelectBox
			ref={activitySelectorRef}
			onClick={() => setShowOptions(!showOptions)}
		>
			<Placeholder className='activityPlaceholder'>
				{currentValue ? currentValue : '산책/달리기'}
			</Placeholder>
			{showOptions && (
				<SelectOptions>
					<Option onClick={handleOnChangeSelectValue}>산책</Option>
					<Option onClick={handleOnChangeSelectValue}>달리기</Option>
				</SelectOptions>
			)}
		</SelectBox>
	);
};

const CustomSelectDate = ({ getSelectedDate, value }) => {
	const [date, setDate] = useState('');
	const dateSelectorRef = useRef();
	const onChange = (e) => {
		setDate(e.target.value);
	};
	useEffect(() => {
		setDate(value);
	}, []);

	useEffect(() => {
		getSelectedDate(date);
		console.log(date);
	}, [date]);
	return (
		<>
			<SelectBox onClick={() => dateSelectorRef.current.click()}>
				<Placeholder htmlFor='dateSelector' className='activityPlaceholder'>
					{date ? date : '연도-월-일'}
				</Placeholder>
				<input
					id='dateSelector'
					ref={dateSelectorRef}
					type='date'
					value={date}
					onChange={onChange}
					min={TodayString()}
				></input>
			</SelectBox>
		</>
	);
}; // 추후 react-datepicker 라이브러리로 변경할 것

export {
	CustomSelectActivity,
	CustomSelectDate,
	TodayString,
	SelectBox,
	Placeholder,
};
