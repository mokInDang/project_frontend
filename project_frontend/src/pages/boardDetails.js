import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BoardDetails() {
	const navigate = useNavigate();
	let params = useParams();
	axios
		.get(`/api/boards/${params.boardId}`)
		.then((res) => {
			console.log(res.data);
			return <div>{res.data}</div>;
		})
		.catch((error) => {
			alert(`해당하는 글이 존재하지 않습니다.`);
			console.log(error);
			// navigate('/');
		});
}
export default BoardDetails;
