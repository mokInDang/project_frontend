import React, { useEffect, useState, useRef } from 'react';
import { MyPageWrapper } from '../components';
import { UserEdit, Location } from 'iconsax-react';
import { GlobalProfile } from '../components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyPage() {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({
		'profileImageUrl': 'DEFAULT_PROFILE_IMAGE_URL',
		'alias': '',
		'region': '',
	});

	const locRef = useRef({ latitude: null, longitude: null });

	const getLocation = () => {
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
				.then((res) => {
					getUserInfo();
				})
				.catch((error) => {
					console.log(error);
					alert('위치 받아오기에 실패했습니다.');
				});
		}
		function error(error) {
			console.error(error);
			alert('위치 액세스를 허용해주세요.');
		}
	};
	const getUserInfo = async () => {
		await axios
			.get('api/member/mypage')
			.then((res) => {
				console.log(res.data);
				setUserInfo(res.data);
			})
			.catch((error) => console.log(error));
	};
	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<MyPageWrapper>
			<div className="title">마이페이지</div>
			<div className="profileImageWrap">
				<GlobalProfile
					src={userInfo.profileImageUrl}
					size="20rem"
				/>
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
						readOnly
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
						value={
							userInfo.region === 'DEFAULT_REGION'
								? '위치를 설정해주세요.'
								: userInfo.region
						}
						readOnly
					/>
					<div
						className="getRegionButton"
						onClick={getLocation}>
						내 위치 받아오기
					</div>
				</div>
			</div>
			<div
				className="button"
				onClick={() => {
					navigate('/mypage/edit', { state: userInfo });
				}}>
				수정
			</div>
			{/* <button onClick={() => {}}>회원 탈퇴</button> */}
		</MyPageWrapper>
	);
}
export default MyPage;
