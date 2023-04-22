import React, { useState, useEffect } from 'react';
import {
	BoardWrapper,
	BoardDetailsWrap,
	VerticalBar,
	HeadingDiv,
	WriterProfilePicDiv,
	WriterDiv,
	HR,
	ButtonsWrap,
	ContentDiv,
	BoardContentButtonDiv,
	ReplyDiv,
	ReplyInput,
	ReplySubmitButton,
} from '../components';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router';
import { DateString } from '../utils';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import axios from 'axios';

const ImageSlide = styled.div`
	margin: 3rem 0;
	height: 60rem;
	background: no-repeat center/contain url(${(props) => props.src});
`;

function CertificationDetails() {
	const navigate = useNavigate();
	const params = useParams();
	const [certificationDetails, setCertificationDetails] = useState();
	const [certificationImages, setCertificationImages] = useState([]);
	var settings = {
		arrows: true,
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	useEffect(() => {
		axios
			.get(`/api/boards/certification/${params.boardId}`)
			.then((res) => {
				setCertificationDetails(res.data);
			})
			.catch((error) => console.log(error));
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
						<HeadingDiv fontSize="4rem">
							{certificationDetails.title}
						</HeadingDiv>
						<WriterDiv>
							<WriterProfilePicDiv
								size="6rem"
								margin="2rem 2rem 2rem 0"
								src={certificationDetails.writerProfileImageUrl}
							/>
							<div>
								{certificationDetails.writerAlias}(
								{certificationDetails.firstFourLettersOfEmail}
								****)
							</div>
							<VerticalBar id="verticalbar" />
							<div className="startingDate">
								{DateString(certificationDetails.creatingDatetime, '.')}
							</div>
						</WriterDiv>
						<HR></HR>
						{certificationDetails.mine && (
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
								<BoardContentButtonDiv onClick={() => {}}>
									삭제
								</BoardContentButtonDiv>
							</ButtonsWrap>
						)}
						{certificationImages && (
							<Slider {...settings}>
								{certificationImages.map((certificationImageUrl, i) => {
									return (
										<ImageSlide
											key={i}
											src={certificationImageUrl}></ImageSlide>
									);
								})}
							</Slider>
						)}
						<ContentDiv>
							<div
								dangerouslySetInnerHTML={{
									__html: certificationDetails.contentBody,
								}}
							/>
						</ContentDiv>
						<ReplyDiv>
							<HeadingDiv fontSize="2.5rem">0개의 댓글이 있습니다.</HeadingDiv>
							<ReplyInput>
								<textarea />
							</ReplyInput>
							<ReplySubmitButton>댓글 등록</ReplySubmitButton>
						</ReplyDiv>
					</BoardDetailsWrap>
				</BoardWrapper>
			)}
		</>
	);
}
export default CertificationDetails;
