import React, { useEffect, useState } from 'react';
import { MyPageWrapper } from '../components';
import { UserEdit, Location } from 'iconsax-react';
import { GlobalProfile, Loading } from '../components';
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
	const [isLoading, setIsLoading] = useState(false);
	const formData = new FormData();

	const submitChangedProfile = () => {
		if (
			userInfo.alias
				.replace(/\s/gi, '')
				.replace(/\n/gi, '')
				.replace(/&nbsp;/gi, '') === ''
		) {
			alert('닉네임은 공백일 수 없습니다.');
			return;
		}
		setIsLoading(true);
		axios
			.patch('/api/member/edit-mypage', userInfo)
			.then((res) => {
				secureLocalStorage.setItem('userInfo', res.data);
				navigate('/mypage');
			})
			.catch((error) => {
				console.error(error);
				alert('내 정보 수정에 실패했습니다.');
				setIsLoading(false);
			});
	};
	const onImageUpload = (e) => {
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
		setIsLoading(true);
		formData.set('image', uploadImage);
		axios
			.post('/api/image/member/profile-image', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res) => {
				const newUserInfo = {
					...userInfo, // 기존값 복사 (spread operator)
					profileImageUrl: res.data.imageUrl, // 덮어쓰기
				};
				setUserInfo(newUserInfo);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error);
				alert('프로필 이미지 업로드에 실패했습니다.');
				setIsLoading(false);
			});
	};
	const onImageDelete = () => {
		setIsLoading(true);
		axios
			.delete('/api/image/member/profile-image')
			.then((res) => {
				const newUserInfo = {
					...userInfo, // 기존값 복사 (spread operator)
					profileImageUrl: res.data.imageUrl, // 덮어쓰기
				};
				setUserInfo(newUserInfo);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error);
				alert('프로필 이미지 삭제에 실패했습니다.');
				setIsLoading(false);
			});
	};

	const onAliasChange = (e) => {
		let reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
		const newUserInfo = {
			...userInfo, // 기존값 복사 (spread operator)
			[e.target.name]: e.target.value.replace(reg, ''), // 덮어쓰기
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
		<>
			<Loading isLoading={isLoading} />
			<MyPageWrapper>
				{location.state && (
					<>
						<div className='title'>
							<span className='titleText'>내 정보 수정</span>
						</div>
						<div className='profileImageWrap'>
							<GlobalProfile
								src={userInfo.profileImageUrl}
								size='20rem'
								margin='0 0.5rem 0 0'
							/>
							<div className='imageButtonsWrap'>
								<label htmlFor='profileImg'>
									<div className='imageButton'>이미지 선택</div>
								</label>
								<input
									type='file'
									accept='image/*'
									id='profileImg'
									onChange={onImageUpload}
								/>
								<div className='imageButton' onClick={onImageDelete}>
									이미지 제거
								</div>
							</div>
						</div>
						<div className='myInfoWrap'>
							<div>
								<div className='aliasWrap'>
									<UserEdit
										size={'5rem'}
										color='rgba(58, 58, 58, 1)'
										className='icons'
									/>
									<label htmlFor='alias'>닉네임</label>
									<input
										type='text'
										name='alias'
										value={userInfo.alias}
										onChange={onAliasChange}
									/>
								</div>
								<div className='myRegionWrap'>
									<Location
										size={'5rem'}
										color='rgba(58, 58, 58, 1)'
										className='icons'
									/>
									<label htmlFor='region'>나의 위치</label>
									<input
										type='text'
										name='region'
										value={
											userInfo.region === 'DEFAULT_REGION'
												? '위치를 설정해주세요.'
												: userInfo.region
										}
										disabled
									/>
								</div>
							</div>
						</div>
						<div className='buttonsWrap'>
							<div
								className='button'
								onClick={() => {
									navigate('/mypage');
								}}>
								취소
							</div>
							<div
								className='button'
								onClick={() => {
									submitChangedProfile();
								}}>
								완료
							</div>
						</div>
					</>
				)}
			</MyPageWrapper>
		</>
	);
}
export default MyInfoEdit;
