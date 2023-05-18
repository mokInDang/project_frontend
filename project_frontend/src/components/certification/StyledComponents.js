import styled from 'styled-components';

const ThumbnailsWrapper = styled.div`
	display: flex;
	justify-content: ${(props) =>
		props.items === 5 ? 'space-between' : 'flex-start'};
	@media (max-width: 1024px) {
		flex-wrap: wrap;
	}
`;

const ThumbnailDiv = styled.div`
	border: 1px solid #969696;
	width: 17%;
	flex-shrink: 0;
	margin: 2.5rem 0.5rem;
	box-sizing: border-box;
	position: relative;
	:after {
		content: '';
		display: block;
		padding-bottom: 100%;
	}
	.content {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		color: rgba(150, 150, 150, 1);
		justify-content: center;
		align-items: center;
		font-size: 3rem;
		background-color: rgba(255, 255, 255, 0.3);
	}
	:hover {
		filter: brightness(0.9);
		cursor: pointer;
	}
	@media (max-width: 1024px) {
		width: 17%;
	}
`;

const ThumbnailedDiv = styled(ThumbnailDiv)`
	overflow: hidden;
	background: no-repeat center/contain url(${(props) => props.imageUrl});
	background-color: #fff;
	.content {
		display: none;
		color: rgba(0, 0, 0, 0.5);
		font-size: 3rem;
	}
	:hover {
		.content {
			display: flex;
		}
	}
`;

const FileUploader = styled.div`
	display: none;
`;

export { ThumbnailsWrapper, ThumbnailDiv, ThumbnailedDiv, FileUploader };
