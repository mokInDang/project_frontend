import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { banner1, banner2_trash, banner2_human } from '../../assets/images';
import styled from 'styled-components';
import '../../styles/index.css';

const BannerDiv = styled.div`
	background: ${(props) => props.color} url(${(props) => props.image}) no-repeat
		center center;
	background-size: contain;
	height: 35rem;
	box-sizing: border-box;
	font-size: 4rem;
	font-weight: 700;
	line-height: 6rem;
	letter-spacing: 0.1rem;
	text-align: center;

	.banner1 {
		height: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 3.2rem;
		span {
			font-family: NanumSquareNeo;
			font-weight: 900;
			font-size: 5rem;
		}
	}
	.banner2 {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.banner2_text {
		font-family: NanumSquareNeo;
		font-weight: 900;
		line-height: 7.5rem;
		span {
			font-size: 4.5rem;
		}
		margin-right: 10rem;
	}
	.image {
		margin-left: 2rem;
		height: 90%;
	}
	@media (max-width: 1440px) {
		.banner2_text {
			margin-right: 3rem;
			font-size: 3.5rem;
			line-height: 6.5rem;
			span {
				font-size: 4rem;
			}
		}
		.image {
			margin-left: 1rem;
			height: 75%;
		}
	}
	@media (max-width: 1024px) {
		background-size: 120%;
		.banner2_text {
			margin-right: 2rem;
			font-size: 2.5rem;
			line-height: 5.5rem;
			span {
				font-size: 3rem;
			}
		}
		.image {
			height: 60%;
		}
	}
	@media (max-width: 778px) {
		background: ${(props) => props.color};
		text-align: start;
		.banner1 {
			height: 100%;
			font-size: 2.5rem;
			span {
				font-size: 4rem;
			}
		}
		.image {
			display: none;
		}
		.banner2_text {
			margin-right: 0;
		}
	}
	@media (max-width: 425px) {
		height: 30rem;
		.banner1 {
			height: 100%;
			font-size: 2.5rem;
			line-height: 5.5rem;
			span {
				font-size: 4rem;
			}
		}
	}
`;

const BannerSlide = () => {
	var settings = {
		arrows: false,
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 10000,
		pauseOnHover: true,
	};
	return (
		<Slider
			{...settings}
			dotsClass="test-css"
			style={{ marginBottom: '3rem' }}>
			<BannerDiv
				color="#81cc55"
				image={banner1}>
				<div className="banner1">
					<div>
						<span>환경도 건강도 동시</span>에 챙기자!
						<br />
						함께할 친구를 찾으세요!
					</div>
				</div>
			</BannerDiv>
			<BannerDiv color="#81cc55">
				<div className="banner2">
					<div className="banner2_text">
						우리 동네 쓰레기는 우리가 줍자!
						<br />
						<span>환경도 보존하고 친구도 만나고!</span>
						<br />
						지금 함께 하세요!
					</div>
					<img
						className="image"
						src={banner2_trash}
					/>
					<img
						className="image"
						src={banner2_human}
					/>
				</div>
			</BannerDiv>
		</Slider>
	);
};

export { BannerSlide };
