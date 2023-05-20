import { CertificationWriteForm, Loading } from '../components';
import { useState } from 'react';

function PostCertification() {
	const [isLoading, setIsLoading] = useState(false);
	let form = {
		title: '',
		contentBody: '',
		fileUrls: [],
	};

	return (
		<>
			<Loading isLoading={isLoading} />
			<CertificationWriteForm form={form} getIsLoading={setIsLoading} />
		</>
	);
}
export default PostCertification;
