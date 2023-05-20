import React, { useState, useEffect } from 'react';
import {
	BoardWrapper,
	BoardDetailsWrap,
	VerticalBar,
	HeadingDiv,
	GlobalProfile,
	WriterDiv,
	HR,
	ButtonsWrap,
	ContentDiv,
	BoardContentButtonDiv,
	ImageSlide,
} from '../components';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router';
import { DateString } from '../utils';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import axios from 'axios';
import '../styles/index.css';
import { Comments } from './comments';

const ImageForSlide = styled.div`
	height: 60rem;
	background: no-repeat center/contain url(${(props) => props.src});
`;

function CertificationDetails() {
	const navigate = useNavigate();
	const params = useParams();
	const [certificationDetails, setCertificationDetails] = useState();
	const [certificationImages, setCertificationImages] = useState([]);

	useEffect(() => {
		axios
			.get(`/api/boards/certification/${params.boardId}`)
			.then((res) => {
				setCertificationDetails(res.data);
			})
			.catch((error) => {
				console.log(error);
				alert('잘못된 접근입니다.');
				navigate(-1);
			});
	}, []);
	useEffect(() => {
		if (certificationDetails)
			setCertificationImages(certificationDetails.certificationBoardImagesUrl);
	}, [certificationDetails]);

	return (
		<>
			{certificationDetails && (
				<BoardWrapper>
					<BoardDetailsWrap>
						<BsArrowLeft
							style={{
								margin: '3rem 1rem',
								cursor: 'pointer',
								fontSize: '5rem',
							}}
							onClick={() => navigate(-1)}
						/>
						<HeadingDiv fontSize='4rem'>
							{certificationDetails.title}
						</HeadingDiv>
						<WriterDiv>
							<GlobalProfile
								size='6rem'
								margin='2rem 2rem 2rem 0'
								src={certificationDetails.writerProfileImageUrl}
							/>
							<div>
								{certificationDetails.writerAlias}(
								{certificationDetails.firstFourLettersOfEmail}
								****)
							</div>
							<VerticalBar id='verticalbar' />
							<div className='startingDate'>
								{DateString(certificationDetails.creatingDatetime, '.')}
							</div>
						</WriterDiv>
						<HR className='BoardInfoHR' />
						{certificationDetails.mine && (
							<div style={{ position: 'relative' }}>
								<ButtonsWrap>
									{/* certificationDetails.onRecruitment 조회하여 마감 버튼 스타일할 것 */}
									<BoardContentButtonDiv
										onClick={() => {
											navigate(
												`/edit/certification/${certificationDetails.boardId}`,
												{
													state: certificationDetails,
												}
											);
										}}>
										수정
									</BoardContentButtonDiv>
									<BoardContentButtonDiv
										onClick={() => {
											if (window.confirm('게시글을 삭제하시겠습니까?')) {
												axios
													.delete(`/api/boards/certification/${params.boardId}`)
													.then(() => navigate(`/`, { replace: true }))
													.catch((error) => {
														console.log(error);
														alert('게시글 삭제에 실패했습니다.');
													});
											}
										}}>
										삭제
									</BoardContentButtonDiv>
								</ButtonsWrap>
							</div>
						)}
						{certificationImages && (
							<ImageSlide>
								{certificationImages.map((certificationImageUrl, i) => {
									return (
										<ImageForSlide
											key={i}
											src={certificationImageUrl}></ImageForSlide>
									);
								})}
							</ImageSlide>
						)}
						<HR style={{ marginTop: '10rem' }}></HR>
						<ContentDiv>
							<div
								dangerouslySetInnerHTML={{
									__html: certificationDetails.contentBody,
								}}
							/>
						</ContentDiv>
					</BoardDetailsWrap>
					<Comments
						boardType={'certification-board'}
						boardId={params.boardId}
					/>
				</BoardWrapper>
			)}
		</>
	);
}
export default CertificationDetails;
