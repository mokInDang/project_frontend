import { useEffect, useState } from 'react';
import { WriteWrapper, MyRegionMap } from '../components';
import axios from 'axios';
function MyRegionBoardsMap() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [places, setPlaces] = useState([]);
	const getRecruitments = () => {
		axios
			.get('/api/boards/recruitment/places?page=0&size=30&sort=id')
			.then((res) => {
				const recruitments = res.data;
				setPlaces(recruitments);
			})
			.catch((error) => {
				console.log(error);
				alert('데이터 받아오기에 실패했습니다.');
				setIsLoaded(true);
				setPlaces([
					{
						'recruitmentBoardIdResponse': {
							'boardId': 46,
						},
						'meetingPlaceResponse': {
							'longitude': 126.958177114993,
							'latitude': 37.4960919285211,
							'meetingAddress': '서울 동작구 상도로 369 숭실대학교 우편취급국',
						},
						'title': 'useEffect 실행후!',
					},
					{
						'recruitmentBoardIdResponse': {
							'boardId': 47,
						},
						'meetingPlaceResponse': {
							'longitude': 126.955595261123,
							'latitude': 37.4963495751839,
							'meetingAddress': '서울 동작구 상도로 369 숭실대학교 주차장',
						},
						'title': 'useEffect 실행후!!!',
					},
				]);
				setIsLoaded(true);
			});
	};
	useEffect(() => {
		getRecruitments();
	}, []);
	useEffect(() => {
		console.log(places);
	}, [places]);
	return <MyRegionMap places={places} isLoaded={isLoaded}></MyRegionMap>;
}
export default MyRegionBoardsMap;
