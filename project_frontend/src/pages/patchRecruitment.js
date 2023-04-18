import { useNavigate, useParams, useLocation } from 'react-router';
import { WriteForm, WriteWrapper } from '../components';
import { useEffect } from 'react';

function PatchRecruitment() {
	const navigate = useNavigate();
	const recruitmentToEdit = useLocation().state;
	const boardIdToEdit = useParams().boardId;
	let form = {
		activityCategory: '',
		startingDate: '',
		title: '',
		contentBody: '',
	};

	if (recruitmentToEdit && boardIdToEdit) {
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
	
	useEffect(() => {
		if (!recruitmentToEdit) {
			alert('잘못된 접근입니다.');
			navigate('/', { replace: true });
		}
	}, []);

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
export default PatchRecruitment;
