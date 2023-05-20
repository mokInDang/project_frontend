import { useEffect, useState } from 'react';
import { WriteWrapper } from '../components';
import axios from 'axios';
function MyRegionBoardsMap() {
	const [places, setPlaces] = useState([]);
	const getBoards = () => {
		axios
			.get('/api/boards/recruitment/places?page=0&size=30&sort=id')
			.then((res) => {
				setPlaces(res.data.boardPlaceMarkerResponses);
			})
			.catch((error) => {
				console.log(error);
				alert('데이터 받아오기에 실패했습니다.');
			});
	};
	useEffect(() => {
		getBoards();
	}, []);
	return <WriteWrapper></WriteWrapper>;
}
export default MyRegionBoardsMap;
