import { useEffect, useState } from 'react';
import { MyRegionMap } from '../components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
function MyRegionBoardsMap() {
	const navigate = useNavigate();
	const [isLoaded, setIsLoaded] = useState(false);
	const [places, setPlaces] = useState([]);
	const userInfo = secureLocalStorage.getItem('userInfo');
	const getRecruitments = () => {
		axios
			.get('/api/boards/recruitment/places?page=0&size=30&sort=id')
			.then((res) => {
				const recruitments = res.data.boardPlaceMarkerResponses;
				setPlaces(recruitments);
				setIsLoaded(true);
			})
			.catch((error) => {
				console.log(error);
				alert('데이터 받아오기에 실패했습니다.');
				navigate('/');
				// setPlaces([
				// 	{
				// 		'recruitmentBoardIdResponse': {
				// 			'boardId': 46,
				// 		},
				// 		'meetingPlaceResponse': {
				// 			'longitude': 126.958177114993,
				// 			'latitude': 37.4960919285211,
				// 			'meetingAddress': '서울 동작구 상도로 369 숭실대학교 우편취급국',
				// 		},
				// 		'title': 'useEffect 실행후!',
				// 	},
				// 	{
				// 		'recruitmentBoardIdResponse': {
				// 			'boardId': 47,
				// 		},
				// 		'meetingPlaceResponse': {
				// 			'longitude': 126.955595261123,
				// 			'latitude': 37.4963495751839,
				// 			'meetingAddress': '서울 동작구 상도로 369 숭실대학교 주차장',
				// 		},
				// 		'title': 'useEffect 실행후!!!',
				// 	},
				// ]);
			});
	};
	useEffect(() => {
		getRecruitments();
	}, []);
	useEffect(() => {
		console.log(places);
	}, [places]);
	return (
		isLoaded && (
			<MyRegionMap
				places={places}
				isLoaded={isLoaded}
				region={userInfo ? userInfo.region : ''}></MyRegionMap>
		)
	);
}
export default MyRegionBoardsMap;
