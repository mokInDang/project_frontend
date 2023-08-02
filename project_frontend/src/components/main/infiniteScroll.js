import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, BoardItemsWrap } from '../index';
import styled from 'styled-components';

function InfiniteScroll() {
	const [boardItems, setBoardItems] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasNext, setHasNext] = useState(true);
	const getBoardItems = async (pageNumber) => {
		await axios
			.get(`/api/boards/recruitment/?page=${pageNumber}&size=12&sort=id,DESC`)
			.then((res) => {
				setBoardItems((data) => [...data, ...res.data.boards]);
				setHasNext(res.data.hasNext);
				setLoading(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (hasNext) {
			getBoardItems(pageNumber);
		}
	}, [pageNumber]);

	const loadMore = () => {
		setPageNumber((prevPageNumber) => prevPageNumber + 1);
	};
	const pageEnd = useRef();
	useEffect(() => {
		if (loading) {
			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						loadMore();
						if (!hasNext) {
							observer.unobserve(pageEnd.current);
						}
					}
				},
				{ threshold: 1 }
			);
			observer.observe(pageEnd.current);
		}
	}, [loading, hasNext]);

	return (
		<>
			{/* <div className='widgetWrapper'>
				<div className='widgetSection'>
					<div className='widgetDiv'>
						<div className='widget'>ㅎㅇㅎㅇ</div>
					</div>
				</div>
			</div> */}
			<BoardItemsWrap>
				{boardItems.map((boardItem) => (
					<Card key={boardItem.boardId} content={boardItem}></Card>
				))}
			</BoardItemsWrap>
			{/* <div>{boardItems.length}</div> */}
			<div ref={pageEnd} style={{ marginBottom: '40px' }}></div>
		</>
	);
}
function MyRegionInfiniteScroll() {
	const [boardItems, setBoardItems] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasNext, setHasNext] = useState(true);
	const getBoardItems = async (pageNumber) => {
		await axios
			.get(
				`/api/boards/recruitment/region?page=${pageNumber}&size=12&sort=id,DESC`
			)
			.then((res) => {
				setBoardItems((data) => [...data, ...res.data.boards]);
				setHasNext(res.data.hasNext);
				setLoading(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (hasNext) {
			getBoardItems(pageNumber);
		}
	}, [pageNumber]);

	const loadMore = () => {
		setPageNumber((prevPageNumber) => prevPageNumber + 1);
	};
	const pageEnd = useRef();
	useEffect(() => {
		if (loading) {
			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						loadMore();
						if (!hasNext) {
							observer.unobserve(pageEnd.current);
						}
					}
				},
				{ threshold: 1 }
			);
			observer.observe(pageEnd.current);
		}
	}, [loading, hasNext]);

	return (
		<>
			<BoardItemsWrap>
				{boardItems.map((boardItem) => (
					<Card key={boardItem.boardId} content={boardItem}></Card>
				))}
			</BoardItemsWrap>
			{/* <div>{boardItems.length}</div> */}
			<div ref={pageEnd} style={{ marginBottom: '40px' }}></div>
		</>
	);
}

export { InfiniteScroll, MyRegionInfiniteScroll };
