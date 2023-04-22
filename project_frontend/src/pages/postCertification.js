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
import { useEffect } from 'react';
import {
	fileExtensionValid,
	fileSizeValid,
} from '../utils/fileUploadValidHandler';
import { RxPlus, RxCross2 } from 'react-icons/rx';

function PostCertification() {
	let initialForm = {
		title: '',
		contentBody: '',
	};

	const [form, setForm] = useState(initialForm);
	const [imageFiles, setImageFiles] = useState([]);
	const [imageThumbnails, setImageThumbnails] = useState([]);
	const selectFile = useRef();
	const getHtmlContentBody = (newContentBody) => {
		if (newContentBody === '<p><br></p>') {
			newContentBody = '';
		}
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			contentBody: newContentBody, // 덮어쓰기
		};
		setForm(nextForm);
	};

	const onChange = (e) => {
		// input 태그에 사용되는 함수
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			[e.target.name]: e.target.value, // 덮어쓰기
		};
		setForm(nextForm);
	};

	const onImagesChange = (e) => {
		const { files } = e.target;
		if (!files || !files[0]) return;
		let maxFileCnt = 5;
		let imageListLength = imageFiles.length;
		let remainFileCnt = maxFileCnt - imageListLength;
		let curFileCnt = files.length;
		console.log(imageListLength);
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
		}
		setImageFiles(Array.from(files)); // 업로드한 이미지 ProfileImage에 저장
	};
	useEffect(() => {
		console.log(imageFiles);
		console.log(imageThumbnails);
	}, [imageFiles]);

	const createImageURL = (fileBlob) => {
		// createObjectURL 방식으로 프로필 이미지 썸네일 표시
		// if (profileThumbnail) URL.revokeObjectURL(profileThumbnail);
		const url = URL.createObjectURL(fileBlob);
		const thumbnailsArray = imageThumbnails;
		thumbnailsArray.push(url);
		setImageThumbnails(thumbnailsArray);
	};
	const deleteImage = (i) => {
		console.log('clicked');
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
					value={form.title}
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
					value={form.contentBody}
					getHtmlContentBody={getHtmlContentBody}
					placeholder={'진행했던 프로젝트를 인증해주세요!'}
				/>
				<ButtonWrap>
					<Button
						name="cancel"
						onClick={() => {}}>
						취소
					</Button>
					<Button
						onClick={() => {
							console.log(form);
						}}
						name="write">
						글 등록
					</Button>
				</ButtonWrap>
			</WriteWrapper>
		</>
	);
}
export default PostCertification;
