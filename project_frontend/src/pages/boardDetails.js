import React from 'react';
import { BoardWrapper, BoardContent } from '../components';
import { Comments } from './comments';

function BoardDetails() {
	return (
		<>
			<BoardWrapper>
				<BoardContent />
				<Comments />
			</BoardWrapper>
		</>
	);
}
export default BoardDetails;
