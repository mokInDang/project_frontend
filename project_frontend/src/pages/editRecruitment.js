import React, { useEffect, useState } from 'react';
import { WriteForm, WriteWrapper } from '../components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

function EditRecruitment() {
	let params = useParams();
	const navigate = useNavigate();
	console.log(params.boardId);
	const [recruitmentDetails, setRecruitmentDetails] = useState({
		title: '',
		content: '',
		activityCategory: '',
		startingDate: '',
	});

	useEffect(() => {
		axios
			.get(`/api/boards/recruitment/${params.boardId}`)
			.then((res) => {
				console.log(res.data);
				setRecruitmentDetails(res.data);
			})
			.catch((error) => {
				alert('잘못된 접근입니다.');
				console.log(error);
				navigate('/');
			});
	}, []);

	return (
		<>
			<WriteWrapper>
				<WriteForm form={recruitmentDetails} />
			</WriteWrapper>
		</>
	);
}
export default EditRecruitment;
