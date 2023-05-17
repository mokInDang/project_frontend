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
		meetingPlaceModificationRequest: {
			longitude: '',
			latitude: '',
			meetingAddress: '',
		},
	};

	if (recruitmentToEdit && boardIdToEdit) {
		let {
			activityCategory,
			startingDate,
			title,
			contentBody,
			meetingPlaceResponse,
		} = recruitmentToEdit;
		let { longitude, latitude, meetingAddress } = meetingPlaceResponse;
		
		const formToEdit = {
			activityCategory: activityCategory,
			startingDate: startingDate,
			title: title,
			contentBody: contentBody,
			meetingPlaceModificationRequest: {
				longitude: longitude,
				latitude: latitude,
				meetingAddress: meetingAddress,
			},
		};
		form = formToEdit;
	}

	useEffect(() => {
		if (!recruitmentToEdit) {
			alert('잘못된 접근입니다.');
			navigate('/', { replace: true });
		}
	}, []);

	return (
		<>
			{recruitmentToEdit && (
				<WriteWrapper>
					<WriteForm form={form} boardIdToEdit={boardIdToEdit} />
				</WriteWrapper>
			)}
		</>
	);
}
export default PatchRecruitment;
