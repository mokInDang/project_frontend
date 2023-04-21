import React, { useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Button = styled.div`
	width: 14rem;
	height: 3rem;
	background: rgba(36, 36, 36, 1);
	color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 7px;
	box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.13);
	font-size: 1.6rem;
`;
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
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
			});
			/** 
    
       **/
		}
		function error(error) {
			console.error(error);
			alert('위치 액세스를 허용해주세요.');
		}
	};
	return <Button onClick={getLocation}>내 위치 받아오기</Button>;
}
export default GetLocationButton;
