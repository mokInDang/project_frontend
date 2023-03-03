import React from 'react';
import { Header, WriteForm, WriteWrapper } from '../components';
import styled from 'styled-components';

function Write() {
	return (
		<>
			<Header />
			<WriteWrapper>
				<form>
					<WriteForm />
				</form>
			</WriteWrapper>
		</>
	);
}
export default Write;
