import { useNavigate, useParams, useLocation } from 'react-router';
import { WriteForm, WriteWrapper } from '../components';

function PostRecruitment() {
	const formToEdit = useLocation().state;
	const navigate = useNavigate();
	console.log(formToEdit);
	const boardIdForEdit = useParams().boardId;
	let initialForm = {
		activityCategory: '',
		startingDate: '',
		title: '',
		contentBody: '',
	};

	if (boardIdForEdit) {
		{
			formToEdit
				? (initialForm = formToEdit)
				: () => {
						alert('잘못된 접근입니다.');
						navigate(-1);
				  };
		}
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
