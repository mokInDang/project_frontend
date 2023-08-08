import { useNavigate, useParams, useLocation } from 'react-router';
import { Loading, WriteForm } from '../components';
import { useEffect, useState } from 'react';

function PatchRecruitment() {
	const [isLoading, setIsLoading] = useState(false);
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
		maxOfParticipationCount: 0,
	};

	if (recruitmentToEdit && boardIdToEdit) {
		let {
			activityCategory,
			startingDate,
			title,
			contentBody,
			meetingPlaceResponse,
			maxOfParticipationCount,
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
			maxOfParticipationCount: maxOfParticipationCount,
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
			<Loading isLoading={isLoading} />
			{recruitmentToEdit && (
				<WriteForm
					form={form}
					boardIdToEdit={boardIdToEdit}
					getIsLoading={setIsLoading}
				/>
			)}
		</>
	);
}
export default PatchRecruitment;
