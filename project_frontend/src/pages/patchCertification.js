import { useNavigate, useLocation, useParams } from 'react-router';
import { WriteWrapper, CertificationWriteForm, Loading } from '../components';
import { useEffect, useState } from 'react';

function PatchCertification() {
	const navigate = useNavigate();
	const certificationToEdit = useLocation().state;
	const boardIdToEdit = useParams().boardId;
	const [isLoading, setIsLoading] = useState(false);

	let form = {
		title: '',
		contentBody: '',
		imageUrls: [],
	};

	if (certificationToEdit && boardIdToEdit) {
		let { title, contentBody, imageUrls } = certificationToEdit;

		const formToEdit = {
			title: title,
			contentBody: contentBody,
			imageUrls: imageUrls,
		};
		form = formToEdit;
	}

	useEffect(() => {
		if (!certificationToEdit) {
			alert('잘못된 접근입니다.');
			navigate('/', { replace: true });
		}
	}, []);

	return (
		<>
			<Loading isLoading={isLoading} />
				<CertificationWriteForm
					form={form}
					getIsLoading={setIsLoading}
					boardIdToEdit={boardIdToEdit}
				/>
		</>
	);
}
export default PatchCertification;
