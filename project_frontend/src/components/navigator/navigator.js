import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';
import { Dropdown } from '..';
import { useState, useEffect, useRef } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { locationIcon, logo } from '../../assets/images';
import {
	Headerdiv,
	HeaderButton,
	HeaderButtonWrap,
	ProfileWrap,
	GlobalProfile,
} from '..';
import { useSelector } from 'react-redux';

const Navigator = () => {
	const isLogined = useSelector((state) => state.user.isLogined);
	const userInfo = useSelector((state) => state.user.userInfo);
	const state = useSelector((state) => state);
	const navigate = useNavigate();
	const location = useLocation();
	const [dropdownView, setDropdownView] = useState(false);
	const dropMenuRef = useRef();
	useEffect(() => {
		setDropdownView(false);
	}, [location.pathname]); // 페이지 이동 시 dropdown view false로, 페이지 이동 시
	useEffect(() => {
		console.log(state);
	}, [state]);

	return (
		<>
			{location.pathname !== '/login' && (
				<Headerdiv>
					<div className='headerWrapper'>
						<div className='logoWrapper'>
							<div>
								<div
									className='HomebuttonWrapper'
									onClick={() => navigate('/')}
								>
									<img src={logo} alt='logo' />
								</div>
							</div>
						</div>
						{location.pathname !== '/api/auth/join' && (
							<HeaderButtonWrap>
								{isLogined ? (
									<>
										{userInfo.region !== 'DEFAULT_REGION' && (
											<div className='myRegion myRegionMapButton'>
												<HeaderButton
													onClick={() => navigate(`/myregionmap`)}
													style={{ paddingRight: '1rem' }}
												>
													<img src={locationIcon} alt='locationIcon' />
													{userInfo.region}
												</HeaderButton>
											</div>
										)}
										<ProfileWrap
											dropdownView={dropdownView}
											ref={dropMenuRef}
											onClick={() => setDropdownView(!dropdownView)}
										>
											<GlobalProfile
												size='5rem'
												src={userInfo.profileImageUrl}
												margin='0 0.5rem 0 0'
											/>
											<AiFillCaretDown className='arrowDown' size={'2.5rem'} />
											{dropdownView && (
												<Dropdown
													setDropdownView={setDropdownView}
													dropMenuRef={dropMenuRef}
												/>
											)}
										</ProfileWrap>
									</>
								) : (
									<HeaderButton onClick={() => navigate('/login')}>
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
