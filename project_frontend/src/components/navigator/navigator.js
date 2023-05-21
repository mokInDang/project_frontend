import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';
import { Dropdown, NewPostDropDown } from '..';
import { useState, useEffect } from 'react';
import { movePath } from '../../utils';
import { homeIcon } from '../../assets/images';
import secureLocalStorage from 'react-secure-storage';
import { locationIcon, logo } from '../../assets/images';
import {
	Headerdiv,
	HeaderButton,
	HeaderButtonWrap,
	ProfileWrap,
	GlobalProfile,
} from '..';

const Navigator = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isLogined, setIsLogined] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const [dropdownView, setDropDownView] = useState(false);

	const getUserInfo = () => {
		if (isLogined) {
			setUserInfo(secureLocalStorage.getItem('userInfo'));
		}
	};
	useEffect(() => {
		setDropDownView(false);
		if (secureLocalStorage.getItem('accessToken') !== null && !isLogined)
			setIsLogined(true);
	}, [location.pathname]); // 페이지 이동 시 dropdown view false로, 페이지 이동 시

	useEffect(() => {
		if (location.pathname === '/mypage') getUserInfo();
	});

	useEffect(() => {
		getUserInfo();
	}, [isLogined]);

	return (
		<>
			{location.pathname !== '/login' && (
				<Headerdiv>
					<div className='headerWrapper'>
						<div className='logoWrapper'>
							<div>
								<div
									className='HomebuttonWrapper'
									onClick={() => navigate('/')}>
									<img src={logo} alt='logo' />
								</div>
							</div>
						</div>
						{location.pathname !== '/api/auth/join' && (
							<HeaderButtonWrap>
								{isLogined && userInfo ? (
									<div
										className='myRegion'
										onClick={navigate(`/boards/recruitment/myregion`)}>
										{userInfo.region !== 'DEFAULT_REGION' ? (
											<HeaderButton>
												<img src={locationIcon} alt='locationIcon' />
												{userInfo.region}
											</HeaderButton>
										) : (
											''
										)}
									</div>
								) : (
									<></>
								)}
								{isLogined && userInfo ? (
									<ProfileWrap
										onClick={() => {
											setDropDownView(!dropdownView);
										}}>
										<GlobalProfile
											size='5rem'
											src={userInfo.profileImageUrl}
											margin='0 0.5rem 0 0'
										/>
										<AiFillCaretDown size={'3rem'} />
										{dropdownView ? <Dropdown /> : ''}
									</ProfileWrap>
								) : (
									<HeaderButton onClick={() => movePath(navigate, '/login')}>
										로그인
									</HeaderButton>
								)}
							</HeaderButtonWrap>
						)}
					</div>
				</Headerdiv>
			)}
		</>
	);
};
export { Navigator };
