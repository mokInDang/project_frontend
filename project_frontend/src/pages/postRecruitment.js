import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WriteForm, WriteWrapper } from '../components';
import { GetRecruitmentForEdit } from '../apis';

function PostRecruitment() {
	const boardIdForEdit = useParams().boardId;
	const navigate = useNavigate();
	const form = {
		title: '',
		contentBody: '',
		activityCategory: '',
		startingDate: '',
	};

	console.log('postRecruitment');
	return (
		<>
			<WriteWrapper>
				<WriteForm
					form={
						boardIdForEdit
							? GetRecruitmentForEdit(boardIdForEdit, navigate)
							: form
					}
					boardIdForEdit={boardIdForEdit}
				/>
			</WriteWrapper>
		</>
	);
}
export default PostRecruitment;
