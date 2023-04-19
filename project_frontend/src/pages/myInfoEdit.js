import React, { useState } from 'react';
import { MyPageWrapper } from '../components';
import { UserEdit, Location } from 'iconsax-react';
import { GlobalProfile } from '../components';
import { useNavigate, useLocation } from 'react-router-dom';

function MyInfoEdit() {
	const navigate = useNavigate();
	const location = useLocation();
	const [userInfo, setUserInfo] = useState({
		'profileImageUrl': 'DEFAULT_PROFILE_IMAGE_URL',
		'alias': '기본 닉네임',
		'region': '기본 위치',
	});
	const [profileThumbnail, setProfileThumbnail] = useState();
	const createImageURL = (fileBlob) => {
		// createObjectURL 방식
		if (profileThumbnail) URL.revokeObjectURL(profileThumbnail);
		const url = URL.createObjectURL(fileBlob);
		setProfileThumbnail(url);
	};
	const onImageChange = (e) => {
		const { files } = e.target;
		if (!files || !files[0]) return;
		const uploadImage = files[0];
		// formdata 세팅하는 함수 넣을것
		createImageURL(uploadImage);
	};

	const deleteProfileThumbnail = () => {
		setProfileThumbnail('DEFAULT_PROFILE_IMAGE_URL');
	};
	const onAliasChange = (e) => {
		const newUserInfo = {
			...userInfo, // 기존값 복사 (spread operator)
			[e.target.name]: e.target.value, // 덮어쓰기
		};
		setUserInfo(newUserInfo);
	};
	return (
		<MyPageWrapper>
			<div className="title">
				{location.pathname === '/mypage' ? '마이페이지' : '내 정보 수정'}
			</div>
			<div className="profileImageWrap">
				<GlobalProfile
					src={profileThumbnail ? profileThumbnail : userInfo.profileImageUrl}
					size="20rem"
				/>
				<div className="imageButtonsWrap">
					<div className="imageButton">
						<label htmlFor="profileImg">이미지 선택</label>
					</div>
					<input
						type="file"
						accept="image/*"
						id="profileImg"
						onChange={onImageChange}
					/>
					<div className="imageButton">
						<label onClick={deleteProfileThumbnail}>이미지 제거</label>
					</div>
				</div>
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
			<div>
				<button
					onClick={() => {
						navigate('/mypage');
					}}>
					취소
				</button>
				<button
					onClick={() => {
						console.log('완료버튼 클릭');
					}}>
					완료
				</button>
			</div>
			<div>닉네임 변경 미리보기 : {userInfo.alias}</div>
			<div>브라우저 주소 미리보기 : {location.pathname}</div>
		</MyPageWrapper>
	);
}
export default MyInfoEdit;
