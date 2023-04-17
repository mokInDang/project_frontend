import React from 'react';
import { WriteForm, WriteWrapper } from '../components';

function Write() {
	const form ={
		title: '',
		content: '',
		activityCategory: '',
		startingDate: '',
	}
	return (
		<>
			<WriteWrapper>
				<WriteForm form={form} />
			</WriteWrapper>
		</>
	);
}
export default Write;
