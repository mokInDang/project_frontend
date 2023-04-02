import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Card, BoardItemsWrap } from '../index';

function InfiniteScroll() {
	const [boardItems, setBoardItems] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);

	const getBoardItems = async (pageNumber) => {
		await axios
			.get(`https://jsonplaceholder.typicode.com/posts/${pageNumber}/comments`)
			.then((res) => {
				setBoardItems((data) => [...data, ...res.data]);
				// console.log(res.data.hasNext);
				console.log(res.data[0]);
				console.log(boardItems);
			});
	};

	useEffect(() => {
		getBoardItems(pageNumber);
	}, [pageNumber]);

	const loadMore = () => {
		setPageNumber((prevPageNumber) => prevPageNumber + 1);
	};

	return (
		<div>
			<BoardItemsWrap>
				{boardItems.map((boardItem) => (
					<Card
						key={boardItem.id}
						content={boardItem}></Card>
				))}
			</BoardItemsWrap>
			<div>{boardItems.length}</div>
			<button onClick={loadMore}>Load More</button>
		</div>
	);
}

export { InfiniteScroll };
