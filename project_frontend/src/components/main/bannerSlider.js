import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
	banner1,
	banner2,
	banner1_clouds,
	banner2_clouds,
} from '../../assets/images';
import styled from 'styled-components';
import '../../styles/index.css';

const BannerDiv = styled.div`
	background: ${(props) => props.color} url(${(props) => props.image}) no-repeat
		center center;
	background-size: contain;
	height: 35rem;
	box-sizing: border-box;
	font-size: 4.5rem;
	font-weight: 700;
	line-height: 6rem;
	text-align: center;
	overflow: hidden;

	.banner1 {
		position: relative;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: left;
		.banner1_text {
			position: absolute;
			top: 7rem;
			letter-spacing: 0.1rem;
			font-family: NanumSquareNeo;
			font-weight: 900;
			text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
			line-height: 6rem;
			z-index: 10;
		}
		.banner3_text {
			letter-spacing: 0.1rem;
			font-family: NanumSquareNeo;
			font-weight: 900;
			text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
			line-height: 6rem;
		}
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
	}
	img {
		height: 90%;
		object-fit: scale-down;
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
		font-size: 4rem;
		.banner2_text {
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
		// background: ${(props) => props.color};
		text-align: start;
		.banner1 {
			height: 100%;
		}
		// img {
		// 	display: none;
		// }
		.banner2_text {
			margin-bottom: 0;
			display: block;
		}
	}
	@media (max-width: 425px) {
		font-size: 3rem;
		height: 30rem;
		.banner1 {
			height: 100%;
			line-height: 5.5rem;
		}
		.banner2_text {
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
			<BannerDiv color='#81cc55'>
				<div className='banner1'>
					<img className='clouds' src={banner1_clouds} />
					<div className='banner1_text'>
						<div>시켜줘.</div>
						&nbsp; &nbsp; &nbsp;우리동네 <br />
						<div className='center'>
							&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;명예 환경미화원 👷‍♂
						</div>
					</div>
					<img className='background' src={banner1} />
				</div>
			</BannerDiv>
			<BannerDiv color='#81cc55'>
				<div className='banner2'>
					<img className='clouds' src={banner2_clouds} />
					<div className='banner2_text'>
						<div>플로깅하고 사진 찍으면&nbsp;</div>
						<div>컨텐츠 완성!</div>
					</div>
					<img className='background' src={banner2} />
				</div>
			</BannerDiv>
			<BannerDiv color='#81cc55'>
				<div className='banner1'>
					<img className='clouds' src={banner1_clouds} />
					<div className='banner3_text'>
						플로깅하면서
						<br />
						<div className='center'>
							&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;동네 친구들도 사귀자!
						</div>
					</div>
					<img className='background' src={banner1} />
				</div>
			</BannerDiv>
		</Slider>
	);
};

export { BannerSlide };
