import './App.css';
import {
	Home,
	Login,
	BoardDetails,
	Welcome,
	PostRecruitment,
	PatchRecruitment,
	MyPage,
	MyInfoEdit,
	PostCertification,
	CertificationDetails,
	PatchCertification,
	MyRegionBoardsMap,
} from './pages';
import { Routes, Route } from 'react-router-dom';
import { Navigator } from './components';
import { reissueToken } from './apis';
import { Comments } from './pages/comments';
import { PrivateRoutes, RegionRequiredRoutes } from './utils';
function App() {
	// 페이지 리로드 시 reissueToken 실행
	console.log('App.js에서 reissueToken 실행');
	reissueToken();

	return (
		<div className='App'>
			<Navigator />
			<Routes>
				{/* 인증 여부 상관 없이 접근 가능한 페이지 정의 */}
				<Route exact path='/*' element={<Home />} />

				<Route element={<PrivateRoutes authentication={false} />}>
					{/* 인증을 반드시 하지 않아야만 접근 가능한 페이지 정의 */}
					<Route path='/login' element={<Login />} />
				</Route>
				<Route path='/api/auth/join' element={<Welcome />} />

				<Route element={<PrivateRoutes authentication={true} />}>
					{/* 인증을 반드시 해야만 접근 가능한 페이지 정의 */}
					<Route path='/mypage' element={<MyPage />} />
					<Route path='/mypage/edit' element={<MyInfoEdit />} />
					<Route
						path='/boards/recruitment/:boardId'
						element={<BoardDetails />}
					/>
					<Route
						path='/boards/certification/:boardId'
						element={<CertificationDetails />}
					/>
					<Route element={<RegionRequiredRoutes />}>
						<Route path='/boards/recruitment' element={<PostRecruitment />} />
						<Route
							path='/boards/certification'
							element={<PostCertification />}
						/>
						<Route
							path='/boards/recruitment/myregion'
							element={<MyRegionBoardsMap />}
						/>
					</Route>
					<Route
						path='/edit/recruitment/:boardId'
						element={<PatchRecruitment />}
					/>
					<Route
						path='/edit/certification/:boardId'
						element={<PatchCertification />}
					/>
				</Route>
				{/* Comments도 추후 PrivateRoutes 안으로 옮길 것 */}
				<Route
					path='/boards/certification/:boardId/comments'
					element={<Comments />}
				/>
				<Route
					path='/boards/recruitment/:boardId/comments'
					element={<Comments />}
				/>
			</Routes>
		</div>
	);
}

export default App;
