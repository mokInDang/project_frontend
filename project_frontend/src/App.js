import './App.css';
import { Home, Login, Welcome, Write } from './pages';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { onSilentRefresh } from './apis';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path="/login" element={<Login />}/>
				<Route path="/api/member/join" element={<Welcome />}/>
				<Route path="/boards" element={<Write />}/>
			</Routes>
		</div>
	);
}

export default App;
