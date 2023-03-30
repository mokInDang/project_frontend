import './App.css';
import { Home, Login, BoardDetails, Welcome, Write } from './pages';
import { Routes, Route } from 'react-router-dom';
import { reissueToken } from './apis';
import { useEffect } from 'react';

function App() {
	useEffect(() => {
		console.log('App.js에서 reissueToken 호출');
		reissueToken();
	});

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path="/login" element={<Login />}/>
				<Route path="/api/auth/join" element={<Welcome />}/>
				<Route path="/boards" element={<Write />}/>
				<Route path="/boards/:boardId" element={<BoardDetails />}/>
			</Routes>
		</div>
	);
}

export default App;
