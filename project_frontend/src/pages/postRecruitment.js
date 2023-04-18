import { useNavigate, useParams, useLocation } from 'react-router';
import { WriteForm, WriteWrapper } from '../components';

function PostRecruitment() {
	const recruitmentToEdit = useLocation().state;
	const boardIdToEdit = useParams().boardId;
	let form = {
		activityCategory: '',
		startingDate: '',
		title: '',
		contentBody: '',
	};

	if (recruitmentToEdit) {
		let { activityCategory, startingDate, title, contentBody } =
			recruitmentToEdit;
		const formToEdit = {
			activityCategory: activityCategory,
			startingDate: startingDate,
			title: title,
			contentBody: contentBody,
		};
		form = formToEdit;
		console.log(formToEdit);
	}

	return (
		<>
			<WriteWrapper>
				<WriteForm
					form={form}
					boardIdToEdit={boardIdToEdit}
				/>
			</WriteWrapper>
		</>
	);
}
export default PostRecruitment;
