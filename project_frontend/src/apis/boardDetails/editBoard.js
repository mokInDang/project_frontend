import axios from "axios";

const closeRecruitment = (boardId) => {
	console.log(`모집 게시글 마감`);
	// 마감하시겠습니까? 조건문 넣기 혹은 버튼 클릭시 모달창 띄우기
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
};
const movetoEditRecruitment = (boardId) => {
	console.log(`모집 게시글 수정페이지로 이동`);
};
const editRecruitment = () => {};
const deleteRecruitment = (boardId) => {
	console.log(`모집 게시글 삭제`);
	// 삭제하시겠습니까? 조건문 넣기 혹은 버튼 클릭시 모달창 띄우기
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
};

export { closeRecruitment, movetoEditRecruitment, deleteRecruitment };
