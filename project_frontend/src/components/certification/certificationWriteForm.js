import { useState, useRef, useEffect } from "react";
import { EditorComponent, WriteWrapper } from "..";
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
} from "..";
import { fileExtensionValid, fileSizeValid } from "../../utils";
import { RxPlus, RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useNavigate } from "react-router";

function CertificationWriteForm(props) {
	const boardIdToEdit = props.boardIdToEdit;
	const [form, setForm] = useState(props.form);
	const { title, contentBody, fileUrls } = form;
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		props.getIsLoading(isLoading);
	}, [isLoading]);
	const selectFile = useRef();
	const getHtmlContentBody = (newContentBody) => {
		if (
			newContentBody === "<p><br></p>" ||
			newContentBody.replace(/(<([^>]+)>)/gi, "").replace(/\s/g, "") === ""
		) {
			newContentBody = "";
		}
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			contentBody: newContentBody, // 덮어쓰기
		};
		setForm(nextForm);
	};

	const onChange = (e) => {
		// input title에 사용되는 함수
		if (e.target.value.replace(/ /g, "") === "") e.target.value = "";
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			title: e.target.value.trim(), // 덮어쓰기
		};
		setForm(nextForm);
	};

	const onImagesChange = async (e) => {
		const { files } = e.target;
		let isFailed = false;
		if (!files || !files[0]) return;
		let maxFileCnt = 5;
		let imageList = fileUrls;
		let imageListLength = fileUrls.length;
		let remainFileCnt = maxFileCnt - imageListLength;
		let curFileCnt = files.length;
		if (curFileCnt > remainFileCnt) {
			e.target.value = "";
			alert("업로드 가능한 최대 파일 개수는 5개입니다.");
			return;
		}
		for (let i = 0; i < files.length; i++) {
			const imageFile = files[i];
			if (!fileExtensionValid(imageFile.name)) {
				e.target.value = "";
				alert("업로드 가능한 확장자가 아닙니다. 가능한 확장자: jpg, jpeg, png");
				return;
			}
			if (!fileSizeValid(imageFile.size)) {
				e.target.value = "";
				alert("업로드 가능한 최대 파일 크기는 파일 당 10MB입니다.");
				return;
			}
			await onImageUpload(imageFile, imageList, isFailed);
		}

		if (isFailed) {
			alert("일부 이미지 업로드에 실패했습니다.");
			return;
		}
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			fileUrls: Array.from(imageList), // 덮어쓰기
		};
		setForm(nextForm);
	};

	const onImageUpload = async (imageFile, imageList, isFailed) => {
		setIsLoading(true);
		const formData = new FormData();
		formData.set("image", imageFile);
		await axios
			.post("/api/image/certification-image", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				imageList.push(res.data.imageUrl);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
				isFailed = true;
			});
	};

	const onImageDelete = (i) => {
		let imageUrlsArray = fileUrls;
		delete imageUrlsArray[i];
		let newImageUrlsArray = imageUrlsArray.filter(
			(element) => element !== undefined
		);
		const nextForm = {
			...form, // 기존값 복사 (spread operator)
			fileUrls: newImageUrlsArray, // 덮어쓰기
		};
		setForm(nextForm);
	};

	const postCertForm = (form) => {
		const { fileUrls, title, contentBody } = form;
		if (fileUrls === [] || title === "" || contentBody === "") {
			alert("제목과 본문, 한 장 이상의 사진은 필수입니다.");
			return;
		}
		setIsLoading(true);
		axios
			.post("/api/boards/certification", form)
			.then((res) => {
				navigate(`/boards/certification/${res.data.boardId}`);
			})
			.catch((error) => {
				console.error(error);
				alert("글 작성에 실패했습니다.");
				setIsLoading(false);
			});
	};

	const patchCertForm = (boardIdToEdit, form) => {
		const { fileUrls, title, contentBody } = form;
		if (fileUrls === [] || title === "" || contentBody === "") {
			alert("제목과 본문, 한 장 이상의 사진은 필수입니다.");
			return;
		}
		setIsLoading(true);
		axios
			.patch(`/api/boards/certification/${boardIdToEdit}`, form)
			.then((res) => {
				navigate(`/boards/certification/${res.data.boardId}`);
			})
			.catch((error) => {
				console.error(error);
				alert("글 작성에 실패했습니다.");
				setIsLoading(false);
			});
	};
	return (
		<WriteWrapper>
			<P>
				<span
					style={{
						width: "1rem",
						height: "1rem",
						backgroundColor: "#81CC55",
						borderRadius: "1rem",
						marginRight: "1rem",
					}}></span>
				플로깅 활동을 인증해주세요.
			</P>
			<HR></HR>
			<Label htmlFor="title">제목</Label>
			<Title value={title} onChange={onChange}></Title>
			<Label htmlFor="photos">
				사진
				<span className="photoInfoText">
					※ 한 장 이상의 사진을 필수로 첨부해주세요. 최대 5장까지 업로드할 수
					있습니다.
				</span>
			</Label>
			<ThumbnailsWrapper items={fileUrls.length}>
				{fileUrls.map((imageUrl, i) => (
					<ThumbnailedDiv
						onClick={() => {
							onImageDelete(i);
						}}
						key={i}
						imageUrl={imageUrl}>
						<div className="content">
							<RxCross2></RxCross2>
						</div>
					</ThumbnailedDiv>
				))}
				{fileUrls.length < 5 && (
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
				placeholder={"진행했던 플로깅 활동에 대해 작성해주세요!"}
			/>
			<ButtonWrap>
				<Button
					name="cancel"
					onClick={() => {
						if (window.confirm("작성을 취소하고 페이지를 벗어나시겠습니까?")) {
							navigate(-1);
						}
					}}>
					취소
				</Button>
				<Button
					onClick={() => {
						if (!boardIdToEdit) postCertForm(form);
						else patchCertForm(boardIdToEdit, form);
					}}
					name="write">
					{!boardIdToEdit ? "글 등록" : "수정하기"}
				</Button>
			</ButtonWrap>
		</WriteWrapper>
	);
}
export { CertificationWriteForm };
