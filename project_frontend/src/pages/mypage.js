import React, { useState } from 'react';
import { MyPageWrapper } from '../components';
import { UserEdit, Location } from 'iconsax-react';
import { GlobalProfile } from '../components';
import { useNavigate, useLocation } from 'react-router-dom';
import GetLocationButton from '../components/getLocationButton';

function MyPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const [userInfo, setUserInfo] = useState({
		'profileImageUrl': 'DEFAULT_PROFILE_IMAGE_URL',
		'alias': '기본 닉네임',
		'region': '기본 위치',
	});
	return (
		<MyPageWrapper>
			<div className="title">
				{location.pathname === '/mypage' ? '마이페이지' : '내 정보 수정'}
			</div>
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
			{location.pathname == '/mypage' && (
				<div>
					<button
						onClick={() => {
							navigate('/mypage/edit', { state: userInfo });
						}}>
						수정
					</button>
					<button onClick={() => {}}>회원 탈퇴</button>
				</div>
			)}
			<div>닉네임 변경 미리보기 : {userInfo.alias}</div>
			<div>브라우저 주소 미리보기 : {location.pathname}</div>
		</MyPageWrapper>
	);
}
export default MyPage;
