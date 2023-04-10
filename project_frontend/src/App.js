import './App.css';
import { Home, Login, BoardDetails, Welcome, Write } from './pages';
import { Routes, Route } from 'react-router-dom';
import { reissueToken } from './apis';
import { useEffect } from 'react';
import { Header } from './components';
import { useState } from 'react';
import axios from 'axios';

function App() {
	const [isLogined, setIsLogined] = useState(false);
	useEffect(() => {
		console.log('App.js에서 reissueToken 호출');
		reissueToken();
		const token = axios.defaults.headers.common.Authorization;
		if (typeof token === 'string' && token.slice(0, 6) === 'Bearer') {
			setIsLogined(true);
		} else {
			setIsLogined(false);
		}
	},[]);
	

	return (
		<div className="App">
			<Header isLogined={isLogined} />
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
