import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { banner1, banner2, banner2_clouds } from '../../assets/images';
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
	text-align: center;

	.banner1 {
		position: relative;
		height: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 4.5rem;
		letter-spacing: 0.1rem;
		font-family: NanumSquareNeo;
		font-weight: 900;
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
		line-height: 6rem;
		text-align: left;
		.center {
			text-align: center;
		}
	}
	.background {
		position: absolute;
		bottom: 0;
	}
	.clouds {
		position: absolute;
		top: 10%;
	}
	.banner2 {
		position: relative;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		letter-spacing: 0.1rem;
		overflow: hidden;
	}
	img {
		height: 90%;
		object-fit: contain;
	}
	.absoluteImage {
		position: absolute;
		bottom: 0;
	}
	.banner2_text {
		display: flex;
		font-family: NanumSquareNeo;
		font-weight: 900;
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
		z-index: 10;
		line-height: 7.5rem;
		margin-bottom: 5rem;
	}
	@media (max-width: 1440px) {
		.banner1 {
			font-size: 4rem;
		}
		.banner2_text {
			font-size: 4rem;
			line-height: 6.5rem;
		}
		img {
			height: 75%;
		}
	}
	@media (max-width: 1024px) {
		background-size: 120%;
		img {
			height: 60%;
		}
	}
	@media (max-width: 778px) {
		background: ${(props) => props.color};
		text-align: start;
		.banner1 {
			height: 100%;
			font-size: 4rem;
		}
		img {
			display: none;
		}
		.banner2_text {
			font-size: 4rem;
			margin-bottom: 0;
			display: block;
		}
	}
	@media (max-width: 425px) {
		height: 30rem;
		.banner1 {
			height: 100%;
			font-size: 3rem;
			line-height: 5.5rem;
		}
		.banner2_text {
			font-size: 3rem;
			line-height: 5.5rem;
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
		<Slider {...settings} dotsClass='test-css' style={{ marginBottom: '3rem' }}>
			<BannerDiv color='#81cc55' image={banner1}>
				<div className='banner1'>
					<div>
						<div>플로깅하면서</div>
						<div className='center'>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;동네 친구들도 사귀자!
						</div>
					</div>
				</div>
			</BannerDiv>
			<BannerDiv color='#81cc55'>
				<div className='banner2'>
					<img className='image clouds' src={banner2_clouds} />
					<div className='banner2_text'>
						<div>플로깅하고 사진 찍으면&nbsp;</div>
						<div>컨텐츠 완성!</div>
					</div>
					<img className='image background' src={banner2} />
				</div>
			</BannerDiv>
		</Slider>
	);
};

export { BannerSlide };
