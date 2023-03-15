import React, { useRef } from 'react';
import axios from 'axios';
function GetLocationButton() {
	const locRef = useRef({ latitude: null, longitude: null });

	const getLocation = () => {
		window.navigator.geolocation.getCurrentPosition(success, error);
		function success(pos) {
			const coordsObj = {
				latitude: null,
				longitude: null,
			};
			coordsObj.latitude = pos.coords.latitude;
			coordsObj.longitude = pos.coords.longitude;
			locRef.current = coordsObj;
			console.log(locRef.current);
			// axios 요청으로 region 보내는 함수
			axios.patch(`/api/member/region`, JSON.stringify(locRef.current), {
				headers: { "Content-Type": "application/json; charset=utf-8" },
			});
			/** 
    
       **/
		}
		function error(error) {
			console.error(error);
			alert('위치 액세스를 허용해주세요.');
		}
	};
	return (
			<div onClick={getLocation}>내 위치 받아오기</div>
	);
}
export default GetLocationButton;