import styled from 'styled-components';

const GlobalProfile = styled.div`
	border-radius: 50%;
	border: 1px solid rgba(0, 0, 0, 0.1);
	flex-shrink: 0;
	margin: ${(props) => props.margin};
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	background: url(${(props) =>
			props.src &&
			props.src !== 'DEFAULT_PROFILE_IMAGE_URL' &&
			props.src !== null
				? props.src
				: 'https://dognejupging-xyz-image-bucket.s3.ap-northeast-2.amazonaws.com/profile_image/default_profile.png'})
		no-repeat center/cover;
`;

export { GlobalProfile };
