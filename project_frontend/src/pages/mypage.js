import React, { useEffect, useState } from 'react';
import { MyPageWrapper } from '../components';
import { UserEdit, Location } from 'iconsax-react';
import { GlobalProfile } from '../components';
import { useNavigate, useLocation } from 'react-router-dom';
import GetLocationButton from '../components/getLocationButton';
import axios from 'axios';

function MyPage() {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({
		'profileImageUrl': 'DEFAULT_PROFILE_IMAGE_URL',
		'alias': '홍길동',
		'region': '동에번쩍서에번쩍',
	});
	useEffect(() => {
		axios
			.get('api/member/mypage')
			.then((res) => {
				console.log(res.data);
				setUserInfo(res.data);
			})
			.catch((error) => console.log(error));
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
						value={userInfo.region}
						readOnly
						disabled
					/>
					<GetLocationButton className="button" />
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
