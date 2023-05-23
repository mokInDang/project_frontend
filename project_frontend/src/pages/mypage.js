import React, { useEffect, useState, useRef } from 'react';
import { HR, Loading, MyPageWrapper } from '../components';
import { User, Location } from 'iconsax-react';
import { GlobalProfile } from '../components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

function MyPage() {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({
		profileImageUrl: 'DEFAULT_PROFILE_IMAGE_URL',
		alias: '',
		region: 'DEFAULT_REGION',
	});
	const [isLoading, setIsLoading] = useState(false);
	const locRef = useRef({ latitude: null, longitude: null });

	const getLocation = () => {
		setIsLoading(true);
		window.navigator.geolocation.getCurrentPosition(success, error);
		function success(pos) {
			const coordsObj = {
				latitude: null,
				longitude: null,
			};
			coordsObj.latitude = pos.coords.latitude;
			coordsObj.longitude = pos.coords.longitude;
			locRef.current = coordsObj;
			// axios 요청으로 region 보내는 함수
			axios
				.patch(`/api/member/region`, JSON.stringify(locRef.current), {
					headers: { 'Content-Type': 'application/json; charset=utf-8' },
				})
				.then(() => {
					getUserInfo();
					alert('위치 받아오기에 성공했습니다.');
					setIsLoading(false);
				})
				.catch((error) => {
					console.log(error);
					alert('위치 받아오기에 실패했습니다.');
					setIsLoading(false);
				});
		}
		function error(error) {
			console.error(error);
			alert('위치 액세스를 허용해주세요.');
			setIsLoading(false);
		}
	};
	const getUserInfo = async () => {
		await axios
			.get('api/member/mypage')
			.then((res) => {
				secureLocalStorage.setItem('userInfo', res.data);
				setUserInfo(res.data);
			})
			.catch((error) => console.log(error));
	};
	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<>
			<Loading isLoading={isLoading} />
			<MyPageWrapper>
				<div className='title'>
					<span className='titleText'>마이페이지</span>
				</div>
				<div className='profileImageWrap'>
					<GlobalProfile
						src={userInfo.profileImageUrl}
						size='20rem'
						margin='0 0.5rem 0 0'
					/>
				</div>
				<div className='myInfoWrap'>
					<div>
						<div>
							<div className='aliasWrap'>
								<User
									size={'5rem'}
									color='rgba(58, 58, 58, 1)'
									className='icons'
								/>
								<label htmlFor='alias'>닉네임</label>
								<input
									type='text'
									name='alias'
									value={userInfo.alias}
									readOnly
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
										userInfo.region === 'DEFAULT_REGION' ? '' : userInfo.region
									}
									readOnly
								/>
							</div>
						</div>
					</div>
					<div className='getRegionButton' onClick={getLocation}>
						내 위치 받아오기
					</div>
				</div>
				<div className='buttonsWrap'>
					<div
						className='button'
						style={{ width: '12rem' }}
						onClick={() => {
							navigate('/mypage/edit', { state: userInfo });
						}}>
						내 정보 수정
					</div>
				</div>
				{/* <button onClick={() => {}}>회원 탈퇴</button> */}
			</MyPageWrapper>
		</>
	);
}
export default MyPage;
