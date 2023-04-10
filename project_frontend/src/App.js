import './App.css';
import { Home, Login, BoardDetails, Welcome, Write } from './pages';
import { Routes, Route } from 'react-router-dom';
import { reissueToken } from './apis';
import { Header } from './components';
import { useEffect, useState } from 'react';
function App() {
	const [isLogined, setIsLogined] = useState(false);
	const getIsLogined = (value) => {
		setIsLogined(value);
	};
	useEffect(() => {
		getIsLogined(reissueToken());
		console.log(isLogined);
	});

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
					path="/boards"
					element={<Write />}
				/>
				<Route
					path="/boards/:boardId"
					element={<BoardDetails />}
				/>
			</Routes>
		</div>
	);
}

export default App;
