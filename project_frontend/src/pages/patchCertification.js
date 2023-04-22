import { useNavigate, useLocation, useParams } from 'react-router';
import {
	WriteWrapper,
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
	EditorComponent,
} from '../components';
import { useEffect, useState, useRef } from 'react';
import {
	fileExtensionValid,
	fileSizeValid,
} from '../utils/fileUploadValidHandler';
import { RxPlus, RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { movePath } from '../utils';

function PatchCertification() {
	const navigate = useNavigate();
	const certificationToEdit = useLocation().state;
	const boardId = useParams().boardId;
	const [title, setTitle] = useState(
		certificationToEdit ? certificationToEdit.title : ''
	);
	const [contentBody, setContentbody] = useState(
		certificationToEdit ? certificationToEdit.contentBody : ''
	);
	const [imageFiles, setImageFiles] = useState([]);
	const [imageThumbnails, setImageThumbnails] = useState([]);
	const selectFile = useRef();
	const getHtmlContentBody = (newContentBody) => {
		if (newContentBody === '<p><br></p>') {
			newContentBody = '';
		}
		setContentbody(newContentBody);
	};

	const onChange = (e) => {
		// input title에 사용되는 함수
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
		console.log(imageFiles);
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

	const submitEditedCertForm = () => {
		const formData = new FormData();
		if (imageFiles === [] || title === '' || contentBody === '') {
			alert('제목과 본문, 한 장 이상의 사진은 필수입니다.');
			return;
		}
		formData.append('title', title);
		console.log(imageFiles);
		imageFiles.forEach((imageFile) => {
			formData.append('files', imageFile);
		});
		formData.append('contentBody', contentBody);
		console.log(formData.get('title'));
		console.log(formData.get('files'));
		console.log(formData.get('contentBody'));
		axios
			.patch(`/api/boards/certification/${boardId}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(() => {
				navigate(`/boards/certification/${boardId}`);
			})
			.catch((error) => {
				console.error(error);
				console.log('글 작성에 실패했습니다.');
			});
	};
	useEffect(() => {
		if (!certificationToEdit) {
			alert('잘못된 접근입니다.');
			navigate('/', { replace: true });
		}
	}, []);

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
					프로젝트를 인증해주세요.
				</P>
				<HR></HR>
				<Label htmlFor="title">제목</Label>
				<Title
					type="text"
					placeholder="글 제목을 입력해주세요."
					name="title"
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
					placeholder={'진행했던 프로젝트를 인증해주세요!'}
				/>
				<ButtonWrap>
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
						onClick={submitEditedCertForm}
						name="write">
						수정하기
					</Button>
				</ButtonWrap>
			</WriteWrapper>
		</>
	);
}
export default PatchCertification;
