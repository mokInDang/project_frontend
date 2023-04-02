import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Card, BoardItemsWrap } from '../index';

function InfiniteScroll() {
	const [boardItems, setBoardItems] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [loading, setLoading] = useState(false);

	const getBoardItems = async (pageNumber) => {
		await axios
			.get(`https://jsonplaceholder.typicode.com/posts/${pageNumber}/comments`)
			.then((res) => {
				setBoardItems((data) => [...data, ...res.data]);
				// console.log(res.data.hasNext);
				console.log(res.data[0]);
				console.log(boardItems);
				setLoading(true);
			});
	};

	useEffect(() => {
		getBoardItems(pageNumber);
	}, [pageNumber]);

	const loadMore = () => {
		setPageNumber((prevPageNumber) => prevPageNumber + 1);
	};
	const pageEnd = useRef();
	let num = 1; // observer 의 observe 조건 설정 - 나중에 GET 요청으로 받을 hasNext로 바꿀 것
	useEffect(() => {
		if (loading) {
			const observer = new IntersectionObserver(
				(entries) => {
					console.log(entries[0].isIntersecting);
					if (entries[0].isIntersecting) {
						num++;
						loadMore();
						if (num >= 4) {
							observer.unobserve(pageEnd.current);
						}
					}
				},
				{ threshold: 1 }
			);
			observer.observe(pageEnd.current);
		}
	}, [loading, num]);

	return (
		<div>
			<BoardItemsWrap>
				{boardItems.map((boardItem) => (
					<Card
						key={boardItem.id}
						content={boardItem}></Card>
				))}
			</BoardItemsWrap>
			{/* <div>{boardItems.length}</div> */}
			<div
				ref={pageEnd}
				style={{ marginBottom: '40px' }}></div>
		</div>
	);
}

export { InfiniteScroll };
