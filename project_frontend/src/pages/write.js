import React from 'react';
import { Header, EditorComponent } from '../components';
import styled from 'styled-components';

const WriteWrapper = styled.div`
	width: 1200px;
	height: 100%;
    margin:auto;
`;

function Write() {
	return (
		<>
			<Header />
			<WriteWrapper>
				<h1>글쓰기 페이지</h1>
				<form>
					<EditorComponent />
				</form>
			</WriteWrapper>
		</>
	);
}
export default Write;
