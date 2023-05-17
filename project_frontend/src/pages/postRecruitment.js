import { WriteForm, WriteWrapper } from '../components';

function PostRecruitment() {
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
			<WriteWrapper>
				<WriteForm form={form} />
			</WriteWrapper>
		</>
	);
}
export default PostRecruitment;
