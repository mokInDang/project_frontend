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
	width: 10%;
	left: 1rem;
	z-index: 99;
	text-align: left;
	:hover {
		background-color: rgba(1, 1, 1, 0.1);
	}
`;
const RightButtonDiv = styled.div`
	display: flex;
	position: absolute;
	height: 100%;
	width: 10%;
	right: 1rem;
	z-index: 99;
	text-align: right;
	:hover {
		background-color: rgba(1, 1, 1, 0.1);
	}
`;
const StyledImageSlide = styled(Slider)`
	box-sizing: border-box;
	margin-top: 5rem;
	height: 60rem;
	width: 100%;
	position: relative;
	.slick-prev::before,
	.slick-next::before {
		opacity: 0;
		display: none;
	}
`;
const ImageDiv = styled.div`
	background: no-repeat center/contain url(${(props) => props.src});
	height: 60rem;
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
			<ImageDiv
				className="image"
				src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg"
			/>
			<ImageDiv
				className="image"
				src="https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"
			/>
			<ImageDiv
				className="image"
				src="https://image.dongascience.com/Photo/2016/09/14750507361195.jpg"
			/>
		</StyledImageSlide>
	);
};
export { ImageSlide };
