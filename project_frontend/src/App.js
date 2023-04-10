import './App.css';
import { Home, Login, BoardDetails, Welcome, Write } from './pages';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { useState } from 'react';
function App() {
	const [isLogined, setIsLogined] = useState(false);
	const getIsLogined = (value) => {
		setIsLogined(value);
	};

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
