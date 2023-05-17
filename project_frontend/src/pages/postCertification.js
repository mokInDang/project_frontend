import { useState, useRef, useEffect } from 'react';
import { EditorComponent, WriteWrapper } from '../components';
import {
	P,
	HR,
	Label,
	Title,
	Button,
	ButtonWrap,
	ThumbnailsWrapper,
	ThumbnailDiv,
	ThumbnailedDiv,
	FileUploader,
} from '../components';
import {
	fileExtensionValid,
	fileSizeValid,
} from '../utils/fileUploadValidHandler';
import { RxPlus, RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { movePath } from '../utils';

function PostCertification() {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [contentBody, setContentbody] = useState('');
	const [imageUrls, setImageUrls] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const selectFile = useRef();
	const getHtmlContentBody = (newContentBody) => {
		if (
			newContentBody === '<p><br></p>' ||
			newContentBody.replace(/(<([^>]+)>)/gi, '').replace(/\s/g, '') === ''
		) {
			newContentBody = '';
		}
		setContentbody(newContentBody);
	};

	const onChange = (e) => {
		// input title에 사용되는 함수
		if (e.target.value.replace(/ /g, '') === '') e.target.value = '';
		setTitle(e.target.value);
	};

	const onImagesChange = async (e) => {
		const { files } = e.target;
		if (!files || !files[0]) return;
		let maxFileCnt = 5;
		let imageList = imageUrls;
		let imageListLength = imageUrls.length;
		let remainFileCnt = maxFileCnt - imageListLength;
		let curFileCnt = files.length;
		if (curFileCnt > remainFileCnt) {
			e.target.value = '';
			alert('업로드 가능한 최대 파일 개수는 5개입니다.');
			return;
		}
		for (let i = 0; i < files.length; i++) {
			const imageFile = files[i];
			if (!fileExtensionValid(imageFile.name)) {
				e.target.value = '';
				alert('업로드 가능한 확장자가 아닙니다. 가능한 확장자: jpg, jpeg, png');
				return;
			}
			if (!fileSizeValid(imageFile.size)) {
				e.target.value = '';
				alert('업로드 가능한 최대 파일 크기는 파일 당 10MB입니다.');
				return;
			}
			await onImageUpload(imageFile, imageList);
		}
		setImageUrls(Array.from(imageList));
	};

	const onImageUpload = async (imageFile, imageList) => {
		const formData = new FormData();
		formData.set('image', imageFile);
		await axios
			.post('/api/image/certification-image', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res) => {
				imageList.push(res.data.imageUrl);
			})
			.catch((error) => {
				console.error(error);
				alert('프로필 이미지 업로드에 실패했습니다.');
			});
	};

	const onImageDelete = (i) => {
		let imageUrlsArray = imageUrls;
		delete imageUrlsArray[i];
		let newImageUrlsArray = imageUrlsArray.filter(
			(element) => element !== undefined
		);
		setImageUrls(newImageUrlsArray);
	};

	const submitCertForm = () => {
		if (imageUrls === [] || title === '' || contentBody === '') {
			alert('제목과 본문, 한 장 이상의 사진은 필수입니다.');
			return;
		}
		setIsLoading(true);
		const form = {
			title: title.trim(),
			contentBody: contentBody,
			fileUrls: imageUrls,
		};
		axios
			.post('/api/boards/certification', form)
			.then((res) => {
				navigate(`/boards/certification/${res.data.boardId}`);
			})
			.catch((error) => {
				console.error(error);
				alert('글 작성에 실패했습니다.');
				setIsLoading(false);
			});
	};
	return (
		<>
			<WriteWrapper>
				<P>
					<span
						style={{
							width: '1rem',
							height: '1rem',
							backgroundColor: '#81CC55',
							borderRadius: '1rem',
						}}></span>
					플로깅 활동을 인증해주세요.
				</P>
				<HR></HR>
				<Label htmlFor='title'>제목</Label>
				<Title value={title} onChange={onChange}></Title>
				<Label htmlFor='photos'>
					사진
					<span>
						※ 한 장 이상의 사진을 필수로 첨부해주세요. 최대 5장까지 업로드할 수
						있습니다.
					</span>
				</Label>
				<ThumbnailsWrapper items={imageUrls.length}>
					{imageUrls.map((imageUrl, i) => (
						<ThumbnailedDiv
							onClick={() => {
								onImageDelete(i);
							}}
							key={i}
							imageUrl={imageUrl}>
							<div className='content'>
								<RxCross2></RxCross2>
							</div>
						</ThumbnailedDiv>
					))}
					{imageUrls.length < 5 && (
						<ThumbnailDiv onClick={() => selectFile.current.click()}>
							<div className='content'>
								<RxPlus></RxPlus>
							</div>
						</ThumbnailDiv>
					)}
				</ThumbnailsWrapper>
				<FileUploader>
					<input
						type='file'
						name='image_files'
						accept='image/*'
						multiple='multiple'
						onChange={onImagesChange}
						ref={selectFile}></input>
				</FileUploader>
				<EditorComponent
					name='contentBody'
					value={contentBody}
					getHtmlContentBody={getHtmlContentBody}
					placeholder={'진행했던 플로깅 활동에 대해 작성해주세요!'}
				/>
				<ButtonWrap isLoading={isLoading}>
					<div className='loading'></div>
					<Button
						name='cancel'
						onClick={() => {
							if (
								window.confirm('작성을 취소하고 페이지를 벗어나시겠습니까?')
							) {
								movePath(navigate, -1);
							}
						}}>
						취소
					</Button>
					<Button onClick={submitCertForm} name='write'>
						글 등록
					</Button>
				</ButtonWrap>
			</WriteWrapper>
		</>
	);
}
export default PostCertification;
