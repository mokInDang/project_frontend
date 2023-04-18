import axios from 'axios';

const closeRecruitment = (boardId) => {
	if (window.confirm('모집을 마감하시겠습니까?')) {
		// 모달창으로 수정할 것
		console.log(`모집 게시글 마감`);
		axios
			.patch(`/api/boards/recruitment/${boardId}/recruitment-status`)
			.then((res) => {
				alert('마감 처리가 완료되었습니다.');
				console.log(res.data.boardId);
			})
			.catch((error) => {
				console.log(error);
				// console.log(error.status);
				console.log('마감 처리 실패');
			});
	}
};
const GetRecruitmentForEdit = (boardId, navigate) => {
	console.log('GetRecruitmentForEdit 실행');
	let form = {
		title: '게시글 수정하기',
		contentBody: '',
		activityCategory: '',
		startingDate: '',
	};
	axios
		.get(`/api/boards/recruitment/${boardId}`)
		.then((res) => {
			console.log(res.data);
			form = res.data;
		})
		.catch((error) => {
			console.log(error);
			console.log('기본 수정 폼 리턴')
			alert('잘못된 접근입니다.');
			navigate(-1);
		});
	return form;
};
const deleteRecruitment = (boardId) => {
	if (window.confirm('게시글을 삭제하시겠습니까?')) {
		// 모달창으로 수정할 것
		console.log(`모집 게시글 삭제`);
		axios
			.delete(`/api/boards/recruitment/${boardId}`)
			.then((res) => {
				alert('모집 게시글이 삭제되었습니다.');
				console.log(res.data.boardId);
			})
			.catch((error) => {
				console.log(error);
				// console.log(error.status);
				console.log('게시글 삭제 실패');
			});
	}
};

export { closeRecruitment, GetRecruitmentForEdit, deleteRecruitment };
