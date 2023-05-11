/*global kakao*/
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';

const MapWrapper = styled.div`
	width: 75rem;
	height: 40rem;
	padding: 1.5rem;
	border: 0.1rem solid #ccc;
	font-size: 1.5rem;
	font-family: NanumSquareNeo;
	border-radius: 0.5rem;
	background-color: #fff;

	.customoverlay {
		position: relative;
		background: #fff;
		position: relative;
		border-radius: 1rem;
		opacity: 0.9;

		.title {
			display: block;
			text-align: center;
			background: #fff;
			padding: 0.5rem 1rem;
			font-size: 1.5rem;
			font-weight: bold;
			border-radius: 1rem;
		}
		.selected {
			display: block;
			text-align: center;
			background: rgba(87, 200, 77, 1);
			padding: 0.5rem 1rem;
			font-size: 1.2rem;
			font-weight: bold;
			border-radius: 0 0 1rem 1rem;
		}
		:after {
			content: '';
			position: absolute;
			margin-left: -0.8rem;
			left: 50%;
			top: 100%;
			border: 0.8rem solid transparent;
			border-top: 0.8rem solid rgba(87, 200, 77, 1);
		}
	}
`;
const Map = ({ keyword }) => {
	const [address, setAddress] = useState('');
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	var clickedOverlay = null;

	useEffect(() => {
		// 지도를 생성합니다
		var mapContainer = document.getElementById('map'), // 지도를 표시할 div
			mapOption = {
				center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
				level: 3, // 지도의 확대 레벨
			};
		var map = new kakao.maps.Map(mapContainer, mapOption);
		// 장소 검색 객체를 생성합니다
		var ps = new kakao.maps.services.Places();
		// 키워드로 장소를 검색합니다
		ps.keywordSearch('숭실대학교', placesSearchCB);
		function placesSearchCB(data, status) {
			if (status === kakao.maps.services.Status.OK) {
				// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
				// LatLngBounds 객체에 좌표를 추가합니다
				var bounds = new kakao.maps.LatLngBounds();

				for (var i = 0; i < data.length; i++) {
					DisplayMarker(data[i]);
					bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
				}

				// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
				map.setBounds(bounds);
			} else if (status === kakao.maps.services.Status.ZERO_RESULT) {
				alert('검색 결과가 존재하지 않습니다.');
				return;
			} else if (status === kakao.maps.services.Status.ERROR) {
				alert('검색 결과 중 오류가 발생했습니다.');
				return;
			}
		}

		// 지도에 마커를 표시하는 함수입니다
		function DisplayMarker(place) {
			const markerPosition = new kakao.maps.LatLng(place.y, place.x);
			// 마커를 생성하고 지도에 표시합니다
			var marker = new kakao.maps.Marker({
				map: map,
				position: markerPosition,
			});
			// 커스텀 오버레이를 생성하고 지도에 표시한다
			var customOverlay = new kakao.maps.CustomOverlay({
				clickable: true, // 커스텀 오버레이 클릭 시 지도에 이벤트를 전파하지 않도록 설정한다
				content:
					'<div class=customoverlay id=customoverlay>' +
					// JSON.stringify(place) +
					'<span class=title>' +
					place.place_name +
					'</span>' +
					'<span class=selected>' +
					'선택됨' +
					'</span>' +
					'</div>',
				position: markerPosition, // 커스텀 오버레이를 표시할 좌표
				xAnchor: 0.5, // 컨텐츠의 x 위치
				yAnchor: 2.1, // 컨텐츠의 y 위치
			});
			customOverlay.setMap(null);
			// 마커에 클릭이벤트를 등록합니다
			kakao.maps.event.addListener(marker, 'click', function () {
				map.panTo(markerPosition);
				if (clickedOverlay) {
					clickedOverlay.setMap(null);
					// $('#customoverlay').parent('div').css('z-index', '1');
				}
				customOverlay.setMap(map);
				var markerImage = new kakao.maps.MarkerImage(
					'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
					new kakao.maps.Size(31, 35),
					new kakao.maps.Point(13, 34)
				);
				// marker.setImage(markerImage);
				// $('#customverlay').parent('div').css('z-index', '100');
				clickedOverlay = customOverlay;
				const address = place.road_address_name
					? place.road_address_name + ' ' + place.place_name
					: place.address_name + ' ' + place.place_name;
				setY(place.y);
				setX(place.x);
				setAddress(address);
			});
		}
	}, []);
	useEffect(() => {
		console.log(address + ' ' + x + ' ' + y);
	}, [address]);
	// 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
	return (
		<MapWrapper>
			<div
				id="map"
				style={{ width: '100%', height: '40rem' }}></div>
		</MapWrapper>
	);
};
export { Map };
