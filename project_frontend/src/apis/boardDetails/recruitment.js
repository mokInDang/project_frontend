import axios from 'axios';

const closeRecruitment = (boardId, getIsClosed) => {
	if (
		window.confirm(
			'모집을 마감하시겠습니까? 이는 되돌릴 수 없으며, 이후 게시글을 수정할 수 없습니다.'
		)
	) {
		// 모달창으로 수정할 것
		console.log(`모집 게시글 마감`);
		axios
			.patch(`/api/boards/recruitment/${boardId}/recruitment-status`)
			.then((res) => {
				alert('마감 처리가 완료되었습니다.');
				console.log(res.data.boardId);
				getIsClosed('Closed');
			})
			.catch((error) => {
				console.log(error);
				// console.log(error.status);
				console.log('마감 처리 실패');
			});
	}
};
const EditRecruitment = (boardId, contentBody, navigate) => {
	if (window.confirm('게시글 수정을 완료하시겠습니까?')) {
		console.log('EditRecruitment 실행');
		console.log(contentBody);
		axios
			.patch(`/api/boards/recruitment/${boardId}`, contentBody)
			.then((res) => {
				console.log(res.data.boardId);
				navigate(`/boards/recruitment/${res.data.boardId}`, { replace: true });
			})
			.catch((error) => {
				console.log(error);
				alert('게시글 수정에 실패하였습니다.');
			});
	}
};
const deleteRecruitment = (boardId, navigate) => {
	if (window.confirm('게시글을 삭제하시겠습니까?')) {
		// 모달창으로 수정할 것
		console.log(`모집 게시글 삭제`);
		axios
			.delete(`/api/boards/recruitment/${boardId}`)
			.then((res) => {
				alert('모집 게시글이 삭제되었습니다.');
				console.log(res.data.boardId);
				navigate('/', { replace: true });
			})
			.catch((error) => {
				console.log(error);
				// console.log(error.status);
				console.log('게시글 삭제 실패');
			});
	}
};

export { closeRecruitment, EditRecruitment, deleteRecruitment };
