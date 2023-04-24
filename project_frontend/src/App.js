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
} from './pages';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { reissueToken } from './apis';
import { Comments } from './pages/comments';
function App() {
	// 페이지 리로드 시 reissueToken 실행
	console.log('App.js에서 reissueToken 실행');
	reissueToken();

	return (
		<div className="App">
			<Header />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/api/auth/join"
					element={<Welcome />}
				/>
				<Route
					path="/boards/recruitment"
					element={<PostRecruitment />}
				/>
				<Route
					path="/edit/recruitment/:boardId"
					element={<PatchRecruitment />}
				/>
				<Route
					path="/boards/recruitment/:boardId"
					element={<BoardDetails />}
				/>
				<Route
					path="/mypage"
					element={<MyPage />}
				/>
				<Route
					path="/mypage/edit"
					element={<MyInfoEdit />}
				/>
				<Route
					path="/boards/certification"
					element={<PostCertification />}
				/>
				<Route
					path="/boards/certification/:boardId"
					element={<CertificationDetails />}
				/>
				<Route
					path="/edit/certification/:boardId"
					element={<PatchCertification />}
				/>
				<Route
					path="/boards/certification/:boardId/comments"
					element={<Comments />}
				/>
				<Route
					path="/boards/recruitment/:boardId/comments"
					element={<Comments />}
				/>
				<Route
					path="/*"
					element={<div>404 not found</div>}
				/>
			</Routes>
		</div>
	);
}

export default App;
