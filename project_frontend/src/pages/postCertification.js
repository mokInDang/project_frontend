import { useState, useRef } from 'react';
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
import { useLocation, useNavigate } from 'react-router';
import { movePath } from '../utils';

function PostCertification() {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [contentBody, setContentbody] = useState('');
	const [imageFiles, setImageFiles] = useState([]);
	const [imageThumbnails, setImageThumbnails] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const selectFile = useRef();
	const getHtmlContentBody = (newContentBody) => {
		setContentbody(newContentBody);
	};

	const onChange = (e) => {
		// input title에 사용되는 함수
		if (e.target.value.replace(/ /g, '') === '') e.target.value = '';
		setTitle(e.target.value);
	};

	const onImagesChange = (e) => {
		const { files } = e.target;
		if (!files || !files[0]) return;
		let maxFileCnt = 5;
		let imageList = imageFiles;
		let imageListLength = imageFiles.length;
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
				alert('업로드 가능한 최대 파일 크기는 파일 당 5MB입니다.');
				return;
			}
			createImageURL(imageFile); // 썸네일용 이미지 url 생성
			imageList.push(imageFile);
		}
		setImageFiles(Array.from(imageList)); // 업로드한 이미지 ProfileImage에 저장
	};

	const createImageURL = (fileBlob) => {
		// createObjectURL 방식으로 프로필 이미지 썸네일 표시
		// if (profileThumbnail) URL.revokeObjectURL(profileThumbnail);
		const url = URL.createObjectURL(fileBlob);
		const thumbnailsArray = imageThumbnails;
		thumbnailsArray.push(url);
		setImageThumbnails(thumbnailsArray);
	};

	const deleteImage = (i) => {
		let imagesArray = imageFiles;
		delete imagesArray[i];
		let newImagesArray = imagesArray.filter((element) => element !== undefined);
		setImageFiles(newImagesArray);

		let thumbnailsArray = imageThumbnails;
		delete thumbnailsArray[i];
		let newThumbnailsArray = thumbnailsArray.filter(
			(element) => element !== undefined
		);
		setImageThumbnails(newThumbnailsArray);
	};

	const submitCertForm = () => {
		const formData = new FormData();
		if (imageFiles === [] || title === '' || contentBody === '') {
			alert('제목과 본문, 한 장 이상의 사진은 필수입니다.');
			return;
		}
		formData.append('title', title.trim());
		imageFiles.forEach((imageFile) => {
			formData.append('files', imageFile);
		});
		formData.append('contentBody', contentBody);
		setIsLoading(true);
		axios
			.post('/api/boards/certification', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
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
				<Label htmlFor="title">제목</Label>
				<Title
					value={title}
					onChange={onChange}></Title>
				<Label htmlFor="photos">
					사진
					<span>
						※ 한 장 이상의 사진을 필수로 첨부해주세요. 최대 5장까지 업로드할 수
						있습니다.
					</span>
				</Label>
				<ThumbnailsWrapper items={imageThumbnails.length}>
					{imageThumbnails.map((imageThumbnail, i) => (
						<ThumbnailedDiv
							onClick={() => {
								deleteImage(i);
							}}
							key={i}
							imageThumbnail={imageThumbnail}>
							<div className="content">
								<RxCross2></RxCross2>
							</div>
						</ThumbnailedDiv>
					))}
					{imageThumbnails.length < 5 && (
						<ThumbnailDiv onClick={() => selectFile.current.click()}>
							<div className="content">
								<RxPlus></RxPlus>
							</div>
						</ThumbnailDiv>
					)}
				</ThumbnailsWrapper>
				<FileUploader>
					<input
						type="file"
						name="image_files"
						accept="image/*"
						multiple="multiple"
						onChange={onImagesChange}
						ref={selectFile}></input>
				</FileUploader>
				<EditorComponent
					name="contentBody"
					value={contentBody}
					getHtmlContentBody={getHtmlContentBody}
					placeholder={'진행했던 플로깅 활동에 대해 작성해주세요!'}
				/>
				<ButtonWrap isLoading={isLoading}>
					<div className="loading"></div>
					<Button
						name="cancel"
						onClick={() => {
							if (
								window.confirm('작성을 취소하고 페이지를 벗어나시겠습니까?')
							) {
								movePath(navigate, -1);
							}
						}}>
						취소
					</Button>
					<Button
						onClick={submitCertForm}
						name="write">
						글 등록
					</Button>
				</ButtonWrap>
			</WriteWrapper>
		</>
	);
}
export default PostCertification;
