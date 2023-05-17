/*global kakao*/
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { SelectBox } from '../components';
import { AiOutlineSearch } from 'react-icons/ai';

const MapWrapper = styled.div`
	width: 75rem;
	height: 40rem;
	box-sizing: border-box;
	border: 0.1rem solid #ccc;
	font-size: 1.5rem;
	padding: 1.5rem;
	margin-top: 2rem;
	margin-bottom: 5rem;
	font-family: NanumSquareNeo;
	border-radius: 0.5rem;
	background-color: #fff;
	@media (max-width: 75rem) {
		width: 100%;
		height: 35rem;
	}
	@media (max-width: 600px) {
		height: 30rem;
	}
	@media (max-width: 375px) {
		height: 25rem;
	}
	#map {
		display: flex;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
	.customoverlay {
		position: relative;
		background: #fff;
		border-radius: 1rem;
		opacity: 0.9;
		border: 1px solid #aaa;

		.title {
			display: block;
			text-align: center;
			background: #fff;
			padding: 0.7rem;
			font-size: 1.5rem;
			font-weight: bold;
			border-radius: 1rem;
		}
		span {
			display: block;
			text-align: center;
			background: #ccc;
			padding: 0.5rem 1rem;
			font-size: 1.2rem;
			font-weight: bold;
			border-radius: 0 0 1rem 1rem;
		}
		.selected {
			background: rgba(87, 200, 77, 1);
		}
		:after {
			display: block;
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-100%, -50%);
			top: 0.5rem;
			rotate: 45deg;
			width: 1rem;
			height: 1rem;
			background-color: white;
			border-left: 1px solid #aaa;
			border-top: 1px solid #aaa;
		}
	}
`;
const Map = ({ getMeetingPlace, meetingPlace }) => {
	const [meetingAddress, setMeetingAddress] = useState(
		meetingPlace.meetingAddress
	);
	const [keyword, setKeyword] = useState(meetingAddress);
	const [latitude, setLatitude] = useState(meetingPlace.latitude);
	const [longitude, setLongitude] = useState(meetingPlace.longitude);
	var clickedOverlay = null;
	const onChange = (e) => {
		// input title에 사용되는 함수
		if (e.target.value.replace(/ /g, '') === '') e.target.value = '';
		setKeyword(e.target.value);
	};
	useEffect(() => {
		// 지도를 생성합니다
		var searchword = meetingAddress;
		const defaultPosition = new kakao.maps.LatLng(
			37.495853033944364,
			126.95781764313084
		);
		const position = new kakao.maps.LatLng(latitude, longitude);

		var mapContainer = document.getElementById('map'), // 지도를 표시할 div
			mapOption = {
				center: defaultPosition, // 지도의 중심좌표
				level: 3, // 지도의 확대 레벨
			};
		var map = new kakao.maps.Map(mapContainer, mapOption);
		var selectedMarker = null;

		// 장소 검색 객체를 생성합니다
		var ps = new kakao.maps.services.Places();

		if (latitude !== '' && longitude !== '' && meetingAddress !== '') {
			map.setCenter(position);
			ps.keywordSearch(meetingAddress, placesSearchCB);
		}

		var searchInput = document.getElementById('searchInput');
		searchInput.onkeyup = function (e) {
			var key = e.key;
			if (key === 'Enter' && e.target.value !== '') {
				searchPlaces(e.target.value);
				console.log(`searchPlaces(${e.target.value})`);
				searchword = e.target.value;
			}
		};
		var searchButton = document.getElementById('searchButton');
		searchButton.onclick = function () {
			searchPlaces(searchInput.value);
			console.log(`searchPlaces(${searchInput.value})`);
			searchword = searchInput.value;
		};
		// 키워드로 장소를 검색합니다
		function searchPlaces(keyword) {
			if (!keyword.replace(/^\s+|\s+$/g, '')) {
				alert('키워드를 입력해주세요!');
				return false;
			}
			ps.keywordSearch(keyword, placesSearchCB);
		}

		function placesSearchCB(data, status) {
			if (status === kakao.maps.services.Status.OK) {
				// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
				// LatLngBounds 객체에 좌표를 추가합니다
				var bounds = new kakao.maps.LatLngBounds();
				var selected = false;
				if (meetingAddress !== '' && meetingAddress === searchword) {
					DisplaySavedMarker(data[0]);
					bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
					selected = true;
				} else {
					for (var i = 0; i < data.length; i++) {
						DisplayMarker(data[i], selected);
						bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
					}
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
		var clickImage = new kakao.maps.MarkerImage(
			'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
			new kakao.maps.Size(31, 35),
			new kakao.maps.Point(13, 34)
		);

		var savedContent = document.createElement('div');
		savedContent.className = 'customoverlay';
		var title = document.createElement('span');
		title.className = 'title';
		savedContent.appendChild(title);
		var selectSpan = document.createElement('span');
		selectSpan.className = 'selected';
		var selectedTextNode = document.createTextNode('선택됨');
		selectSpan.appendChild(selectedTextNode);
		savedContent.appendChild(selectSpan);
		var selectedMarker = new kakao.maps.Marker({
			image: clickImage,
			zIndex: 2,
		});

		var savedCustomOverlay = new kakao.maps.CustomOverlay({
			clickable: true, // 커스텀 오버레이 클릭 시 지도에 이벤트를 전파하지 않도록 설정
			content: savedContent,
			zIndex: 3,
			yAnchor: -0.1,
		});

		function DisplaySavedMarker(place) {
			const markerPosition = new kakao.maps.LatLng(place.y, place.x);
			map.setDraggable(false);
			title.appendChild(document.createTextNode(place.place_name));
			// 마커를 생성하고 지도에 표시합니다. 이미지는 기본 마커 이미지를 사용합니다
			selectedMarker.setPosition(markerPosition);
			selectedMarker.setMap(map);

			savedCustomOverlay.setPosition(markerPosition);
			savedCustomOverlay.setMap(map);
		}
		// 지도에 마커를 표시하는 함수입니다
		function DisplayMarker(place) {
			const markerPosition = new kakao.maps.LatLng(place.y, place.x);
			selectedMarker.setMap(null);
			savedCustomOverlay.setMap(null);
			var normalImage = new kakao.maps.MarkerImage(
				'https://t1.daumcdn.net/mapjsapi/images/marker.png',
				new kakao.maps.Size(25, 35),
				new kakao.maps.Point(13, 34)
			);
			var clickImage = new kakao.maps.MarkerImage(
				'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
				new kakao.maps.Size(31, 35),
				new kakao.maps.Point(13, 34)
			);

			// 마커를 생성하고 지도에 표시합니다. 이미지는 기본 마커 이미지를 사용합니다
			var marker = new kakao.maps.Marker({
				map: map,
				position: markerPosition,
				image: normalImage,
			});

			kakao.maps.event.addListener(marker, 'click', function () {
				map.panTo(markerPosition);
				if (clickedOverlay) {
					clickedOverlay.setMap(null);
				}

				var content = document.createElement('div');
				content.className = 'customoverlay';
				var title = document.createElement('span');
				title.className = 'title';
				title.appendChild(document.createTextNode(place.place_name));
				content.appendChild(title);
				var selectSpan = document.createElement('span');
				var textNode = document.createTextNode('선택하기');
				selectSpan.appendChild(textNode);
				content.appendChild(selectSpan);
				content.onclick = function () {
					selectSpan.className = 'selected';
					var selectedTextNode = document.createTextNode('선택됨');
					textNode.replaceWith(selectedTextNode);
					const meetingAddress = place.road_address_name
						? place.road_address_name + ' ' + place.place_name
						: place.address_name + ' ' + place.place_name;
					setLatitude(place.y);
					setLongitude(place.x);
					setMeetingAddress(meetingAddress);
				};

				var customOverlay = new kakao.maps.CustomOverlay({
					clickable: true, // 커스텀 오버레이 클릭 시 지도에 이벤트를 전파하지 않도록 설정
					content: content,
					position: markerPosition, // 커스텀 오버레이를 표시할 좌표
					zIndex: 3,
					yAnchor: -0.1,
				});

				customOverlay.setMap(null);
				// 마커에 클릭이벤트를 등록합니다
				customOverlay.setMap(map);
				if (!selectedMarker || selectedMarker !== marker) {
					// 클릭된 마커 객체가 null이 아니면
					// 클릭된 마커의 이미지를 기본 이미지로 변경하고
					!!selectedMarker && selectedMarker.setImage(normalImage);
					!!selectedMarker && selectedMarker.setZIndex(1);
					// 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
					marker.setImage(clickImage);
					marker.setZIndex(2);
				}
				// 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
				selectedMarker = marker;
				clickedOverlay = customOverlay;
			});
		}
	}, []);
	useEffect(() => {
		if (meetingAddress !== '') {
			console.log(meetingAddress + ' ' + latitude + ' ' + longitude);
			getMeetingPlace(latitude, longitude, meetingAddress);
		}
	}, [meetingAddress]);
	// 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
	return (
		<>
			<div>
				<SelectBox selectBox={false} style={{ cursor: 'text' }}>
					<input
						type='text'
						id='searchInput'
						value={keyword}
						onChange={onChange}
						placeholder='플로깅할 위치 검색'></input>
					<AiOutlineSearch
						id='searchButton'
						size='3rem'
						color='#999999'
						style={{
							zIndex: 2,
							cursor: 'pointer',
						}}
					/>
				</SelectBox>
			</div>{' '}
			<MapWrapper>
				<div id='map'></div>
			</MapWrapper>
		</>
	);
};

const BoardDetailsMap = ({ meetingPlaceResponse }) => {
	const { latitude, longitude, meetingAddress } = meetingPlaceResponse;
	var placeID = '';
	var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	useEffect(() => {
		// 지도를 생성합니다
		var position = new kakao.maps.LatLng(latitude, longitude);
		var mapContainer = document.getElementById('map'), // 지도를 표시할 div
			mapOption = {
				center: position, // 지도의 중심좌표
				level: 3, // 지도의 확대 레벨
			};
		var map = new kakao.maps.Map(mapContainer, mapOption);

		// 장소 검색 객체를 생성합니다
		var ps = new kakao.maps.services.Places();
		searchPlaces(meetingAddress);
		// 키워드로 장소를 검색합니다
		function searchPlaces(keyword) {
			if (!keyword.replace(/^\s+|\s+$/g, '')) {
				alert('키워드를 입력해주세요!');
				return false;
			}
			ps.keywordSearch(keyword, placesSearchCB);
		}

		function placesSearchCB(data, status) {
			if (status === kakao.maps.services.Status.OK) {
				// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
				// LatLngBounds 객체에 좌표를 추가합니다
				var bounds = new kakao.maps.LatLngBounds();

				// placeID 저장하기
				placeID = data[0].id;
				bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
				DisplayBoardDetailsMarker();
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
		function DisplayBoardDetailsMarker() {
			// 마커를 생성하고 지도에 표시합니다.
			var marker = new kakao.maps.Marker({
				position: position,
			});
			marker.setMap(map);

			var content = document.createElement('div');
			content.className = 'customoverlay';
			var title = document.createElement('span');
			title.className = 'title';
			title.appendChild(document.createTextNode(meetingAddress));
			content.appendChild(title);
			var customOverlay = new kakao.maps.CustomOverlay({
				position: position,
				content: content,
				yAnchor: -0.25,
			});
			customOverlay.setMap(map);
		}
		kakao.maps.event.addListener(map, 'click', function () {
			window.open(`https://map.kakao.com/link/map/${placeID}`, '_blank');
		});
	}, []);
	return (
		<>
			<MapWrapper>
				<div id='map'></div>
			</MapWrapper>
		</>
	);
};
export { Map, BoardDetailsMap };
