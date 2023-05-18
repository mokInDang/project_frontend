import { Loading, WriteForm } from '../components';
import { useState } from 'react';
function PostRecruitment() {
	const [isLoading, setIsLoading] = useState(false);
	let form = {
		activityCategory: '',
		startingDate: '',
		title: '',
		contentBody: '',
		meetingPlaceCreationRequest: {
			longitude: '',
			latitude: '',
			meetingAddress: '',
		},
	};

	return (
		<>
			<Loading isLoading={isLoading} />
			<WriteForm form={form} getIsLoading={setIsLoading} />
		</>
	);
}
export default PostRecruitment;
