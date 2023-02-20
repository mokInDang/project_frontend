import './App.css';
import { Home, Welcome, Login } from './pages';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" exact={true} element={<Home />}/>
				<Route path="/login" element={<Login />}/>
				<Route path="/api/member/join" element={<Welcome />}/>
			</Routes>
		</div>
	);
}

export default App;
