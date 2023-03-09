import React, { useRef } from 'react';

function GetLocationButton() {
	const locRef = useRef({ lat: null, lng: null });

	const getLocation = () => {
		window.navigator.geolocation.getCurrentPosition(success, error);
		function success(pos) {
			const coordsObj = {
				lat: null,
				lng: null,
			};
			coordsObj.lat = pos.coords.latitude;
			coordsObj.lng = pos.coords.longitude;
			locRef.current = coordsObj;
			console.log(`${locRef.current.lat}`);
			console.log(`${locRef.current.lng}`);
			// axios 요청으로 region 보내는 함수
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