import React, { useEffect, useState } from 'react';
import { WriteForm, WriteWrapper } from '../components';
import { useParams } from 'react-router';
import { GetRecruitmentForEdit } from '../apis';

function EditRecruitment() {
	let params = useParams();
	console.log(params.boardId);
	const form = GetRecruitmentForEdit(params.boardId);

	return (
		<>
			<WriteWrapper>
				<WriteForm form={form} />
			</WriteWrapper>
		</>
	);
}
export default EditRecruitment;
