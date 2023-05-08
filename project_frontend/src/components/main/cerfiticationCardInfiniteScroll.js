import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { CertificationCard, CertificationCardsWrap } from '../index';

function CertificationCardInfiniteScroll() {
	const [boardItems, setBoardItems] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasNext, setHasNext] = useState(true);

	const getBoardItems = async (pageNumber) => {
		await axios
			.get(`/api/boards/certification?page=${pageNumber}&size=4&sort=id,DESC`)
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
		<div>
			<CertificationCardsWrap>
				{boardItems.map((boardItem, i) => (
					<CertificationCard
						key={boardItem.boardId}
						tapeNumber={i}
						boardItem={boardItem}></CertificationCard>
				))}
			</CertificationCardsWrap>
			{/* <div>{boardItems.length}</div> */}
			<div
				ref={pageEnd}
				style={{ marginBottom: '5rem' }}></div>
		</div>
	);
}

export { CertificationCardInfiniteScroll };
