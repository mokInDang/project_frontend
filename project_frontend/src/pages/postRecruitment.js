import { useNavigate, useParams } from 'react-router';
import { WriteForm, WriteWrapper } from '../components';
import { GetRecruitmentForEdit } from '../apis';

function PostRecruitment() {
	const boardIdForEdit = useParams().boardId;
	const navigate = useNavigate();

	let initialForm = {
		activityCategory: '',
		startingDate: '',
		title: '',
		contentBody: '',
	};

	if (boardIdForEdit) {
		initialForm = GetRecruitmentForEdit(boardIdForEdit, navigate);
	}

	return (
		<>
			<WriteWrapper>
				<WriteForm
					form={initialForm}
					boardIdForEdit={boardIdForEdit}
				/>
			</WriteWrapper>
		</>
	);
}
export default PostRecruitment;
