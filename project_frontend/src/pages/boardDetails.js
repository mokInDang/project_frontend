import React from 'react';
import { Header } from '../components';
import { BoardWrapper, BoardContent } from '../components';

function BoardDetails() {
	return (
		<>
			<Header />
			<BoardWrapper>
				<BoardContent />
			</BoardWrapper>
		</>
	);
}
export default BoardDetails;
