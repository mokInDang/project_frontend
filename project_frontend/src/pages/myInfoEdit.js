import React, { useEffect, useState } from 'react';
import { MyPageWrapper } from '../components';
import { UserEdit, Location } from 'iconsax-react';
import { GlobalProfile } from '../components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import {
	fileExtensionValid,
	fileSizeValid,
} from '../utils/fileUploadValidHandler';

function MyInfoEdit() {
	const navigate = useNavigate();
	const location = useLocation();
	const [userInfo, setUserInfo] = useState(location.state); // 마이페이지에서 state로 넘어온 회원정보
	const [profileThumbnail, setProfileThumbnail] = useState(); // 업로드한 이미지의 썸네일
	const [profileImage, setProfileImage] = useState(''); // 실제 이미지 파일 저장
	const formData = new FormData();

	const submitChangedProfile = () => {
		if (profileImage === '' || userInfo.alias === '') {
			alert('프로필 이미지를 지정해주세요. 닉네임은 공백일 수 없습니다.');
			return;
		}
		formData.append('profileImage', profileImage);
		formData.append('alias', userInfo.alias);
		axios
			.patch('/api/member/edit-mypage', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res) => {
				console.log(res.data);
				secureLocalStorage.setItem('userInfo', res.data);
				navigate('/mypage');
			})
			.catch((error) => {
				console.error(error);
				console.log('내 정보 수정에 실패했습니다.');
			});
	};
	const createImageURL = (fileBlob) => {
		// createObjectURL 방식으로 프로필 이미지 썸네일 표시
		if (profileThumbnail) URL.revokeObjectURL(profileThumbnail);
		const url = URL.createObjectURL(fileBlob);
		setProfileThumbnail(url);
	};
	const onImageChange = (e) => {
		const { files } = e.target;
		if (!files || !files[0]) return;
		const uploadImage = files[0];
		if (!fileExtensionValid(uploadImage.name)) {
			e.target.value = '';
			alert('업로드 가능한 확장자가 아닙니다. 가능한 확장자: jpg, jpeg, png');
			return;
		}
		if (!fileSizeValid(uploadImage.size)) {
			e.target.value = '';
			alert('업로드 가능한 최대 파일 크기는 5MB입니다.');
			return;
		}
		setProfileImage(uploadImage); // 업로드한 이미지 ProfileImage에 저장
		createImageURL(uploadImage); // 썸네일용 이미지 url 생성
	};

	const onAliasChange = (e) => {
		const newUserInfo = {
			...userInfo, // 기존값 복사 (spread operator)
			[e.target.name]: e.target.value, // 덮어쓰기
		};
		setUserInfo(newUserInfo);
	};

	useEffect(() => {
		if (!location.state) {
			alert('잘못된 접근입니다.');
			navigate(-1);
		}
	}, []);

	return (
		<MyPageWrapper>
			{location.state && (
				<>
					<div className="title">내 정보 수정</div>
					<div className="profileImageWrap">
						<GlobalProfile
							src={
								profileThumbnail ? profileThumbnail : userInfo.profileImageUrl
							}
							size="20rem"
						/>
						{/* <div className="imageButtonsWrap"> */}
						<label htmlFor="profileImg">
							<div className="imageButton">이미지 선택</div>
						</label>
						<input
							type="file"
							accept="image/*"
							id="profileImg"
							onChange={onImageChange}
						/>
						{/* /<div className="imageButton">
								<label onClick={deleteProfileThumbnail}>이미지 제거</label>
							</div> 
						</div> */}
					</div>
					<div className="myInfoWrap">
						<div className="aliasWrap">
							<UserEdit
								size={53}
								color="rgba(58, 58, 58, 1)"
								className="icons"
							/>
							<label htmlFor="alias">닉네임</label>
							<input
								type="text"
								name="alias"
								value={userInfo.alias}
								onChange={onAliasChange}
							/>
						</div>
						<div className="myRegionWrap">
							<Location
								size={53}
								color="rgba(58, 58, 58, 1)"
								className="icons"
							/>
							<label htmlFor="region">나의 위치</label>
							<input
								type="text"
								name="region"
								value={userInfo.region}
								disabled
							/>
						</div>
					</div>
					<div className="buttonsWrap">
						<div
							className="button"
							onClick={() => {
								navigate('/mypage');
							}}>
							취소
						</div>
						<div
							className="button"
							onClick={() => {
								submitChangedProfile();
							}}>
							완료
						</div>
					</div>
				</>
			)}
		</MyPageWrapper>
	);
}
export default MyInfoEdit;
