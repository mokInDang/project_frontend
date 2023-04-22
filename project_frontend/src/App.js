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
	PostCertification
} from './pages';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { useState, useEffect } from 'react';
import { reissueToken } from './apis';

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
					path="/*"
					element={<div>404 not found</div>}
				/>
			</Routes>
		</div>
	);
}

export default App;
