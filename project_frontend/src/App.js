import './App.css';
import { Home, Login, BoardDetails, Welcome, Write } from './pages';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { useState, useEffect } from 'react';
import { reissueToken } from './apis';

function App() {
	const [isLogined, setIsLogined] = useState(false);
	const getIsLogined = (value) => {
		setIsLogined(value);
	};
	useEffect(() => {
		// 페이지 리로드 시 reissueToken 실행
		console.log('App.js에서 reissueToken 실행');
		reissueToken();
	}, []);
	return (
		<div className="App">
			<Header
				isLogined={isLogined}
				getIsLogined={getIsLogined}
			/>
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
					element={<Write />}
				/>
				<Route
					path="/boards/recruitment/:boardId"
					element={<BoardDetails />}
				/>
			</Routes>
		</div>
	);
}

export default App;
