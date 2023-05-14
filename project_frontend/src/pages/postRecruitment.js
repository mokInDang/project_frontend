import { WriteForm, WriteWrapper } from '../components';

function PostRecruitment() {
	let form = {
		activityCategory: '',
		startingDate: '',
		title: '',
		contentBody: '',
		address: '',
		x: '',
		y: '',
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
