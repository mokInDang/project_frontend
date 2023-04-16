import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { banner } from '../../assets/images';
import styled from 'styled-components';

const BannerDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 35rem;
	background: #81cc55 url(${banner}) no-repeat center center;
	span {
		font-family: NanumSquareNeo;
		font-weight: 900;
		font-size: 5rem;
	}
	div {
		font-size: 4rem;
		font-weight: 700;
		line-height: 6rem;
		letter-spacing: 0.1rem;
	}
	@media (max-width: 425px) {
		span {
			font-size: 3.5rem;
		}
		div {
			font-size: 2.5rem;
		}
	}
`;

const BannerSlider = () => {
	var settings = {
		arrows: false,
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnHover: true,
	};
	return (
		<Slider {...settings}>
			<BannerDiv>
				<div>
					<span>환경도 건강도 동시</span>에 챙기자!
					<br />
					함께할 친구를 찾으세요!
				</div>
			</BannerDiv>
			<div
				style={{
					height: '35rem',
					background: `#81CC55 url(${banner}) no-repeat center center`,
					backgroundSize: 'contain',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<div
					style={{
						fontSize: '4rem',
						textAlign: 'center',
						margin: 'auto 0',
						fontWeight: '700',
						lineHeight: '6rem',
						letterSpacing: '0.1rem',
					}}>
					<div>
						<span
							style={{
								fontFamily: 'NanumSquareNeo',
								fontWeight: '900',
								fontSize: '5rem',
							}}>
							환경도 건강도 동시
						</span>
						에 챙기자!
					</div>
					<div>함께할 친구를 찾으세요!</div>
				</div>
				{/* <button onClick={() => reissueToken()}>리이슈 테스트</button>
				<GetLocationButton>내 위치 받아오기</GetLocationButton> */}
			</div>
		</Slider>
	);
};

export { BannerSlider };
