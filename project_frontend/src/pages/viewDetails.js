import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewDetails() {
	const navigate = useNavigate();
	let { params } = useParams();
	axios
		.get(`/api/boards/${params}`)
		.then((res) => {
			console.log(res);
			return <p>{res.body}</p>;
		})
		.catch((error) => {
			alert(`해당하는 글이 존재하지 않습니다.`);
			console.log(error);
			navigate('/');
		});
}
export default ViewDetails;
