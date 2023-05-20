import { RxChevronLeft, RxChevronRight } from 'react-icons/rx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/index.css';
import styled from 'styled-components';

const LeftButtonDiv = styled.div`
	display: flex;
	align-items: center;
	position: absolute;
	height: 100%;
	width: 6rem;
	left: 0;
	z-index: 98;
	text-align: left;
	opacity: 0.6;
	:hover {
		opacity: 0.9;
	}
`;
const RightButtonDiv = styled.div`
	display: flex;
	position: absolute;
	height: 100%;
	width: 6rem;
	right: 0rem;
	z-index: 98;
	text-align: right;
	opacity: 0.6;
	:hover {
		opacity: 0.9;
	}
`;
const StyledImageSlide = styled(Slider)`
	box-sizing: border-box;
	margin: 5rem 0;
	height: 60rem;
	width: 100%;
	position: relative;
	.slick-prev::before,
	.slick-next::before {
		opacity: 0;
		display: none;
	}
`;

const SlickButtonLeft = ({ currentSlide, slideCount, children, ...props }) => (
	<LeftButtonDiv {...props}>
		<RxChevronLeft
			size="6rem"
			color="black"
			style={{ marginTop: '26rem' }}
		/>
	</LeftButtonDiv>
);
const SlickButtonRight = ({ currentSlide, slideCount, children, ...props }) => (
	<RightButtonDiv {...props}>
		<RxChevronRight
			size="6rem"
			color="black"
			style={{ marginTop: '26rem' }}
		/>
	</RightButtonDiv>
);

var settings = {
	arrows: true,
	prevArrow: <SlickButtonLeft></SlickButtonLeft>,
	nextArrow: <SlickButtonRight></SlickButtonRight>,
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 10000,
	pauseOnHover: true,
};
const ImageSlide = ({ children }) => {
	return (
		<StyledImageSlide
			dotsClass="test-css"
			{...settings}>
			{children}
		</StyledImageSlide>
	);
};
export { ImageSlide };
